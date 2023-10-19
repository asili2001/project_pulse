// user.repository.ts

import DbConnection from '../connections/db-connection';
import mysql from 'mysql2/promise';
import SchoolData from '../../types/school-data';
import { promises as fs } from 'fs';
import { exec } from 'child_process';

class SchoolRepository {
    private dbConnection: DbConnection;

    constructor(DbConnection: DbConnection) {
        this.dbConnection = DbConnection;
    }

    async createSchoolWithTransaction(schoolData: SchoolData): Promise<void> {
        const performTransaction = async (
            connection: mysql.PoolConnection
        ): Promise<any> => {
            try {
                const newDatabaseName = `cactus_school_${schoolData.name}`;
                const existingDatabaseName = 'cactus_school_template';

                await connection.execute(
                    `CREATE DATABASE IF NOT EXISTS ${newDatabaseName} CHARACTER SET utf8 COLLATE utf8_general_ci;`
                );
                // Switch to the new database
                await connection.query(`USE ${newDatabaseName}`);

                // Export the database structure without data
                const exportCommand = `mysqldump -u${process.env.DB_USER} -p${process.env.DB_PASS} --no-data ${existingDatabaseName} > structure_dump.sql`;
                exec(exportCommand, (error) => {
                    if (error)
                        throw new Error(
                            `Error exporting database structure: ${error}`
                        );

                    // Import the structure into the new database
                    const importCommand = `mysql -u${process.env.DB_USER} -p${process.env.DB_PASS} ${newDatabaseName} < structure_dump.sql`;

                    exec(importCommand, async (error) => {
                        if (error)
                            throw new Error(
                                `Error importing database structure: ${error}`
                            );

                        // everything works, delete the structure_dump.sql
                        await fs.unlink('structure_dump.sql');
                    });
                });

                // Database structure cloned successfully.
                return;
            } catch (error) {
                throw new Error(
                    `Error while cloning database structure: ${error}`
                );
            }
        };
        (async () => {
            try {
                await this.dbConnection.transaction(performTransaction);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        })();
    }
}

export default SchoolRepository;
