import { ReactNode } from "react";
import styles from "./TopNav.module.scss";

interface ParentComponentProps {
    children?: ReactNode;
    title: string;
    size: "large" | "small";
}
const TopNav = (props: ParentComponentProps)=> {
    let titleElm: JSX.Element = <></>;
    if (props.size === "large") {
        titleElm = <h1 className={`${styles.title}`}>{props.title}</h1>;
    }

    if (props.size === "small") {
        titleElm = <p className={`${styles.title}`}>{props.title}</p>;
    }
    return (
        <div className={`${styles.header} ${props.size === "small" ? styles.small : ""}`}>
            { titleElm }
            <div className={`${styles.items}`}>
                { props.children }
            </div>
        </div>
    );
}

export default TopNav;