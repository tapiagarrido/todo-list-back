import { Logger, createLogger, transports, format } from "winston";

const { combine, timestamp, printf, colorize } = format;

/*
 * Este adaptador es para log personalizado 
 */
export class WinstonAdapter {
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: combine(
                colorize({ all: true }),
                timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
                printf(info => `${info.timestamp} - [${info.level}]: ${info.message}`),
            ),
            transports: [
                new transports.Console()
            ]
        })
    }

    mostrarInfo(mensaje: string): void {
        this.logger.info(mensaje);
    }

    mostrarError(mensaje: string, error?: unknown): void {
        if (error) {
            this.logger.error(`${mensaje}: ${error}`);
        } else {
            this.logger.error(mensaje);
        }
    }
}
