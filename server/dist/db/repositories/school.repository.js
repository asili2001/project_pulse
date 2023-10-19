"use strict";
// user.repository.ts
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const child_process_1 = require("child_process");
class SchoolRepository {
    dbConnection;
    constructor(DbConnection) {
        this.dbConnection = DbConnection;
    }
    async createSchoolWithTransaction(schoolData) {
        const performTransaction = async (connection) => {
            try {
                const newDatabaseName = `cactus_school_${schoolData.name}`;
                const existingDatabaseName = 'cactus_school_template';
                await connection.execute(`CREATE DATABASE IF NOT EXISTS ${newDatabaseName} CHARACTER SET utf8 COLLATE utf8_general_ci;`);
                // Switch to the new database
                await connection.query(`USE ${newDatabaseName}`);
                // Export the database structure without data
                const exportCommand = `mysqldump -u${process.env.DB_USER} -p${process.env.DB_PASS} --no-data ${existingDatabaseName} > structure_dump.sql`;
                (0, child_process_1.exec)(exportCommand, (error) => {
                    if (error)
                        throw new Error(`Error exporting database structure: ${error}`);
                    // Import the structure into the new database
                    const importCommand = `mysql -u${process.env.DB_USER} -p${process.env.DB_PASS} ${newDatabaseName} < structure_dump.sql`;
                    (0, child_process_1.exec)(importCommand, async (error) => {
                        if (error)
                            throw new Error(`Error importing database structure: ${error}`);
                        // everything works, delete the structure_dump.sql
                        await fs_1.promises.unlink('structure_dump.sql');
                    });
                });
                // Database structure cloned successfully.
                return;
            }
            catch (error) {
                throw new Error(`Error while cloning database structure: ${error}`);
            }
        };
        (async () => {
            try {
                await this.dbConnection.transaction(performTransaction);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        })();
    }
}
exports.default = SchoolRepository;
