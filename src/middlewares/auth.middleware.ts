import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";
import Usuario from "../models/usuarios.model";

/*
 * Deje listo el middleware de autenticación, por si desean probarlo de alguna forma 
 */
export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {

        const authorization = req.header('Authorization');
        if (!authorization) {
            const error = new Error("El token no se encuentra")
            return res.status(401).json({ error: error.message });
        }
        
        if (!authorization?.startsWith('Bearer')) {
            const error = new Error("El token no contiene el formato Bearer")
            return res.status(401).json({ error: error.message });
        }

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validacionToken<{ username: string }>(token);
            if (!payload) {
                const error = new Error("Token no valido")
                return res.status(401).json({ error: error.message });
            }

            const usuario = await Usuario.findByPk(payload.username);
            if (!usuario) {
                const error = new Error("Token invalido - no se encuentra un usuario")
                return res.status(401).json({ error: error.message });
            }
            const { c, updated_at, password, ...datosUsuario } = usuario.dataValues;
            req.body.usuario = datosUsuario;
            next();
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`)
        }

    }
}