import { Router } from "express";
import { WinstonAdapter } from "../config";
import { UsuariosController } from "../controllers/usuarios.controller";


export class UsuariosRoutes {

    static get routes(): Router {
        const router = Router();

        const logger = new WinstonAdapter();
        const controller = new UsuariosController(logger);

        router.post("/", controller.registrarUsuario);
        router.post("/login", controller.iniciarSesion);

        return router
    }
}