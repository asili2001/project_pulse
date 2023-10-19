import { unixTimestampToStrDate } from "../forms/NewProject";
import ProjectOverview, { ChartItem } from "../charts/project_overview";
import IReport from "../../types/IReport";

const Dashboard = (props: {reports: IReport[], frequency: string, totalMembers: number}) => {
    const reportsOverview: ChartItem[] = props.reports.map((report) => {
        return {
            name: report.name,
            Submitted: report.total_submitted ?? 0
        }
    });
    return (
        <>
            <ProjectOverview total_members={props.totalMembers} data={reportsOverview} />

            <ul className="!grid grid-cols-2">
                <li className="gap-1"><p className=" font-bold">Frequency: </p><p>{props.frequency}</p></li>
                <li className="gap-1"><p className=" font-bold">Total Reports: </p><p>{props.reports.length}</p></li>
                <li className="gap-1"><p className=" font-bold">Total Members: </p><p>{props.totalMembers}</p></li>
                <li className="gap-1"><p className=" font-bold">Starts in: </p><p>{unixTimestampToStrDate(props.reports[0].submission_start)}</p></li>
                <li className="gap-1"><p className=" font-bold">Ends in: </p><p>{unixTimestampToStrDate(props.reports[props.reports.length - 1].submission_end)}</p></li>
            </ul>

        </>
    );
}

export default Dashboard;