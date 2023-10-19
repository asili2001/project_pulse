import { useState } from "react";
import { Input } from "../input";
import styles from "./Forms.module.scss";
import { AuthServices } from "../../api/mainApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const Signin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [handleSubmitLoading, setHandleSubmitLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleFormClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email.length < 1) return setMsg("Please enter an email");
        if (password.length < 1) return setMsg("Please enter a password");

        const abortController = new AbortController();
        setHandleSubmitLoading(true);
        const signal = abortController.signal;
        const login = await AuthServices.login(email, password, signal);

        if (login !== "ABORTED") {
            if (login.type === "success") {
                navigate("/");
                toast.success("Success!");
                return;
            }
            setMsg(login.message);
            setHandleSubmitLoading(false);
            return;
        }
    }

    return (
        <form className={styles.form} onSubmit={handleFormClick}>
            <div className={styles.title_container}>
                <h1>Login</h1>
                <p>Enter your email address and password</p>
            </div>
            <Input type="email" placeholder="Email" state={setEmail} autoComplete="current-email" required />
            <Input type="password" placeholder="Password" state={setPassword} autoComplete="current-password" required />
            <p className={`${styles.message_box} ${styles.error}`}>{msg}</p>
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
                    <button type="submit" className="bg-black">Login</button>
                )
            }
        </form>
    );
}

export default Signin;