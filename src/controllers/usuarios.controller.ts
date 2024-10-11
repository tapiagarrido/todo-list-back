import { Request, Response } from "express";
import { bcryptAdapter, JwtAdapter, WinstonAdapter } from "../config";
import { CustomError } from "../middlewares/error.middleware";
import { CrearUsuarioDto } from "../models/dtos/usuario/crear-usuario.dto";
import { LoginUsuarioDto } from "../models/dtos/usuario/login-usuario.dto";
import Usuario from "../models/usuarios.model";

export class UsuariosController {
    constructor(private readonly logger: WinstonAdapter) { }

    private handlerError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    /*
     * Habia generado funciones para probar el registro sin validación, similar a Firebase, y luego el login, pero lo descarte para cumplir con el tiempo y lo solicitado 
     */
    registrarUsuario = async (req: Request, res: Response) => {
        const [error, createUsuarioDto] = CrearUsuarioDto.create(req.body);
        if (error) return res.status(400).json(error);

        this.logger.mostrarInfo("Iniciando registro de usuario");

        let { username, nombre, correo, password } = createUsuarioDto!;

        const existeUsuarioCorreo = await Usuario.findOne({ where: { correo: correo }, raw: true });
        if (existeUsuarioCorreo) return res.status(400).json("Correo en uso");

        const existeUsername = await Usuario.findOne({ where: { username: username }, raw: true });
        if (existeUsername) return res.status(400).json("El nick de usuario ya esta en uso");

        password = bcryptAdapter.hash(password);

        try {
            const usuario = await Usuario.create({ username, nombre, correo, password });
            return res.status(201).json({
                msg: "Usuario registrado con exito",
                usuario
            });
        } catch (error) {
            this.logger.mostrarError("Error al crear usuario: " + error);
            this.handlerError(error, res);
        }
    }

    iniciarSesion = async (req: Request, res: Response) => {
        const [error, loginUsuarioDto] = LoginUsuarioDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.logger.mostrarInfo("Iniciando registro de usuario");
        let { correo, password } = loginUsuarioDto!;

        const existeUsuario = await Usuario.findOne({ where: { correo: correo } });
        if (!existeUsuario?.dataValues) return res.status(404).json("El usuario ingresado no se encuentra registrado");


        if (!bcryptAdapter.compare(password, existeUsuario.dataValues.password)) return res.status(400).json("La contraseña ingresada es incorrecta");

        const token = await JwtAdapter.generarToken({ username: existeUsuario.dataValues.username });
        if (!token) return res.status(500).json("Hubo un error en la ejecucion del token");

        const { nombre, correo: correoUsuario, username } = existeUsuario.dataValues;

        return res.status(200).json({
            Usuario: { nombre, correoUsuario, username },
            token,
            msg: `Bienvenido de vuelta ${existeUsuario.dataValues.nombre}`
        })

    }
}
