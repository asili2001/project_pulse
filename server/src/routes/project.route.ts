import express from 'express';
import DbConnection from '../db/connections/db-connection';
import AuthMiddleware from '../middlewares/checkAuth';
import UserRepository from '../db/repositories/user.repository';
import ProjectContoller from '../controllers/project.controller';
import ProjectValidator from '../middlewares/project.validator';

if (!process.env.DB_NAME_MAIN) {
    throw new Error("Missing database name environment variable for database.");
}

const projectRouter = express.Router();
const connection = new DbConnection(process.env.DB_NAME_MAIN);
const UserRepo = new UserRepository(connection);
const projectValidator = new ProjectValidator();
const projectContoller = new ProjectContoller(connection);
const AuthTeamMember = new AuthMiddleware(UserRepo, [0, 1]);
const AuthProjectManager = new AuthMiddleware(UserRepo, [1]);

projectRouter.post('/', AuthProjectManager.checkUser, projectValidator.newProject, projectContoller.newProject);
projectRouter.get('/', AuthTeamMember.checkUser, projectContoller.getAll);
projectRouter.get('/:id', AuthTeamMember.checkUser, projectContoller.getOne);
// projectRouter.get('/:id/reports', AuthProjectManager.checkUser, projectContoller.getOne);
projectRouter.get('/:id/members/:type', AuthProjectManager.checkUser, projectValidator.projectMembers, projectContoller.projectMembers);
projectRouter.post('/:id/members/assign', AuthProjectManager.checkUser, projectValidator.assignMembers, projectContoller.assignMembers);
projectRouter.get('/:id/members/:memberId/reports', AuthProjectManager.checkUser, projectValidator.memberReports, projectContoller.memberReports);
projectRouter.get('/:id/reports', AuthTeamMember.checkUser, projectValidator.teamMemberReports, projectContoller.teamMemberReports);
projectRouter.post('/:id/reports', AuthTeamMember.checkUser, projectValidator.teamMemberReportSubmit, projectContoller.teamMemberReportSubmit);
projectRouter.post('/:id/reports/:reportId/toggleread', AuthTeamMember.checkUser, projectValidator.toggleReadReport, projectContoller.toggleReadReport);
projectRouter.post('/latestReportSubmissions', AuthTeamMember.checkUser, projectContoller.latestReportSubmissions);

export default projectRouter;
