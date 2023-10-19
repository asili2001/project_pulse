import { useEffect, useState } from "react";
import { Input } from "../input";
import styles from "./Forms.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthServices } from "../../api/mainApi";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

const ActivateAccount = () => {
    const [searchParams] = useSearchParams()
    const [token, setToken] = useState<string | null>(null);
    const [rePassword, setRePassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [handleSubmitLoading, setHandleSubmitLoading] = useState<boolean>(false);
    const [tokenValidationloading, setTokenValidationLoading] = useState<boolean>(true);
    const [msg, setMsg] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!token || token.length < 1) {
            navigate("/");
            toast.error("Invalid URL");
            return;
        }
        if (password.length < 1) return setMsg("Please enter a password");
        if (password.length < 8) return setMsg("password length must be at least 8 characters long");
        if (rePassword.length < 1) return setMsg("Please re-enter your password");
        if (password !== rePassword) return setMsg("Your password does not match");
        
        const abortController = new AbortController();
        setHandleSubmitLoading(true);
        const signal = abortController.signal;

        const activate = await AuthServices.activateUser(token, password, signal);

        if (activate !== "ABORTED") {
            if (activate.type === "success") {
                navigate("/");
                toast.success("Success!");
                return;
            }
            setMsg(activate.message);
            setHandleSubmitLoading(false);
            return;
        }

        setHandleSubmitLoading(false);
        return;

    }


    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const checkToken = async (tokenParam: string) => {
            if (!tokenParam || tokenParam.length < 1) {
                return false;
            }

            return await AuthServices.checkTokenIfValid(tokenParam, signal);
        };

        const initialize = async () => {
            const tokenParam = searchParams.get("t");
            const validToken = await checkToken(tokenParam ?? "");

            if (validToken === "ABORTED") {
                setTokenValidationLoading(false);
                return;
            }
            if (!validToken) {
                navigate("/");
                toast.error("Invalid URL");
            } else {
                setToken(tokenParam);
            }
        };

        initialize().catch(console.error);


        return () => {
            abortController.abort();
        };
    }, [navigate, searchParams]);


    return (
        tokenValidationloading ? (
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#3399ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
        ) :
            (
                <form action="" className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.title_container}>
                        <h1>Welcome</h1>
                        <p>Enter your new password to activate your account</p>
                    </div>
                    <Input type="password" placeholder="Password" state={setPassword} autoComplete="off" required />
                    <Input type="password" placeholder="Re-Password" state={setRePassword} autoComplete="off" required />
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
                                <button type="submit" className="bg-black">Activate</button>
                            )
                    }
                </form>

            )
    );
}

export default ActivateAccount;