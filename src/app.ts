import express from "express";
import iniciarDB from "./scripts/iniciar_database";
import { CorsAdapter, envs } from "./config";
import { errorHandler } from "./middlewares/error.middleware";
import { AppRoutes } from "./routes";
const app = express();

/*
 * Instanciamos rutas y middlewares necesarios para el funcionamiento de la aplicación 
 */
app.use(CorsAdapter.configureCors());
app.use(express.json());
app.use(errorHandler);
app.use(AppRoutes.routes);

/*
 * Iniciamos el servidor ejecutando el script de poblado de tablas 
 */
const startServer = async () => {
    try {
        await iniciarDB(); 
        app.listen(envs.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${envs.PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};


startServer();
