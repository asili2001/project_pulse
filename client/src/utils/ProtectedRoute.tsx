import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../api/mainApi";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../context/user.context";
interface IProps {
    children: React.ReactNode
    giveAccessTo: number[]
}

const ProtectedRoute: React.FC<IProps> = ({ children, giveAccessTo }): JSX.Element => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    
    useEffect(() => {
        const checkUserToken = async () => {
            const abortController = new AbortController();
            setLoading(true);
            const signal = abortController.signal;
            const checkAuth = await AuthServices.checkAuth(signal);
            
    
            if (checkAuth !== "ABORTED") {
                if (checkAuth.type === "success" && checkAuth.status === 200) {
                    setLoading(false);
                    setIsLoggedIn(true);
                    setUser({
                        id: checkAuth.userData.id,
                        name: checkAuth.userData.name,
                        email: checkAuth.userData.email,
                        phone_number: checkAuth.userData.phone_number,
                        personal_number: checkAuth.userData.perosnal_number,
                        role: checkAuth.userData.role,
                    });

                    if(!giveAccessTo.includes(checkAuth.userData.role)) {
                        navigate("/404");
                        return null;
                    }
                    return;
                }
                navigate("/login");
                toast.error("Please Login");
                return;
            }
        }
        checkUserToken();

        return () => {
            setIsLoggedIn(false);
        }
    }, [setIsLoggedIn, navigate]);

    return (
        loading ? (
            <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center">
                <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
            </div>
        ) :
            (
                <React.Fragment>
                    {
                        isLoggedIn ? children : null
                    }
                </React.Fragment>
            )
    )
}
export default ProtectedRoute;