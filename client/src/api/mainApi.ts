import INewUser from '../types/INewUser';
import { INewProject } from '../types/IProject';

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const AuthServices = {
    checkTokenIfValid: async (token: string, signal: AbortSignal) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/validatetoken`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                return false;
            }

            const { type } = await response.json();

            return response.status === 200 && type === "VALID_TOKEN";
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error('Error in checkTokenIfValid:', error);
            return false;
        }
    },
    activateUser: async (token: string, password: string, signal: AbortSignal) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/activate`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const { type, message } = await response.json();

            return { status: response.status, type, message };
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error('Error in checkTokenIfValid:', error);
            return { status: 500, type: "error", message: "Unknown Error" };
        }
    },
    login: async (email: string, password: string, signal: AbortSignal) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const { type, message } = await response.json();

            return { status: response.status, type, message };
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            // console.error('Error in login:', error);
            return { status: 500, type: "error", message: "Unknown Error" };
        }
    },

    checkAuth: async (signal: AbortSignal) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/checkauth`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const { type, message, result } = await response.json();

            return { status: response.status, type, message, userData: result[0] };
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            // console.error('Error in login:', error);
            return { status: 500, type: "error", message: "Unknown Error" };
        }
    },
    inviteUsers: async (signal: AbortSignal, data: INewUser[]) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            const { type, message, result } = await response.json();

            return { status: response.status, type, message, result };
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            // console.error('Error in login:', error);
            return { status: 500, type: "error", message: "Unknown Error" };
        }
    }
};

const UserServices = {
    getAll: async (signal: AbortSignal) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                return false;
            }

            const { result } = await response.json();

            return result;
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error(error);
            return false;
        }
    },
}

const ProjectServices = {
    getAll: async (signal: AbortSignal) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
                signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                return false;
            }

            const { result } = await response.json();

            return result ?? [];
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error(error);
            return false;
        }
    },

    getOne: async (signal: AbortSignal, projectId: number) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, {
                signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                return false;
            }

            const { result } = await response.json();

            return result[0] ?? null;
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error(error);
            return false;
        }
    },

    newProject: async (signal: AbortSignal, data: INewProject) => {
        try {
            await delay(3000)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            const { type, code } = await response.json();

            return type === "success" && code === 200;
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            // console.error('Error in login:', error);
            return { status: 500, type: "error", message: "Unknown Error" };
        }
    },

    unassignedMembers: async (signal: AbortSignal, projectId: number) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/members/UNASSIGNED`, {
                signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                return false;
            }

            const { result } = await response.json();

            return result ?? {};
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error(error);
            return false;
        }
    },
    getMemberReports: async (signal: AbortSignal, projectId: number, memberId: number) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/members/${memberId}/reports`, {
                signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                return false;
            }

            const { result } = await response.json();

            return result ?? {};
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error(error);
            return false;
        }
    },
    getTmMemberReports: async (signal: AbortSignal, projectId: number) => {
        try {
            // Simulate a delay (remove this in production)
            // await delay(1000);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/reports`, {
                signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                return false;
            }

            const { result } = await response.json();

            return result ?? {};
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            console.error(error);
            return false;
        }
    },

    assignMembers: async (signal: AbortSignal, projectId: number, memberIds: number[]) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/members/assign`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({members: memberIds})
            });
            const { type, message, result } = await response.json();

            return { status: response.status, type, message, result };
        } catch (error) {
            if (signal.aborted) return "ABORTED";
            // console.error('Error in login:', error);
            return { status: 500, type: "error", message: "Unknown Error" };
        }
    },

    submitReport: async (signal: AbortSignal, projectId: number, reportId: number, content: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/reports`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({reportId, content})
            });

            const { type, message, result } = await response.json();

            return { status: response.status, type, message, result };

        } catch (error: any) {
            if (signal.aborted) return "ABORTED";
            // console.error('Error in login:', error);
            return { status: 500, type: "error", message: "Unknown Error" };
        }
    },

    toggleReadReport: async (signal: AbortSignal, projectId: number, reportId: number, userId: number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/reports/${reportId}/toggleread`, {
                signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({userId})
            });

            if (!response.ok) {
                return false;
            }

            return true;

        } catch (error: any) {
            if (signal.aborted) return "ABORTED";
            // console.error('Error in login:', error);
            return false;
        }
    }
}

export { AuthServices, UserServices, ProjectServices };
