import React, { ReactNode } from "react";
import styles from "./WorkArea.module.scss";

interface ParentComponentProps {
    children: ReactNode;
}
const WorkArea = (props: ParentComponentProps)=> {
    const modifiedChildren = React.Children.map(props.children, (child, index) => {
        return <React.Fragment key={index}>{child}</React.Fragment>;
    });
    return (
        <section className={styles.work_area}>
            {modifiedChildren}
        </section>
    );
}

export default WorkArea;