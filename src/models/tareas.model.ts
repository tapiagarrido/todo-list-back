
//import Usuario from "./usuarios.model";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Tarea extends Model { }

/*
 * Desactive la referencia al usuario para no tener problemas al guardar las tareas 
 */
Tarea.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuarioId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        /*        usuarioId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'username'
            }
        },*/
        completada: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    },
    {
        sequelize,
        modelName: 'tareas',
        timestamps: true
    }
);

// Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId' });

export default Tarea;
