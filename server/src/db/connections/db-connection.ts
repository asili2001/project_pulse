import mysql, { Connection, Pool, PoolConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

type TransactionFunction<T> = (connection: Connection) => Promise<T>;

class DbConnection {
    private pool: Pool;

    constructor(database: string) {
        const host = process.env.DB_HOST;
        const port: number = parseInt(process.env.DB_PORT!);
        const user = process.env.DB_USER;
        const pass = process.env.DB_PASS;

        this.pool = mysql.createPool({
            host: host,
            user: user,
            port: port,
            password: pass,
            database: database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    async checkConnection(): Promise<boolean> {
        let isConnected = false;

        try {
            const connection: mysql.PoolConnection =
                await this.pool.getConnection();
            connection.release(); // Release the connection immediately
            isConnected = true;
        } catch (error) {
            console.error('Connection error:', error);
        }

        return isConnected;
    }

    query = async (sql: string, values?: any[]) => {
        const connection: PoolConnection = await this.pool.getConnection();

        try {
            const [rows]: any = await connection.query(sql, values);
            
            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    };

    transaction = async <T>(
        transactionFn: (
          connection: mysql.PoolConnection,
          transactionFnParams: T
        ) => Promise<any>,
        transactionFnParams: T
      ) => {
        const connection: PoolConnection = await this.pool.getConnection();
        await connection.beginTransaction();
      
        try {
          const result = await transactionFn(connection, transactionFnParams);
          await connection.commit();
          return result;
        } catch (error) {
          await connection.rollback();
          throw error;
        } finally {
          connection.release();
        }
      };
}

export default DbConnection;
