import express from "express";
import { addMetricController, getMetricsByTypeController, getLatestMetricsForChartController } from "../controllers/metricController.js";

const router = express.Router();

// Controller get metric
router.get("/metrics", getMetricsByTypeController);

// Controller add metric
router.post("/metrics", addMetricController);

// Controller get data để vẽ chart
router.get("/metrics/chart", getLatestMetricsForChartController);

export default router;
