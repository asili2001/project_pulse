import TopNav from "../../components/navbar/top-nav";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import Widget, { WidgetData } from "../../components/widget";
import { AiOutlineClose, AiOutlineUserAdd } from 'react-icons/ai';
import { useContext, useEffect, useState } from "react";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import AssignMembers from "../../components/forms/AssignMembers";
import PageNotFound from "../errors/PageNotFound";
import { ProjectContext } from "../../context/project.context.tsx";
import { IProject } from "../../types/IProject.ts";
import Dashboard from "../../components/project/Dashboard.tsx";
import MemberList from "../../components/project/MemberList.tsx";
import MemberReports from "../../components/project/MemberReports.tsx";


const Project = () => {
    const { selectProject, projects, loading } = useContext(ProjectContext);
    const [projectData, setProjectData] = useState<IProject|undefined>(undefined);
    const [assignMembersModal, setAssignMembersModal] = useState<boolean>(false);
    const [selectedMember, setSelectedMember] = useState<number>(-1);
    const { projectId } = useParams();
    const [projectsWidgetData, setProjectsWidgetData] = useState<WidgetData[]>([
        {
            headerTitle: "Members",
            headerItems: <></>,
            style: { "gridArea": "1/1" },
            content: []
        },
        {
            headerTitle: "Reports",
            headerItems: <></>,
            style: { "gridArea": "1/2" },
            content: []
        }
    ]);

    useEffect(()=> {
        if (!projectData || selectedMember === -1) return;
        
        const tmpProjectWidgetData = projectsWidgetData;
        tmpProjectWidgetData[1].content = <MemberReports projectId={projectData.id} memberId={selectedMember}/>;
        setProjectsWidgetData([...tmpProjectWidgetData]);
    }, [selectedMember]);


    useEffect(() => {      
        async function loadSelectedProject() {
          if (!projectId || isNaN(parseInt(projectId))) return;
          const selectedProject = await selectProject(parseInt(projectId));
          setProjectData(selectedProject);
        }
        loadSelectedProject();
      }, [projects]);
    
    useEffect(() => {
        const initialize = async () => {
            if (!projectData) return;

            if (!projectData.reports ||!projectData.members) return;

            const tmpProjectWidgetData = projectsWidgetData;
            tmpProjectWidgetData[0].content = <MemberList members={projectData.members} projectId={projectData.id} storeInState={setSelectedMember}/>;
            tmpProjectWidgetData[1].content = <Dashboard reports={projectData.reports} frequency={projectData.report_frequency_type} totalMembers={projectData.members.length}/>;
            setProjectsWidgetData([...tmpProjectWidgetData]);
        };

        if (projectData) {
            initialize().catch(console.error);
        }


        return () => {
        };
    }, [assignMembersModal, projectData]);

    return (
        loading ? (
            <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center">
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#3399ff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                />
            </div>
        ) :
            (
                projectData ? (
                        <React.Fragment>
                            <TopNav title={projectData.name} size="large">
                                <div className={`${topNavStyles.icon} ${topNavStyles.round} ${topNavStyles.black}`} onClick={() => setAssignMembersModal(!assignMembersModal)}>
                                    <AiOutlineUserAdd />
                                </div>
                            </TopNav>
    
                            <section className={assignMembersModal ? "modal m-visible" : "modal"}>
                                <div className="dialog md:!w-[35rem] md:!min-h-[23rem]">
                                    <TopNav title="Assign Members" size="large"><AiOutlineClose className={`${topNavStyles.icon} border-4 border-transparent`} onClick={() => setAssignMembersModal(!assignMembersModal)} /></TopNav>
                                    <AssignMembers projectId={projectData.id} onSubmit = {()=>setAssignMembersModal(false)} />
                                </div>
                            </section>
                            <Widget data={projectsWidgetData} style={{ gridTemplateColumns: "18rem 1fr" }} />
                        </React.Fragment>
                ) : <PageNotFound />
            )
    );
}

export default Project;
