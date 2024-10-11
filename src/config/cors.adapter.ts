import cors from 'cors';
import { envs } from './envs';

/*
 * Adaptador del cors que nos permite habilitar las peticiones del cliente, puedes agregar parametros para permitir mas elementos en el header 
 */
export class CorsAdapter {
    static configureCors() {
        return cors({
            origin: envs.WHITELIST,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        });
    }
}