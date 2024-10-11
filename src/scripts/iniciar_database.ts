import sequelize from "../config/database";
import Usuarios from "../models/usuarios.model";
import Tareas from "../models/tareas.model";
import { WinstonAdapter } from "../config";


const iniciarBaseDeDatos = async () => {

    const logger = new WinstonAdapter();

    try {
        await sequelize.authenticate();
        logger.mostrarInfo("Conexión a la base de datos establecida correctamente.");

        await Usuarios.sync({force:false});
        await Tareas.sync({force:false});
        logger.mostrarInfo("Tablas creadas o actualizadas correctamente");
    } catch (error) {
        logger.mostrarError('Ha ocurrido un error al actualizar la DB', error);
    }
}

export default iniciarBaseDeDatos;