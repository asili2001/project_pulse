"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DbConnection {
    pool;
    constructor(database) {
        const host = process.env.DB_HOST;
        const port = parseInt(process.env.DB_PORT);
        const user = process.env.DB_USER;
        const pass = process.env.DB_PASS;
        this.pool = promise_1.default.createPool({
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
    async checkConnection() {
        let isConnected = false;
        try {
            const connection = await this.pool.getConnection();
            connection.release(); // Release the connection immediately
            isConnected = true;
        }
        catch (error) {
            console.error('Connection error:', error);
        }
        return isConnected;
    }
    query = async (sql, values) => {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.query(sql, values);
            return rows;
        }
        catch (error) {
            throw error;
        }
        finally {
            connection.release();
        }
    };
    transaction = async (transactionFn) => {
        const connection = await this.pool.getConnection();
        await connection.beginTransaction();
        try {
            const result = await transactionFn(connection);
            await connection.commit();
            return result;
        }
        catch (error) {
            await connection.rollback();
            throw error;
        }
        finally {
            connection.release();
        }
    };
}
exports.default = DbConnection;
