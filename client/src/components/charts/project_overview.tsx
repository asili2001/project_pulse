// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { Chart } from "react-google-charts";

export type ChartItem = {
    name: string;
    "Submitted": number;
}

type IProps = {
    data: ChartItem[];
    total_members: number;
}

export const data = [
    ["Name", "Submitted", "Total Members"],
    ["Report 1", 8, 20], // RGB value
    ["Report 2", 10, 20], // English color name
];

const ProjectOverview = (props: IProps) => {
    const formatData = ()=> {
        let result = [];
        result.push(["Name", "Submitted", "Total Members"]);
        props.data.forEach(item => {
            result.push([item.name, item.Submitted, props.total_members]);
        });

        return result;
    }
    return (
        <Chart chartType="ColumnChart" width="100%" height="400px" data={formatData()} />
    );
}

export default ProjectOverview;