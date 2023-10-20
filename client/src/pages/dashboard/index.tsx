import TopNav from "../../components/navbar/top-nav";
import Logo from "../../assets/logo.png";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import Widget, { WidgetData } from "../../components/widget";
import { MdOutlineConstruction } from 'react-icons/md';
import { useContext } from "react";
import { ProjectContext } from "../../context/project.context";
import { unixTimestampToStrDate } from "../../components/forms/NewProject";
import { UserContext } from "../../context/user.context";

const Dashboard = () => {
    const { projects, latestReportSubmissions } = useContext(ProjectContext);
    const { userData } = useContext(UserContext);
    const widgetData: WidgetData[] = [
        {
            headerTitle: "Total Projects",
            style: { "gridArea": "1/1" },
            headerItems: <MdOutlineConstruction style={{ color: "#2091e5", fontSize: "2em" }} />,
            content: <>
                <h1 className="text-5xl text-blue-500">{projects.length}</h1>
                <h3 style={{ color: "#2091e5" }}>Projects</h3>
            </>
        }
    ];
    const widgetDataProjectManager: WidgetData[] = [
        {
            headerTitle: "Total Projects",
            style: { "gridArea": "1/1" },
            headerItems: <MdOutlineConstruction style={{ color: "#2091e5", fontSize: "2em" }} />,
            content: <>
                <h1 className="text-5xl text-blue-500">{projects.length}</h1>
                <h3 style={{ color: "#2091e5" }}>Projects</h3>
            </>
        },
        {
            headerTitle: "Latest Report Submissions",
            style: { "gridArea": "1/2" },
            headerItems: <MdOutlineConstruction style={{ color: "#2091e5", fontSize: "2em" }} />,
            content: <>
                <ul>
                    {
                        latestReportSubmissions.map((report, index) => {
                            return (
                                <li key = {index} className="!grid !grid-cols-4">
                                    <div>
                                        <p className="font-bold text-blue-500">Name</p>
                                        <p>{report.user_name}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-blue-500">Project</p>
                                        <p>{report.project_name}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-blue-500">Report</p>
                                        <p>{report.report_name}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-blue-500">Date</p>
                                        <p>{unixTimestampToStrDate(report.submission_time)}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </>
        }
    ];
    return (
        <>
            <TopNav title="Dashboard" size="large">
                <div className={`${topNavStyles.icon} ${topNavStyles.round} ${topNavStyles.transparent}`}>
                    <img src={Logo} alt="Logo" />
                </div>
            </TopNav>

            {
                userData.role === 1 ? (
                    <Widget data={widgetDataProjectManager} style={{ gridTemplateColumns: "15rem 1fr" }} />
                ) : (
                    <Widget data={widgetData} style={{ gridTemplateColumns: "1fr" }} />
                )
            }

            {/* <div className={`${styles.item} ${styles.inbox}`}>
                item 4
            </div> */}
        </>
    );
}

export default Dashboard;
