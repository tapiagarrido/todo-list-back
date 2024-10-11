import { Request, Response } from "express";
import { WinstonAdapter } from "../config";
import { CustomError } from "../middlewares/error.middleware";
import { CrearTareaDto } from "../models/dtos/tarea/crear-tarea.dto";
import Tarea from "../models/tareas.model";
import { ModificarTareaDto } from "../models/dtos/tarea/modificar-tarea.dto";


export class TareasController {

    constructor(
        private readonly logger: WinstonAdapter
    ) { }


    /*
     *  Funcion que permite maneja y propagar errores que se capturan en el catch y que provienen del model
    */
    private handlerError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
    }

    /*
     * Funcion para generar tareas, por el momento se evitara el uso de usuarios reales y se utilizara el admin, que existe como usuario de prueba, utilizaremos un DTO para manejar los datos y asegurarnos de que esten presentes antes de llamar al modelo 
     */
    crearTarea = async (req: Request, res: Response) => {
        //const { username } = req.body.usuario;
        const [error, createTareaDto] = CrearTareaDto.create({ usuarioId: 'admin', ...req.body });
        if (error) return res.status(400).json(error);

        this.logger.mostrarInfo("Iniciando creación de tarea");

        const { titulo, descripcion, usuarioId, completada } = createTareaDto!;

        try {
            const tarea = await Tarea.create({ titulo, descripcion, usuarioId, completada });
            return res.status(201).json({
                msg: "Tarea creada exitosamente",
                tarea
            });
        } catch (error) {
            this.handlerError(error, res);
        }

    }

    /*
     * Funcion para modificar tareas, esta puede ser utilizada tanto para editar en caso de errores de tipeo como para dar una tarea por finalizada 
     */
    modificarTarea = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Debe ingresar el id a buscar" });
        }

        try {
            const tareaEncontrada = await Tarea.findByPk(id);
            if (!tareaEncontrada) {
                return res.status(404).json({ error: "Tarea no encontrada" });
            }

            const [error, modificarTareaDto] = ModificarTareaDto.create(req.body);
            if (error) {
                return res.status(400).json(error);
            }

            const { titulo, descripcion, completada } = modificarTareaDto!;

            await tareaEncontrada.update({
                titulo,
                descripcion,
                completada,
            });

            return res.status(200).json({
                msg: "Tarea modificada exitosamente",
                tarea: tareaEncontrada
            });
        } catch (error) {
            this.handlerError(error, res);
        }
    }


    /*
    * Funcion que permite obtener lista de tareas, que por por query string solo enviara de manera limitada para no sobrecargar el front; tambien segun parametros de order dejaremos las tareas mas nuevas al principio, siempre y cuando estas no esten completadas
    */
    obtenerTareas = async (req: Request, res: Response) => {

        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const offset = (page - 1) * limit;

        try {
            const tareas = await Tarea.findAll({
                limit: limit,
                offset: offset,
                order: [
                    ['completada', 'ASC'],
                    ['createdAt', 'DESC']
                ]
            });

            const totalTareas = await Tarea.count();
            const totalPages = Math.ceil(totalTareas / limit);

            return res.status(200).json({
                msg: "Tareas obtenidas exitosamente",
                tareas,
                pagination: {
                    totalItems: totalTareas,
                    totalPages: totalPages,
                    currentPage: page,
                    limit: limit
                }
            });
        } catch (error) {
            this.handlerError(error, res);
        }
    }


    /*
     * Funcion que permite buscar una tarea por su ID 
     */
    obtenerTareaPorId = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Debe ingresar el id a buscar" });
        }

        try {
            const tarea = await Tarea.findByPk(id);

            if (!tarea) {
                return res.status(404).json({ error: "Tarea no encontrada" });
            }

            return res.status(200).json({
                msg: "Tarea obtenida exitosamente",
                tarea
            });
        } catch (error) {
            this.handlerError(error, res);
        }
    }


    /*
    * Funcion que permite eliminar una tarea de manera definitiva en base a su id, previamente, verificamos si existe un elemento a ser eliminado.
    */
    eliminarTarea = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) return res.status(400).json("Debe ingresar el id a buscar");
        const tareaEncontrada = await Tarea.findByPk(id);

        if (!tareaEncontrada) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        try {
            await Tarea.destroy({ where: { id } });

            return res.status(200).json({ msg: "Tarea eliminada exitosamente" });

        } catch (error) {
            this.handlerError(error, res);
        }


    }

    /**
     * Todo: puedo mejorar la eficacia del codigo reutilizando por ejemplo el buscador de elementos existentes.
     */
}