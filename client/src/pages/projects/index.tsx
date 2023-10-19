import TopNav from "../../components/navbar/top-nav";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import Widget, { WidgetData } from "../../components/widget";
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useContext, useMemo, useState } from "react";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import NewProject from "../../components/forms/NewProject";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../context/project.context.tsx";

const Projects = () => {
    const [newProjectModal, setnNewProjectModal] = useState<boolean>(false);
    const { loadProjects, projects, loading } = useContext(ProjectContext);
    const [projectsWidgetData, setProjectsWidgetData] = useState<WidgetData[]>([
        {
            headerTitle: "All Projects",
            headerItems: <></>,
            style: { "gridArea": "1/1" },
            content: []
        }
    ]);

    useMemo(async () => {
        
        await loadProjects();
        const projectWidgetContent = projects.map((project) => {
            return {
                className: "h-20 items-center",
                left: {
                    content:
                        <Link to={`${project.id}`}>
                            <div>
                                <h3 className="text-xl font-bold">{project.name}</h3>
                                <p>{project.report_frequency_type}</p>
                            </div>
                        </Link>,
                    className: "!flex !flex-row !items-center !gap-2 h-full"
                },
                right: {
                    content: <p>{project.total_reports} report(s)</p>
                },
            };
        });
        const tmpProjectWidgetData = projectsWidgetData;
        tmpProjectWidgetData[0].content = projectWidgetContent;
        setProjectsWidgetData([...tmpProjectWidgetData])
    }, [projects]);

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
                <React.Fragment>
                    <TopNav title="Projects" size="large">
                        <div className={`${topNavStyles.icon} ${topNavStyles.round} ${topNavStyles.black}`} onClick={() => setnNewProjectModal(!newProjectModal)}>
                            <AiOutlinePlus />
                        </div>
                    </TopNav>

                    <section className={newProjectModal ? "modal m-visible" : "modal"}>
                        <div className="dialog md:!w-[35rem] md:!min-h-[23rem]">
                            <TopNav title="New Project" size="large"><AiOutlineClose className={`${topNavStyles.icon} border-4 border-transparent`} onClick={() => setnNewProjectModal(!newProjectModal)} /></TopNav>
                            <NewProject opened={setnNewProjectModal} />
                        </div>
                    </section>

                    <Widget data={projectsWidgetData} style={{ gridTemplateColumns: "1fr" }} />
                </React.Fragment>
            )
    );
}

export default Projects;
