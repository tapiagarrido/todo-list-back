import { Request, Response, NextFunction } from 'express';

/*
 * Definimos una forma personalizada de gestionar los errores; esta clase puede ser instanciada por el usuario si desea por ejm utilizar el modelo de manera descentralizada del ORM  
 */
class CustomError extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
    }

    static badRequestError(message: string) {
        return new CustomError(400, message);
    }

    static unauthorizedError(message: string) {
        return new CustomError(401, message);
    }

    static forbiddenError(message: string) {
        return new CustomError(403, message);
    }

    static notFoundError(message: string) {
        return new CustomError(404, message);
    }

    static methodNotAllowedError(message: string) {
        return new CustomError(405, message);
    }

    static conflictError(message: string) {
        return new CustomError(409, message);
    }

    static internalServerError(message: string) {
        return new CustomError(500, message);
    }

}

/*
 * Middleware que nos permite manejar los errores de menera superior evitando un bloqueo de las funciones 
 */
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.statusCode || 'error';

    res.status(statusCode).json({
        status,
        message: err.message
    });
};

/*
* middleware para manejar rutas no existentes
*/
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomError(404, `No se puede encontrar ${req.originalUrl} en el servidor!`);
    next(err);
};

export { errorHandler, notFoundHandler, CustomError };
