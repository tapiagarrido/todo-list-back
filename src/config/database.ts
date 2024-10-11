import { Sequelize } from "sequelize";
import { envs } from "./envs";

/*
 * Instancia del ORM utilizando las credenciales de pg 
 */

const sequelize = new Sequelize(envs.POSTGRES_DB_NAME, envs.POSTGRES_USER, envs.POSTGRES_PASSWORD, {
    host: envs.POSTGRES_HOST,
    dialect: 'postgres',
    port: envs.POSTGRES_PORT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize;