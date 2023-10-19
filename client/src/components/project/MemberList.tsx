import { BiSolidUser } from "react-icons/bi";
import IUser from "../../types/IUser";
const MemberList = (props: {members: IUser[], projectId: number, storeInState: React.Dispatch<React.SetStateAction<number>>}) => {

    const selectMember = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, memId: number | undefined) => {
        if (!memId) { return }
        const ulElement = event.currentTarget.parentElement as HTMLUListElement;
        const membersList = Array.from(ulElement.children) as HTMLLIElement[];
        membersList.forEach((element: HTMLLIElement) => {
            element.classList.remove("!bg-blue-200");
        });

        const selectedElement = event.currentTarget as HTMLLIElement;

        selectedElement.classList.add("!bg-blue-200");

        props.storeInState(memId);
    }

    return (
        <ul>
            {
                props.members.map(member => {
                    return (
                        <li onClick={(event) => selectMember(event, member.id)} key={member.id} className={`cursor-pointer transition-colors ease-in-out duration-150 h-10 items-center !py-7 bg-transparent !shadow-none justify-between`}>
                            <div className="flex justify-center items-center gap-3">
                                <BiSolidUser className={`${member.role === 1 ? "text-red-500" : "text-blue-500"} bg-slate-100 h-10 w-10 rounded-full p-2`} />
                                <h3 className=" font-semibold">{member.name}</h3>
                            </div>
                        </li>
                    )
                })
            }
        </ul>

    );
}

export default MemberList;