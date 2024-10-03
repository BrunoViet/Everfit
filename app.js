import express from "express";
import sequelize from "./config/database.js";
import metricRoutes from "./routes/metricRoutes.js";

const app = express();
app.use(express.json());

// Metric routes
app.use("/api", metricRoutes);

// Khởi động server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});
