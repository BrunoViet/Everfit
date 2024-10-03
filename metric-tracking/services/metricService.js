import Metric from "../models/metric.js";
import { Op } from "sequelize";

// Add mới Metric
export async function addMetric(userId, metricType, value, unit, date) {
    return Metric.create({
        userId,
        metricType,
        value,
        unit,
        date
    });
}

// Get Metric dựa vào Type
export async function getMetricsByType(userId, metricType) {
    return Metric.findAll({
        where: {
            userId,
            metricType
        }
    });
}

// Get dữ liệu Metric sau cùng của mỗi ngày để vẽ chart
export async function getLatestMetricsForChart(userId, metricType, periodInMonths) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - periodInMonths);

    return Metric.findAll({
        where: {
            userId,
            metricType,
            date: {
                [Op.between]: [startDate, endDate]
            }
        },
        group: ["DATE(date)"],
        order: [["date", "DESC"]]
    });
}

// Convert đơn vị
export function convertValue(value, fromUnit, toUnit) {
    const conversionRates = {
        "meter": {
            "centimeter": value => value * 100,
            "inch": value => value * 39.3701,
            "feet": value => value * 3.28084,
            "yard": value => value * 1.09361,
        },
        "centimeter": {
            "meter": value => value / 100,
            "inch": value => value * 0.393701,
            "feet": value => value * 0.0328084,
            "yard": value => value * 0.0109361,
        },
        "inch": {
            "meter": value => value / 39.3701,
            "centimeter": value => value * 2.54,
            "feet": value => value / 12,
            "yard": value => value / 36,
        },
        "feet": {
            "meter": value => value / 3.28084,
            "centimeter": value => value * 30.48,
            "inch": value => value * 12,
            "yard": value => value / 3,
        },
        "yard": {
            "meter": value => value / 1.09361,
            "centimeter": value => value * 91.44,
            "inch": value => value * 36,
            "feet": value => value * 3,
        },
        "celsius": {
            "fahrenheit": value => (value * 9 / 5) + 32,
            "kelvin": value => value + 273.15,
        },
        "fahrenheit": {
            "celsius": value => (value - 32) * 5 / 9,
            "kelvin": value => (value - 32) * 5 / 9 + 273.15,
        },
        "kelvin": {
            "celsius": value => value - 273.15,
            "fahrenheit": value => (value - 273.15) * 9 / 5 + 32,
        }
    };

    if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
        return conversionRates[fromUnit][toUnit](value);
    }
    return value;
}
