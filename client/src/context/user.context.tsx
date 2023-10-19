import React, { createContext, ReactNode, useState } from "react";
import IUser from "../types/IUser";

export interface IUserContext {
    userData: IUser;
    setUser: (data: IUser) => void
}

export const UserContext = createContext<IUserContext>({
    userData: {id: -1, name: '', role: -1, personal_number: "", phone_number: "", email: ""},
    setUser : (_data: IUser) => {},
});

interface IProps {
    children: ReactNode
}

export const UserProvider: React.FC<IProps> = ({children}) => {
    const [userData, setUserData] = useState<IUser>({id: -1, name: '', role: -1, personal_number: "", phone_number: "", email: ""});

    const setUser = (data: IUser) => {
        setUserData(data)
    }

    return (
        <UserContext.Provider value={{ userData, setUser}}>
            {children}
        </UserContext.Provider> 
    )
}