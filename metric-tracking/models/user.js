import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

export default User;
