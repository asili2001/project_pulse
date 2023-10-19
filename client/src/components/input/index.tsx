import { ChangeEvent, ReactNode } from "react";
import styles from "./Input.module.scss";

interface InputComponentProps {
    type: string;
    placeholder: string;
    state?: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
    value?: string;
    required?: boolean;
    autoComplete?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
interface SelectComponentProps {
    placeholder: string;
    state: React.Dispatch<React.SetStateAction<number>> | ((value: number) => void);
    value?: string;
    required?: boolean;
    autoComplete?: string;
    className?: string;
    children: ReactNode
}

const Input = (props: InputComponentProps) => {

    // Styling) Check if input is not empty then change style
    const ChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        if (!props.state) return;
        props.state(event.target.value);

        if (event.target.value.length > 0) {
            event.target.classList.add(styles.filled);
        } else {
            event.target.classList.remove(styles.filled);
        }
    }

    return (
        <div className={`${styles.input}`}>
            {
                props.onChange ? (
                    <input type={props.type} onChange={props.onChange} className={`${props.className}`} value={props.value} autoComplete={props.autoComplete} required={props.required} />
                ) : (
                    <input type={props.type} onChange={ChangeEvent} className={`${props.className}`} value={props.value} autoComplete={props.autoComplete} required={props.required} />
                )
            }
            <span className={styles.tag}>{props.placeholder}</span>
        </div>
    );
}

const Select = (props: SelectComponentProps) => {

    // Styling) Check if input is not empty then change style
    const ChangeEvent = (event: ChangeEvent<HTMLSelectElement>) => {
        props.state(parseInt(event.target.value));

        if (event.target.value.length > 0) {
            event.target.classList.add(styles.filled);
        } else {
            event.target.classList.remove(styles.filled);
        }
    }

    return (
        <div className={`${styles.input}`}>
            <select className={`${props.className}`} onChange={ChangeEvent} value={props.value} autoComplete={props.autoComplete} required={props.required}>
                {props.children}
            </select>
            <span className={styles.tag}>{props.placeholder}</span>
        </div>
    );
}


export { Input, Select };