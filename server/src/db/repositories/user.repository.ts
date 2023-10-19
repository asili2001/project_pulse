import DbConnection from "../connections/db-connection";
import IUser from "../models/user.model";
import mysql from 'mysql2/promise';


class UserRepository {
    private dbConnection: DbConnection;

    constructor(DbConnection: DbConnection) {
        this.dbConnection = DbConnection;
    }


    getOne = async (table: string, keys: string[], values: string[]): Promise<IUser | undefined> => {
        let strKeys = "";
        keys.map((key, index)=> {
            if (index == 0) {
                strKeys = `WHERE `;
            }
            if ((keys.length - 1) > index) {
                strKeys += `${key} = ? AND `;
            } else {
                strKeys += `${key} = ?`;
            }
        });

        const [data] = await this.dbConnection.query(`SELECT * FROM ${table} ${strKeys} LIMIT 1`, values);


        if (!data) return;

        const res: IUser = {
            id: data.id,
            name: data.name,
            personal_number: data.personal_number,
            phone_number: data.phone_number,
            email: data.email,
            role: data.role,
            activated: data.activated
        }

        return res;
    }

    // getAll = async (keys: string[], values: string[]): Promise<IUser[] | undefined> => {
    //     let [sql, values] = ssqlBuilder.select("users", filter);
    //     const data: any[] = await (this.dbConnection.query(sql, values));

    //     if (!data) return;

    //     const res: IUser[] = [];

    //     data.forEach((item: IUser) => {
    //         res.push({
    //             id: item.id,
    //             name: item.name,
    //             personal_number: item.personal_number,
    //             phone_number: item.phone_number,
    //             email: item.email,
    //             role: item.role,
    //             activated: item.activated
    //         });
    //     });

    //     return res;
    // }

    insert = async (data: IUser): Promise<boolean> => {
        const insertUserCb = async (connection: mysql.PoolConnection): Promise<any> => {
            try {
                const res = connection.query(
                    "INSERT INTO users (name, personal_number, phone_number, email, role, password) VALUES (?, ?, ?, ?, ?, ?)",
                    [data.name, data.personal_number, data.phone_number, data.email, data.role, data.password]
                );

            } catch (error) {
                console.error(error);

            }
        }

        (async () => {
            try {
                await this.dbConnection.transaction(insertUserCb, []);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        })();
        return true;
    }

}

export default UserRepository;
