interface IUser {
    id: number;
    name: string;
    personal_number: string;
    phone_number: string;
    email: string;
    activated?: number;
    role: number;
}

export default IUser;
