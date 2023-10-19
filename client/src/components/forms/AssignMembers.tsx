import { useContext, useEffect, useState } from "react";
import FilterableList, { IFilterableItem } from "../input/FilterableList";
import formStyles from "./Forms.module.scss";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { ProjectContext } from "../../context/project.context";

const AssignMembers = (props: { projectId: number, onSubmit: ()=>void }) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [members, setMembers] = useState<IFilterableItem[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { selectedProjectData, loading, assigneMembers } = useContext(ProjectContext)


    const handleSelectedItemsChange = (newSelectedItems: number[]) => {
        setSelectedItems(newSelectedItems);
    };

    const handleMemberAssignment = async () => {
        await assigneMembers(selectedItems);

        props.onSubmit();
        setSubmitted(true);
        return toast.success("Success");
    }

    useEffect(() => {
        const initialize = async () => {
            if (!selectedProjectData || !selectedProjectData.unassignedMembers) return;
            const data: IFilterableItem[] = selectedProjectData.unassignedMembers.map((member) => {
                return {
                    id: member.id,
                    content: <p>{member.name}</p>,
                    searchKeys: [member.name, member.email, member.personal_number, member.phone_number]
                }
            });


            setMembers(data);
        }

        initialize().catch(console.error);
        setSubmitted(false);


        return () => {
            setSubmitted(false);
        };
    }, [submitted]);
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
        ) : (
            <>
                <form className={formStyles.form}>
                    <FilterableList className="p-2 shadow-sm shadow-gray-400 rounded-lg h-80 overflow-auto" data={members} onSelectedItemsChange={handleSelectedItemsChange} selectable />
                    <button type="button" onClick={handleMemberAssignment} className={`${formStyles.submitBtn} bg-black`}>Assign</button>
                </form>
            </>
        )
    );
}

export default AssignMembers;