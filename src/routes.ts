import { Router } from "express";
import { TareasRoutes } from "./routes/tareas.routes";
import { UsuariosRoutes } from "./routes/usuarios.routes";

export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        router.use("/api/tareas", TareasRoutes.routes);
        router.use("/api/usuarios", UsuariosRoutes.routes);
        
        return router;
    }

}
