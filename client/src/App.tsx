import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/errors/PageNotFound";
import Dashboard from "./pages/dashboard";
import Hub from "./pages/hub";
import AuthLogin from "./pages/auth/Login";
import AuthActivateAccount from "./pages/auth/ActivateAccount";
import ProtectedRoute from "./utils/ProtectedRoute";
import Employees from "./pages/employees";
import Projects from "./pages/projects";
import Project from "./pages/projects/project";
import TmProjects from "./pages/projects/TmProjects";
import TmProject from "./pages/projects/TmProject";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute  giveAccessTo = {[0,1]}><Hub view={<Dashboard />} /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute giveAccessTo = {[1]}><Hub view={<Employees />} /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute giveAccessTo = {[1]}><Hub view={<Projects />} /></ProtectedRoute>} />
            <Route path="/projects/:projectId" element={<ProtectedRoute giveAccessTo = {[1]}><Hub view={<Project />} /></ProtectedRoute>} />
            
            <Route path="/tm/projects" element={<ProtectedRoute giveAccessTo = {[0]}><Hub view={<TmProjects />} /></ProtectedRoute>} />
            <Route path="/tm/projects/:projectId" element={<ProtectedRoute giveAccessTo = {[0]}><Hub view={<TmProject />} /></ProtectedRoute>} />
            
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/activate" element={<AuthActivateAccount />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>

    );
}

export default App;
