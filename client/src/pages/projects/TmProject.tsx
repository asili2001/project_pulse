import TopNav from "../../components/navbar/top-nav";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import Widget, { WidgetData } from "../../components/widget";
import { AiOutlineClose } from 'react-icons/ai';
import { useContext, useEffect, useState } from "react";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import PageNotFound from "../errors/PageNotFound";
import { ProjectContext } from "../../context/project.context.tsx";
import { IProject } from "../../types/IProject.ts";
import MemberReports from "../../components/project/MemberReports.tsx";
import { UserContext } from "../../context/user.context.tsx";


const TmProject = () => {
    const { selectProject, projects, loading } = useContext(ProjectContext);
    const { userData } = useContext(UserContext);
    const [projectData, setProjectData] = useState<IProject|undefined>(undefined);
    const [assignMembersModal, setAssignMembersModal] = useState<boolean>(false);
    const { projectId } = useParams();
    const [projectsWidgetData, setProjectsWidgetData] = useState<WidgetData[]>([
        {
            headerTitle: "Reports",
            headerItems: <></>,
            style: { "gridArea": "1/1" },
            content: []
        }
    ]);


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
            tmpProjectWidgetData[0].content = <MemberReports projectId={projectData.id} memberId={userData.id}/>;
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
                            </TopNav>
    
                            <section className={assignMembersModal ? "modal m-visible" : "modal"}>
                                <div className="dialog md:!w-[35rem] md:!min-h-[23rem]">
                                    <TopNav title="Assign Members" size="large"><AiOutlineClose className={`${topNavStyles.icon} border-4 border-transparent`} onClick={() => setAssignMembersModal(!assignMembersModal)} /></TopNav>
                                </div>
                            </section>
                            <Widget data={projectsWidgetData} style={{ gridTemplateColumns: "1fr" }} />
                        </React.Fragment>
                ) : <PageNotFound />
            )
    );
}

export default TmProject;
