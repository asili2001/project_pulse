import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from "./context/user.context";
import { ProjectProvider } from './context/project.context';
import { ReportProvider } from './context/reports.context';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastContainer />
            <CookiesProvider>
                <UserProvider>
                    <ProjectProvider>
                        <ReportProvider>
                            <App />
                        </ReportProvider>
                    </ProjectProvider>
                </UserProvider>
            </CookiesProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
