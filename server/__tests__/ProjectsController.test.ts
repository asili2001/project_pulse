import dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });
import {app} from '../src/app';
import AuthController from '../src/controllers/auth.controller';
import DbConnection from '../src/db/connections/db-connection';
import request from 'supertest';
import statusCodes from "../src/utils/HttpStatusCodes";

if (!process.env.DB_NAME_MAIN) {
    throw new Error("Inviroment Variable DB_NAME_MAIN needs to be defined");
}

const db = new DbConnection(process.env.DB_NAME_MAIN);
const authController = new AuthController(db);

const projectData = {
    "name": "Project Test",
    "report_frequency_type": "daily",
    "reports": [
        {
            "name": "Report 1",
            "start": 11111,
            "end": 99999
        }
    ]
};

beforeAll(async ()=> {
    // delete all projects from database
    await db.query("DELETE FROM projects");
});

test("Add new project", async ()=> {
    const login = await request(app).post('/auth/login').send({email: "ahmadasili1928@gmail.com", password: "12345678"});
    const cookies = login.headers['set-cookie'];
    console.log("-------------------------------------------->", login.body);
    
    expect(login.body.code).toBe(statusCodes.OK);

    
    const newProject = await request(app).post('/projects').set('Cookie', ['myApp-token=12345667', 'myApp-other=blah']).send(projectData);
    
    console.log(newProject.body);
    
    expect(newProject.body.type).toBe("success");

    // check if project exists in database
    const [projectId] = await db.query("SELECT LAST_INSERT_ID() AS project_id FROM projects GROUP BY project_id ", []);
    const [project] = await db.query("SELECT name FROM projects WHERE id=?", [projectId]);
    expect(projectData.name).toBe(project.name);
});

