import React, { createContext, ReactNode, useEffect, useState } from "react";
import { INewProject, IProject } from "../types/IProject";
import { ProjectServices } from "../api/mainApi";
import IReport from "../types/IReport";
import { toast } from "react-toastify";
import IReportLog from "../types/IReportLog";

export interface IProjectContext {
    projects: IProject[];
    latestReportSubmissions: IReportLog[];
    loading: boolean;
    loadProjects: () => Promise<void>;
    selectProject: (id: number) => Promise<IProject|undefined>;
    selectedProjectData: IProject | undefined;
    createNewProject: (projectData: Project) => Promise<boolean> | boolean;
    assigneMembers: (memberIds: number[]) => Promise<boolean>;
}

export const ProjectContext = createContext<IProjectContext>({
    projects: [],
    latestReportSubmissions: [],
    selectedProjectData: undefined,
    loading: false,
    loadProjects: async () => { },
    selectProject: async () => { return undefined },
    createNewProject: () => { return false },
    assigneMembers: async () => { return false },
});

export interface Project extends INewProject {
    start: number;
    end: number;
    report_frequency_type: number;
    reports: IReport[];
}

interface IProps {
    children: ReactNode
}

export const ProjectProvider: React.FC<IProps> = ({ children }) => {
    const REPORT_FREQUENCIES = ["daily", "weekly", "fortnightly", "monthly", "custom"];
    const [projects, setProjects] = useState<IProject[]>([]);
    const [latestReportSubmissions, setLatestReportSubmissions] = useState<IReportLog[]>([]);
    const [selectedProjectData, setSelectedProjectData] = useState<IProject | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=> {
        loadProjects();
    }, []);

    const loadProjects = async ()=> {
        if (projects.length > 0) return;

        const projectsData = await getProjects();
        const reportSubmissions = await getLatestReportSubmissions();

        if (projectsData && projectsData.length > 0) {
            setProjects(projectsData);
        }
        if (reportSubmissions && reportSubmissions.length > 0) {
            setLatestReportSubmissions(reportSubmissions);
        }
    }

    const getProjects = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        try {
            const projectsData: IProject[] | string = await ProjectServices.getAll(signal);
    
            if (projectsData === "ABORTED") {
                return [];
            }
    
            if (typeof projectsData === "string") {
                return [];
            }
    
            return projectsData;
        } catch (error) {
            console.error(error);
            return;
        }
    };
    const getLatestReportSubmissions = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        try {
            const latestReportSubmissions: IReportLog[] | string = await ProjectServices.getLatestReportSubmissions(signal);

    
            if (latestReportSubmissions === "ABORTED") {
                return [];
            }
    
            if (typeof latestReportSubmissions === "string") {
                return [];
            }
    
            return latestReportSubmissions;
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const getProjectDetails = async (id: number) => {
        if (id === -1) return;
        const abortController = new AbortController();
        const signal = abortController.signal;
        const projectData: IProject | null | string = await ProjectServices.getOne(signal, id);

        if (projectData === "ABORTED" || typeof projectData === "string" || projectData === null) return;

        return projectData;
    }

    const selectProject = async (id: number) => {
        await loadProjects();
        // Check if the project is already in projects
        const existingProject = projects.find((project) => project.id === id);
        
        if (existingProject && !existingProject.reports) {
            // Project is already in projects, but details are missing
            setLoading(true);
            const detailed = await getProjectDetails(id);
            setLoading(false);
            if (detailed) {
                const updatedProjects = projects.map((project) =>
                    project.id === id ? detailed : project
                );
                setProjects(updatedProjects);
                setSelectedProjectData(detailed);
                return detailed;
            }
        }
        setSelectedProjectData(existingProject);
        return existingProject;
    }

    const createNewProject = async (projectData: Project): Promise<boolean> => {
        setLoading(true);
        const abortController = new AbortController();
        const signal = abortController.signal;
        const result = await ProjectServices.newProject(signal, {
            name: projectData.name,
            report_frequency_type: REPORT_FREQUENCIES[projectData.report_frequency_type],
            reports: projectData.reports
        });

        setLoading(false);

        if (result === "ABORTED") return false;

        if (result) {
            const updatedProjects = await getProjects();
            setProjects(updatedProjects??projects);
            return true;
        }
        return false;
    }

    const assigneMembers = async (memberIds: number[]): Promise<boolean> => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!selectedProjectData || !selectedProjectData.id) return false;

        const assign = await ProjectServices.assignMembers(signal, selectedProjectData.id, memberIds);

        if (assign === "ABORTED") return false;

        if (typeof assign === "string") return false;

        if (assign.status !== 200) {
            toast.error(assign.message);
            return false;
        }

        const updatedProjects = await getProjects();
        setProjects(updatedProjects ?? projects);
        return true;
    }

    return (
        <ProjectContext.Provider value={{ projects, latestReportSubmissions, selectedProjectData, loading, loadProjects, selectProject, createNewProject, assigneMembers }}>
            {children}
        </ProjectContext.Provider>
    )
}
