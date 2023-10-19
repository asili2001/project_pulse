import React from "react";
import TopNav from "../../components/navbar/top-nav";
import styles from "./widget.module.scss";

// Define the ContentListItem type
type ContentListItem = {
    left: {
        content: JSX.Element;
        style?: React.CSSProperties;
        className?: string;
    };
    right: {
        content: JSX.Element;
        style?: React.CSSProperties;
        className?: string;
    };
    style?: React.CSSProperties;
    className?: string;
};

// Define the widgetData type
export interface WidgetData {
    headerTitle: string;
    style?: React.CSSProperties;
    className?: string;
    headerItems: JSX.Element;
    content: ContentListItem[] | React.ReactNode;
}

// Define the properties that this Widget component accepts
interface WidgetProps {
    style?: React.CSSProperties;
    data: WidgetData[]; // An array of WidgetData objects
}

// A utility function to check if data is an array of ContentListItem
const isContentListItemArray = (data: ContentListItem[] | React.ReactNode): data is ContentListItem[] => {
    return Array.isArray(data) && data.every((item) => typeof item === "object");
};

// The main Widget component
const Widget = (props: WidgetProps) => {
    return (
        <div className={`${styles.widget}`} style={props.style}>
            {/* Map over the array of WidgetData objects */}
            {props.data.map((widget, index) => {
                return (
                    <div
                        className={`${widget.className} ${styles.item}`}
                        style={widget.style}
                        key={index}
                    >
                        {/* Render the TopNav component */}
                        <TopNav size="small" title={widget.headerTitle}>
                            {widget.headerItems}
                        </TopNav>

                        {/* Render a list or the content based on its type */}
                        {isContentListItemArray(widget.content) // Check if content is an array of ContentListItem
                            ? (
                                <ul>
                                    {widget.content.map((widgetContent, index) => (
                                        <li
                                            style={widgetContent.style}
                                            className={widgetContent.className}
                                            key={index}
                                        >
                                            {/* Render left and right content */}
                                            <div
                                                className={`${widgetContent.left.className} ${styles.left}`}
                                                style={widgetContent.left.style}
                                            >
                                                {widgetContent.left.content}
                                            </div>
                                            <div
                                                className={`${widgetContent.right.className} ${styles.right}`}
                                                style={widgetContent.right.style}
                                            >
                                                {widgetContent.right.content}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )
                            : widget.content // Render content as is if it's not an array of ContentListItem
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default Widget;
