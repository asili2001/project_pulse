import { useContext, useEffect, useState } from "react";
import { ReportContext } from "../../context/reports.context";
import IReport from "../../types/IReport";
import { unixTimestampToStrDate } from "../forms/NewProject";
import ReportViewer from "./ReportViewer";
import TopNav from "../navbar/top-nav";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import { ProjectContext } from "../../context/project.context";
import { IProject } from "../../types/IProject";
import IUser from "../../types/IUser";
import { UserContext } from "../../context/user.context";

const MemberReports = (props: { projectId: number, memberId: number }) => {
    const { getMemberReports, toggleReadReport } = useContext(ReportContext);
    const { selectProject } = useContext(ProjectContext);
    const { userData } = useContext(UserContext);
    const [member, setMember] = useState<IUser | undefined>();
    const [projectData, setProjectData] = useState<IProject | undefined>();
    const [reports, setReports] = useState<IReport[]>([]);
    const [selectedReport, setSelectedReport] = useState<IReport | undefined>();
    const [viewReport, setViewReport] = useState<boolean>(false);

    const handleReportView = (reportData: IReport) => {
        setViewReport(true);
        setSelectedReport(reportData);
        return;
    }

    const handleToggleReadReport = async () => {
        if (!projectData || !selectedReport?.id || !member?.id) return;
        await toggleReadReport(projectData?.id, selectedReport?.id, member?.id);

    }

    useEffect(() => {
        (async () => {
            const result = await getMemberReports(props.projectId, props.memberId);

            if (!result) return;
            const selectedProject = await selectProject(result.projectId);
            if (!selectedProject || !selectedProject.members) return;
            setReports(result.reportsData);
            setProjectData(selectedProject);
            setMember(selectedProject.members.find(member => member.id === result.memberId));


        })();
    }, [props.projectId, props.memberId]);

    return (
        <>
            <ul>
                {
                    reports.map((report, index) => {
                        return (
                            <li key={index} className={`flex items-center gap-5 ${userData.role === 1 && !report?.is_read && report.submission_date && "!shadow !shadow-blue-500"}`} onClick={() => handleReportView(report)}>
                                <div className={`flex justify-center items-center h-8 w-8 rounded-full text-white 
                            ${report.submission_date ? "bg-green-400"
                                        : (new Date().getTime() / 1000) < report.submission_start
                                            ? "bg-gray-400"
                                            : (new Date().getTime() / 1000) < report.submission_end
                                                ? "bg-yellow-500"
                                                : "bg-red-400"
                                    }`}>
                                    {index + 1}
                                </div>
                                <div className="grid grid-cols-4 w-full gap-4">
                                    <div>
                                        <p className="text-gray-500">Name</p>
                                        <p>{report.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Starts in</p>
                                        <p>{unixTimestampToStrDate(report.submission_start)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Ends in</p>
                                        <p>{unixTimestampToStrDate(report.submission_end)}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-gray-500">Submitted</p>
                                        <p>{report.submission_date ? unixTimestampToStrDate(report.submission_date) : "Not Submitted"}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })

                }
            </ul>
            <div className={`modal ${viewReport && "m-visible"}`}>

                <div className="dialog !w-[7in] !min-h-[9.25in] laptop:!h-full laptop:!w-full">
                    <TopNav title={`Project ${projectData?.report_frequency_type} report`} size="large">
                        {
                            userData.role === 1 && selectedReport && selectedReport.submission_date && (
                                selectedReport.is_read ? (
                                    <AiFillEyeInvisible className={`${topNavStyles.icon} border-4 border-transparent`} onClick={handleToggleReadReport} />
                                ) : (
                                    <AiFillEye className={`${topNavStyles.icon} border-4 border-transparent`} onClick={handleToggleReadReport} />
                                )
                            )
                        }
                        <AiOutlineClose className={`${topNavStyles.icon} border-4 border-transparent`} onClick={() => setViewReport(false)} />
                    </TopNav>

                    {selectedReport && projectData && member && <ReportViewer report={selectedReport} member={member} project={projectData} />}
                </div>
            </div>
        </>
    );
}

export default MemberReports;