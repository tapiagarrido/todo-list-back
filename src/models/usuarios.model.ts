// models/Usuarios.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Usuario extends Model {}

Usuario.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'usuario',
        timestamps: true
    }
);

export default Usuario;
