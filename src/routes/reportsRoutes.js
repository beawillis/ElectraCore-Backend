const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Reports endpoint is available",
    data: {
      reports: [
        {
          id: "system-overview",
          title: "System Overview",
          description: "High-level dashboard summary for transformers, devices, and sensor health"
        },
        {
          id: "sensor-analytics",
          title: "Sensor Analytics",
          description: "Aggregated telemetry trends and averages"
        }
      ]
    }
  });
});

module.exports = router;
