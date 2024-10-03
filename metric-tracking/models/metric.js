import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";

const Metric = sequelize.define("Metric", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  metricType: {
    type: DataTypes.ENUM("distance", "temperature"),
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {});

export default Metric;
