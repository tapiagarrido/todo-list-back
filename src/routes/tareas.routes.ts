import { Router } from "express";
import { WinstonAdapter } from "../config";
import { TareasController } from "../controllers/tareas.controller"
import { AuthMiddleware } from "../middlewares/auth.middleware";

/*
 * Si deseas utilizar la autenticacion habilita el middleware 
 */
export class TareasRoutes {

    static get routes(): Router {
        const router = Router();

        const logger = new WinstonAdapter();
        const controller = new TareasController(logger);

        router.post("/",/*AuthMiddleware.validateJWT,*/ controller.crearTarea);
        router.get("/",/*AuthMiddleware.validateJWT,*/ controller.obtenerTareas);
        router.get("/:id",/*AuthMiddleware.validateJWT,*/ controller.obtenerTareaPorId);
        router.put("/:id",/*AuthMiddleware.validateJWT,*/ controller.modificarTarea);
        router.delete("/:id",/*AuthMiddleware.validateJWT,*/ controller.eliminarTarea);


        return router
    }
}