import { Input } from "../input";
import formStyles from "./Forms.module.scss";
import styles from "./InviteMembers.module.scss";
import { BiUserX } from "react-icons/bi";
import React, { useMemo, useRef, useState } from "react";
import INewUser from "../../types/INewUser";
import Papa from 'papaparse';
import TopNav from "../navbar/top-nav";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import { toast } from "react-toastify";
import validateInput from "../../utils/validateInput";
import { AuthServices } from "../../api/mainApi";
import { ThreeDots } from "react-loader-spinner";
import { AiOutlineLeft } from "react-icons/ai";

const InviteMembers = () => {
    const [selectedMemberIndex, setSelectedMemberIndex] = useState<number>(0);
    const [membersData, setMembersData] = useState<INewUser[]>([]);
    const [handleSubmitLoading, setHandleSubmitLoading] = useState<boolean>(false);
    const fileInputRef = useRef(null);
    const selectedMemberFormRef = useRef(null);

    const handleOpenCsvBtn = () => {
        if (!fileInputRef.current) return;
        const fileInput: HTMLInputElement = fileInputRef.current;
        fileInput.click();
    };

    const selectedMemberStates = {
        setFormName: (value: string) => {
            const updatedMembersData = membersData;
            updatedMembersData[selectedMemberIndex].name = value;
            setMembersData([...updatedMembersData]);
        },
        setFormPersonalNumber: (value: string) => {
            const updatedMembersData = membersData;
            updatedMembersData[selectedMemberIndex].personal_number = value;
            setMembersData([...updatedMembersData]);
        },
        setFormEmail: (value: string) => {
            const updatedMembersData = membersData;
            updatedMembersData[selectedMemberIndex].email = value;
            setMembersData([...updatedMembersData]);
        },
        setFormPhoneNumber: (value: string) => {
            const updatedMembersData = membersData;
            updatedMembersData[selectedMemberIndex].phone_number = value;
            setMembersData([...updatedMembersData]);
        }
    }

    const handleMemberSelection = (index: number) => {
        if (!selectedMemberFormRef.current) return;
        const form: HTMLFormElement = selectedMemberFormRef.current;
        form.classList.add(styles.active);
        setSelectedMemberIndex(index);
    }

    const handleDrop = (event: React.DragEvent) => {
        event.stopPropagation();
        event.preventDefault();
        if (!event.dataTransfer) return;
        const files = Array.from(event.dataTransfer.files);
        return parseCsv(files);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const files = Array.from(event.target.files);

        parseCsv(files);
        return event.target.value = "";
    };

    const parseCsv = (files: File[]) => {
        files.forEach(file => {
            if (file.type !== "text/csv") {
                return toast.error("Only CSV is allowed");
            }

            Papa.parse(file, {
                header: true, // Treat the first row as a header
                dynamicTyping: true, // Parse numbers and booleans as native types
                skipEmptyLines: true,
                complete: (result) => {
                    const csvMembers: INewUser[] = [];
                    const csvData: INewUser[] = result.data as INewUser[];

                    csvData.forEach((csvMember: INewUser) => {
                        // check if same user exists
                        let memberExists = false;

                        for (let i = 0; i < membersData.length; i++) {
                            const member = membersData[i];
                            if (member.email == csvMember.email || member.personal_number == csvMember.personal_number) {
                                memberExists = true;
                                break;
                            }
                        }

                        if (!memberExists) {
                            csvMembers.push({
                                name: csvMember?.name ?? "",
                                email: csvMember.email ?? "",
                                personal_number: csvMember.personal_number ?? "",
                                phone_number: csvMember.phone_number ?? ""
                            });
                        }
                    });
                    setMembersData([...membersData, ...csvMembers]);
                },
            });
        });
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    }

    const handleNewMemberRow = () => {
        setMembersData([{ name: "", personal_number: "", email: "", phone_number: "" }, ...membersData]);
        setSelectedMemberIndex(0);
    }

    const handleMemberDeletion = (event: Event, index: number) => {
        event.stopPropagation();
        const memberDataModified = membersData;

        memberDataModified.splice(index, 1);
        setMembersData([...memberDataModified]);
        setSelectedMemberIndex(0);

    }

    const handleMembersInvitationSubmit = async () => {
        setHandleSubmitLoading(true);
        await new Promise(resolve => {
            setTimeout(resolve, 3 * 1000);
        });
        const abortController = new AbortController();
        const signal = abortController.signal;
        const result = await AuthServices.inviteUsers(signal, membersData);

        if (result === "ABORTED") {
            setHandleSubmitLoading(false);
            return;
        }

        if (result.type === "success") {
            toast.success("Member(s) Invited Successfully");
            let modifiedMembersData = membersData;
            result.result.map((invMember: { email: string; message: string }) => {
                if (invMember.message === "success") {
                    modifiedMembersData = modifiedMembersData.filter(member => member.email !== invMember.email);
                }
            });
            setMembersData([...modifiedMembersData])
            setHandleSubmitLoading(false);
            return;
        }
        toast.error(result.message);
        setHandleSubmitLoading(false);
        return;
    }

    const errorsInMembers = useMemo(() => {
        const Errors = [];
        for (let i = 0; i < membersData.length; i++) {
            const member = membersData[i];

            if (member.name.length < 1) {
                Errors.push({ index: i, msg: "Name Cannot be empty" });
            }
            if (!validateInput(member.email, "email")) {
                Errors.push({ index: i, msg: "Email is not valid" });
            }
            if (!validateInput(member.personal_number, "personal_number")) {
                Errors.push({ index: i, msg: "Personal Number is not valid" });
            }
            if (!validateInput(member.phone_number, "phone_number")) {
                Errors.push({ index: i, msg: "Phone Number is not valid" });
            }
        }
        return Errors;
    }, [membersData]);
    return (
        <>
            <div className={`${styles.container}`} onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className={styles.memberlist}>
                    <TopNav title="" size="small">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        <button onClick={() => setMembersData([])} className={`${topNavStyles.icon} bg-red-400 text-white !w-auto !text-xs !h-5 !p-4 !rounded-md`}>Clear</button>
                        <button onClick={handleOpenCsvBtn} className={`${topNavStyles.icon} bg-slate-700 text-white !w-auto !text-xs !h-5 !p-4 !rounded-md`}>Import from CSV</button>
                        <button onClick={handleNewMemberRow} className={`${topNavStyles.icon} bg-black text-white !w-auto !text-xs !h-5 !p-4 !rounded-md`}>New Member</button>
                    </TopNav>
                    <ul className={styles.ul}>
                        {
                            membersData.map((member, index) => {
                                const hasError = errorsInMembers.filter(err => err.index === index)[0];
                                return (
                                    <li key={index} onClick={() => handleMemberSelection(index)} className={`${selectedMemberIndex === index ? styles.selected : ""} ${styles.li} ${hasError ? "!bg-red-400" : ""}`}>
                                        <div>
                                            <h3>{member.name}</h3>
                                            <p>{member.email}</p>
                                        </div>
                                        <div className={styles.right}>
                                            <BiUserX onClick={(event: Event) => handleMemberDeletion(event, index)} />
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    membersData.length > 0 && membersData[selectedMemberIndex] &&
                    <form ref={selectedMemberFormRef} className={`${formStyles.form} ${styles.selected_member_form}`}>
                        <Input type="text" placeholder="Name" state={selectedMemberStates.setFormName} autoComplete="none" value={membersData[selectedMemberIndex]?.name} className={`${membersData[selectedMemberIndex]?.name.length < 1 && "!bg-red-400"}`} required />
                        <Input type="text" placeholder="Personal Number" state={selectedMemberStates.setFormPersonalNumber} value={membersData[selectedMemberIndex]?.personal_number} autoComplete="none" className={`${!validateInput(membersData[selectedMemberIndex]?.personal_number, "personal_number") && "!bg-red-400"}`} required />
                        <Input type="email" placeholder="Email" state={selectedMemberStates.setFormEmail} autoComplete="none" value={membersData[selectedMemberIndex]?.email} required className={`${!validateInput(membersData[selectedMemberIndex]?.email, "email") && "!bg-red-400"}`} />
                        <Input type="text" placeholder="Phone Number" state={selectedMemberStates.setFormPhoneNumber} autoComplete="none" value={membersData[selectedMemberIndex]?.phone_number ?? ""} className={`${!validateInput(membersData[selectedMemberIndex]?.phone_number, "phone_number") && "!bg-red-400"}`} required />

                        {
                            <ul>
                                <li className="text-red-400 font-bold">{errorsInMembers.filter(err => err.index === selectedMemberIndex)[0]?.msg}</li>
                            </ul>
                        }
                        <button onClick={(event) => event.currentTarget.parentElement?.classList.remove(`${styles.active}`)} className={`${styles.form_backbtn} button bg-black`} type="button"><AiOutlineLeft /></button>
                    </form>

                }

            </div>
            <div className={styles.submit_container}>
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
                        <button type="submit" onClick={handleMembersInvitationSubmit} className="bg-black" disabled={errorsInMembers.length > 0 || membersData.length < 1}>Invite</button>
                    )
                }
            </div>
        </>
    )
}

export default InviteMembers;