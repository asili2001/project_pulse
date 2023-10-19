interface IUser {
    id?: number;
    name: string;
    personal_number: string;
    phone_number?: string;
    email: string;
    role: number;
    activated?: boolean;
    password?: string;
}

export default IUser;
