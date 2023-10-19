import TopNav from "../../components/navbar/top-nav";
import topNavStyles from "../../components/navbar/top-nav/TopNav.module.scss";
import Widget, { WidgetData } from "../../components/widget";
import Avatar from '../../assets/Avatar.png';
import {AiOutlineUserAdd, AiOutlineClose} from 'react-icons/ai';
import { useEffect, useState } from "react";
import InviteMembers from "../../components/forms/InviteMembers";
import { UserServices } from "../../api/mainApi";
import IUser from "../../types/IUser";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Employees = () => {
    const [visibleInvitationModal, setVisibleInvitationModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [usersWidgetData, setUsersWidgetData] = useState<WidgetData[]>([
        {
            headerTitle: "Employees",
            headerItems: <></>,
            style: { "gridArea": "1/1" },
            content: []
        }
    ]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const getAllUsers = async () => {
            return await UserServices.getAll(signal);
        };

        const initialize = async () => {
            setLoading(true);
            const users: IUser[]|string = await getAllUsers();

            if (users === "ABORTED") {
                setLoading(false);
                return;
            }

            if (typeof users === "string") return;
            const usersWidgetContent = [];
            for (let user of users) {
                usersWidgetContent.push({
                    className: "h-20 items-center",
                    left: {
                        content: <>
                            <img src={Avatar} alt="" className="bg-[#2091e542] rounded-full p-2 h-full" />
                            <div>
                                <p>{user.name} <b>{user.role === 1 && "(Project Manager)"}</b></p>
                                <p>{user.email}</p>
                            </div>
                        </>,
                        className: "!flex !flex-row !items-center !gap-2 h-full"
                    },
                    right: {
                        content: <div className={`h-5 w-5 rounded-full ${user.activated ? "bg-green-500" : "bg-red-500"}`}></div>,
                    },
                });

            }
            
            const tmpUsersWidgetData = usersWidgetData;
            tmpUsersWidgetData[0].content = usersWidgetContent;
            setUsersWidgetData([...tmpUsersWidgetData]);
            setLoading(false);

            
        };
        
        initialize().catch(console.error);
        
        
        return () => {
            abortController.abort();
            setLoading(false);
        };
    }, [visibleInvitationModal]);

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
                    <TopNav title="Employees" size="large">
                        <div className={`${topNavStyles.icon} ${topNavStyles.round} ${topNavStyles.black}`} onClick={()=> setVisibleInvitationModal(!visibleInvitationModal)}>
                            <AiOutlineUserAdd />
                        </div>
                    </TopNav>
        
                    <section className={visibleInvitationModal ? "modal m-visible" : "modal"}>
                        <div className="dialog md:!w-[40rem]">
                            <TopNav title="Invite Members" size="large"><AiOutlineClose className={topNavStyles.icon} onClick={()=> setVisibleInvitationModal(!visibleInvitationModal)}/></TopNav>
                            <InviteMembers/>
                        </div>
                    </section>
        
                    <Widget data={usersWidgetData} style={{ gridTemplateColumns: "1fr" }} />
                </React.Fragment>
            )
    );
}

export default Employees;
