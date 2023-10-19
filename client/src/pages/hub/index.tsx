import WorkArea from "../../components/work-area";
import SideNavBase from "../../components/navbar/side-nav-base";

interface ParentComponentProps {
    view: JSX.Element;
}

const Hub = (props: ParentComponentProps)=> {
    return (
        <>
            <SideNavBase />
            <WorkArea>
                { props.view }
            </WorkArea>
        </>
    );
}

export default Hub;