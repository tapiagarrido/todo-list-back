import "dotenv/config";
import { get } from "env-var";

/*
 * Me gusta utilizar este validador de variables de entorno para una segunda capa de seguridad ante errores
 */
export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    JWT_SEED: get("JWT_SEED").required().asString(),
    POSTGRES_USER: get("POSTGRES_USER").required().asString(),
    POSTGRES_PASSWORD: get("POSTGRES_PASSWORD").required().asString(),
    POSTGRES_HOST: get("POSTGRES_HOST").required().asString(),
    POSTGRES_DB_NAME: get("POSTGRES_DB_NAME").required().asString(),
    POSTGRES_PORT: get("POSTGRES_PORT").required().asPortNumber(),
    WHITELIST: get("WHITELIST").required().asString()
}