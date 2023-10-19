interface IReport {
    id?: number;
    name: string;
    content?:string;
    submission_start: number;
    submission_end: number;
    total_submitted?: number;
    submission_date?: number;
    is_read?: boolean;
}

export default IReport;