import { addMetric, getMetricsByType, getLatestMetricsForChart, convertValue } from "../services/metricService.js";

// Add a new metric
export async function addMetricController(req, res) {
    const { userId, metricType, value, unit, date } = req.body;
    try {
        const metric = await addMetric(userId, metricType, value, unit, date);
        res.status(201).json(metric);
    } catch (error) {
        res.status(500).json({ error: "Failed to add metric" });
    }
}

// Get metrics by type
export async function getMetricsByTypeController(req, res) {
    const { userId, metricType } = req.query;
    try {
        const metrics = await getMetricsByType(userId, metricType);
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ error: "Failed to get metrics" });
    }
}

// Get data for chart
export async function getLatestMetricsForChartController(req, res) {
    const { userId, metricType, periodInMonths, unit } = req.query;
    try {
        let metrics = await getLatestMetricsForChart(userId, metricType, periodInMonths);

        if (unit) {
            metrics = metrics.map(metric => ({
                ...metric.dataValues,
                value: convertValue(metric.value, metric.unit, unit),
                unit
            }));
        }

        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ error: "Failed to get data for chart" });
    }
}
