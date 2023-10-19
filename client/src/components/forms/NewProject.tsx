import { Input, Select } from "../input";
import formStyles from "./Forms.module.scss";
import inputStyles from "../input/Input.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import styles from "./NewProject.module.scss";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import IReport from "../../types/IReport";
import TopNav from "../navbar/top-nav";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { DateTime, Interval } from "luxon";
import { BiArrowBack } from "react-icons/bi";
import { Project, ProjectContext } from "../../context/project.context";

export function unixTimestampToStrDate(unixTimestamp: number, time?: boolean) {
    let date = new Date();

    if (unixTimestamp) {
        date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    if (time) return `${year}-${month}-${day} ${hour}:${minute}`;

    return `${year}-${month}-${day}`;
}

const NewProject = (props: { opened: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [handleSubmitLoading, setHandleSubmitLoading] = useState<boolean>(false);
    const [reports, setReports] = useState<IReport[]>([]);
    const [selectedReport, setSelectedReport] = useState<number>(-1);
    const currentDate = DateTime.now().setZone('Europe/Stockholm');
    const currentDateAt0 = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: -1 }).plus({ days: 1 });
    const currentDateAt1 = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 1 });
    const { createNewProject } = useContext(ProjectContext);
    const [projectData, setProjectData] = useState<Project>({
        name: "",
        report_frequency_type: 0,
        start: currentDateAt1.toSeconds(),
        end: currentDateAt0.toSeconds(),
        reports: []
    });

    const projectDataStates = {
        setName: (value: string) => {
            const updatedProjectData = { ...projectData };
            updatedProjectData.name = value;
            setProjectData({ ...updatedProjectData });
        },
        setFrequency: (value: number) => {
            const updatedProjectData = { ...projectData };
            updatedProjectData.report_frequency_type = value;
            setProjectData({ ...updatedProjectData });
        },
        setStart: (value: string) => {
            const updatedProjectData = { ...projectData };
            const currentDate = DateTime.now().setZone('Europe/Stockholm');
            const unixEndDate = projectData.end;
            const startDate = DateTime.fromISO(value).setZone('Europe/Stockholm');

            // Check if the input date is valid
            if (!startDate.isValid) {
                return toast.error("Invalid date");
            }

            // Set the time to midnight in the same timezone
            const currentDateAtMidnight = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            const startDateAtMidnight = startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

            // Compare with the current date
            if (currentDateAtMidnight > startDateAtMidnight) {
                return toast.error("Invalid date");
            }

            updatedProjectData.start = startDateAtMidnight.toSeconds();


            // Check and update the end date if necessary
            if (updatedProjectData.start > unixEndDate) {
                updatedProjectData.end = updatedProjectData.start;
            }
            setProjectData(updatedProjectData);
        },
        setEnd: (value: string) => {
            const updatedProjectData = { ...projectData };
            const unixStartDate = projectData.start;
            const endDate = DateTime.fromISO(value).setZone('Europe/Stockholm');

            // Check if the input date is valid
            if (!endDate.isValid) {
                return toast.error("Invalid date");
            }

            // Set the time to midnight in the same timezone
            // const endDateAtMidnight = endDate.startOf('day');
            const endDateAtMidnight = endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

            const unixEndDate = endDateAtMidnight.toSeconds();

            if (unixStartDate > unixEndDate) {
                return toast.error("Invalid date");
            }
            updatedProjectData.end = unixEndDate;
            return setProjectData({ ...updatedProjectData });
        }
    }

    const reportDataStates = {
        setName: (value: string) => {
            const updatedReportData = { ...reports[selectedReport] };
            updatedReportData.name = value;

            const tempReports = [...reports];

            if (selectedReport >= 0 && selectedReport < tempReports.length) {
                // Update the item at the specified index
                tempReports[selectedReport] = updatedReportData;

                // Set the updated state
                setReports([...tempReports]);
            }
        },
        setStart: (value: string) => {
            const updatedReportData = { ...reports[selectedReport] };
            const currentDate = DateTime.now().setZone('Europe/Stockholm');
            const unixEndDate = updatedReportData.submission_end;
            const startDate = DateTime.fromISO(value).setZone('Europe/Stockholm');

            // Check if the input date is valid
            if (!startDate.isValid) {
                return toast.error("Invalid date");
            }

            // Set the time to midnight in the same timezone
            const currentDateAtMidnight = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            const startDateAtMidnight = startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

            // Compare with the current date
            if (currentDateAtMidnight > startDateAtMidnight) {
                return toast.error("Invalid date");
            }

            updatedReportData.submission_start = startDateAtMidnight.toSeconds();


            // Check and update the end date if necessary
            if (updatedReportData.submission_start > unixEndDate) {
                updatedReportData.submission_end = updatedReportData.submission_start;
            }

            const tempReports = [...reports];

            if (selectedReport >= 0 && selectedReport < tempReports.length) {
                // Update the item at the specified index
                tempReports[selectedReport] = updatedReportData;

                // Set the updated state
                setReports([...tempReports]);
            }

        },

        setEnd: (value: string) => {
            const updatedReportData = { ...reports[selectedReport] };
            const unixStartDate = updatedReportData.submission_start;
            const endDate = DateTime.fromISO(value).setZone('Europe/Stockholm');

            // Check if the input date is valid
            if (!endDate.isValid) {
                return toast.error("Invalid date");
            }

            // Set the time to midnight in the same timezone
            const endDateAtMidnight = endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

            const unixEndDate = endDateAtMidnight.toSeconds();

            if (unixStartDate > unixEndDate) {
                return toast.error("Invalid date");
            }
            updatedReportData.submission_end = unixEndDate;

            const tempReports = [...reports];

            if (selectedReport >= 0 && selectedReport < tempReports.length) {
                // Update the item at the specified index
                tempReports[selectedReport] = updatedReportData;

                // Set the updated state
                setReports([...tempReports]);
            }
        }
    }

    const handleAddNewReport = () => {
        setReports([
            {
                name: "New Report",
                submission_start: currentDate.toSeconds(),
                submission_end: currentDate.toSeconds()
            }, ...reports]);

        setSelectedReport(0);
    }

    const handleReportDeletion = (index: number) => {
        const tmpReports = [...reports];

        tmpReports.splice(index, 1);

        setReports(tmpReports);
    }


    const handleFormClick = async () => {
        setHandleSubmitLoading(true);
        
        const projectCreated = await createNewProject({...projectData, reports});

        if (projectCreated) {
            toast.success("Project created successfully");
            setHandleSubmitLoading(false);
            setReports([]);
            setProjectData({
                name: "",
                report_frequency_type: 0,
                start: currentDate.toSeconds(),
                end: currentDate.toSeconds(),
                reports: reports
            });
            props.opened(false);
            return;
        }
        toast.error("Problem with creating project");
        setHandleSubmitLoading(false);
        return;

    }

    useEffect(() => {
        const generateReports = () => {
            const startDate = DateTime.fromSeconds(projectData.start).setZone('Europe/Stockholm');
            const endDate = DateTime.fromSeconds(projectData.end).setZone('Europe/Stockholm');


            startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 1 });


            // Check if the input dates are valid
            if (!startDate.isValid || !endDate.isValid) {
                return toast.error("Invalid date");
            }

            switch (projectData.report_frequency_type) {
                case 0:
                    (() => {
                        const tmpReports: IReport[] = [];
                        let currentInterval = Interval.fromDateTimes(startDate, endDate);

                        currentInterval.splitBy({ days: 1 }).forEach((interval, index) => {
                            if (interval.start && interval.end) {
                                tmpReports.push({
                                    name: `Report ${index + 1}`,
                                    submission_start: interval.start.toSeconds(),
                                    submission_end: interval.end.toSeconds() - 1, // a day - 1 second in seconds
                                });
                            }
                        });
                        setReports([...tmpReports]);
                    })();
                    break;
                case 1:
                    (() => {
                        const tmpReports: IReport[] = [];
                        // let currentInterval = Interval.fromDateTimes(startDate.startOf('day'), endDate.startOf('day'));
                        let currentInterval = Interval.fromDateTimes(
                            startDate,
                            endDate
                        );


                        currentInterval.splitBy({ days: 7 }).forEach((interval, index) => {
                            if (interval.start && interval.end) {
                                const durationInDays = interval.end.diff(interval.start, 'days').toObject().days ?? 0;
                                if (durationInDays >= 7) {
                                    tmpReports.push({
                                        name: `Report ${index + 1}`,
                                        submission_start: interval.start.toSeconds(),
                                        submission_end: interval.end.toSeconds() - 1, // a week - 1 second in seconds
                                    });
                                }
                            }
                        });

                        setReports([...tmpReports]);
                    })();
                    break;
                case 2:
                    (() => {
                        const tmpReports: IReport[] = [];
                        let currentInterval = Interval.fromDateTimes(startDate, endDate);

                        currentInterval.splitBy({ days: 14 }).forEach((interval, index) => {
                            if (interval.start && interval.end) {
                                const durationInDays = interval.end.diff(interval.start, 'days').toObject().days ?? 0;
                                if (durationInDays >= 14) {
                                    tmpReports.push({
                                        name: `Report ${index + 1}`,
                                        submission_start: interval.start.toSeconds(),
                                        submission_end: interval.end.toSeconds() - 1, // 14 days - 1 second in seconds
                                    });
                                }
                            }
                        });

                        setReports([...tmpReports]);
                    })();
                    break;
                case 3:
                    (() => {
                        const tmpReports: IReport[] = [];
                        let currentInterval = Interval.fromDateTimes(startDate, endDate);

                        currentInterval.splitBy({ months: 1 }).forEach((interval, index) => {
                            if (interval.start && interval.end) {
                                const durationInMonths = interval.end.diff(interval.start, 'month').toObject().months ?? 0;
                                
                                if (durationInMonths >= 1) {
                                    tmpReports.push({
                                        name: `Report ${index + 1}`,
                                        submission_start: interval.start.toSeconds(),
                                        submission_end: interval.end.toSeconds() - 1, // a month - 1 second in seconds
                                    });
                                }
                            }
                        });

                        setReports([...tmpReports]);
                    })();
                    break;
                default:
                    break;
            }
        };

        generateReports();
    }, [projectData.start, projectData.end, projectData.report_frequency_type]);

    return (
        <form className={`${formStyles.form} overflow-hidden`} onSubmit={handleFormClick}>
            <div className="flex flex-row gap-5">
                <Input type="text" placeholder="Project Name" state={projectDataStates.setName} autoComplete="none" required />
                <Select className={inputStyles.input} state={projectDataStates.setFrequency} placeholder="Report Frequency">
                    <option value="0">Daily</option>
                    <option value="1">Weekly</option>
                    <option value="2">Fortnightly</option>
                    <option value="3">Monthly</option>
                    <option value="4">Custom</option>
                </Select>
            </div>
            {
                projectData.report_frequency_type !== 4 ? (
                    <div className="flex flex-row gap-5">
                        <Input type="date" placeholder="Starting in" value={unixTimestampToStrDate(projectData.start)} state={projectDataStates.setStart} autoComplete="none" required />
                        <Input type="date" placeholder="Ending in" value={unixTimestampToStrDate(projectData.end)} state={projectDataStates.setEnd} autoComplete="none" required />
                    </div>
                ) : ""
            }
            <div className={`${styles.report_list}`}>
                <TopNav title="Project Reports" size="small">
                    {
                        projectData.report_frequency_type === 4 && <button type="button" onClick={handleAddNewReport} className={`${topNavStyles.icon} bg-black text-white !w-auto !text-xs !h-5 !p-4 !rounded-md`}>Add</button>
                    }
                </TopNav>

                {
                    projectData.report_frequency_type === 4 ? (
                        <div className={`${styles.header} grid-cols-4`}>
                            <h4>Name</h4>
                            <h4>Starting in</h4>
                            <h4>Ending in</h4>
                            <h4 className={styles.actions}>Actions</h4>
                        </div>
                    ) : (
                        <div className={`${styles.header} grid-cols-3`}>
                            <h4>Name</h4>
                            <h4>Starting in</h4>
                            <h4 className="flex justify-end">Ending in</h4>
                        </div>

                    )
                }
                <ul>
                    {
                        reports.map((report, index) => {
                            return (
                                <li key={index} className={projectData.report_frequency_type === 4 ? "grid-cols-4" : "grid-cols-3"}>
                                    <h4>{report.name}</h4>
                                    <h4>{unixTimestampToStrDate(report.submission_start, true)}</h4>
                                    <h4 className="flex justify-end">{unixTimestampToStrDate(report.submission_end, true)}</h4>

                                    {
                                        projectData.report_frequency_type === 4 && (
                                            <div className={styles.actions}>
                                                <AiOutlineEdit className={styles.edit} onClick={() => setSelectedReport(index)} />
                                                <AiOutlineDelete className={styles.delete} onClick={() => handleReportDeletion(index)} />
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        })
                    }

                </ul>
                {
                    reports.length > 0 && (
                        <div className={`${styles.editReportContainer} ${selectedReport !== -1 && styles.active}`}>
                            {
                                selectedReport !== -1 && (
                                    <>
                                        <Input type="text" placeholder="Report Name" state={reportDataStates.setName} value={reports[selectedReport]?.name} />
                                        <div className="flex flex-row gap-5">
                                            <Input type="date" placeholder="Starting in" value={unixTimestampToStrDate(reports[selectedReport]?.submission_start)} state={reportDataStates.setStart} autoComplete="none" required />
                                            <Input type="date" placeholder="Ending in" value={unixTimestampToStrDate(reports[selectedReport]?.submission_end)} state={reportDataStates.setEnd} autoComplete="none" required />
                                        </div>
                                        <button type="button" className="bg-black w-12 absolute bottom-2 left-2 object-center" onClick={() => setSelectedReport(-1)}><BiArrowBack /></button>
                                    </>
                                )
                            }
                        </div>
                    )
                }


            </div>
            {
                handleSubmitLoading ? (
                    <button className="bg-disabled" disabled>
                        <ThreeDots
                            height="40"
                            width="40"
                            radius="5"
                            color="#3399ff"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                        />
                    </button>
                ) : (
                    <button type="button" onClick={handleFormClick} className={`${formStyles.submitBtn} bg-black`} disabled={reports.length < 1 || projectData.name.length < 1}>Create</button>
                )
            }
        </form>
    )
}

export default NewProject;