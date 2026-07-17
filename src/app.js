// Core framework and middleware imports
const express =
require("express");

const cors =
require("cors");

const helmet =
require("helmet");

const morgan =
require("morgan");

// Swagger/OpenAPI tooling for API documentation UI
const swaggerUi = require("swagger-ui-express");
const limiter = require("./middleware/rateLimiter");
const logger = require("./utils/logger");
const fs = require("fs");
const path = require("path");
// Application route modules
const mlRoutes =
require(
"./routes/mlRoutes"
);

require("dotenv")
.config();

const authRoutes =
require("./routes/authRoutes");

const deviceRoutes =
require("./routes/deviceRoutes");

const sensorController =
require("./controllers/sensorController");

const transformerRoutes =
require("./routes/transformerRoutes");

const sensorRoutes =
require("./routes/sensorRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const alertRoutes =
require("./routes/alertRoutes");

const reportsRoutes =
require("./routes/reportsRoutes");

const errorHandler =
require(
"./middleware/errorHandler"
);

// Create the Express application instance
const app =
express();

// Swagger spec configuration for API docs generation
const swaggerSpec = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "docs/openapi.json"), "utf8")
);

// Security and request middleware
app.use(cors()); // allow cross-origin requests
app.use(helmet()); // secure HTTP headers
app.use(
morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim())
  }
})
);

// Limit request rate and body size
app.use(limiter);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Simple request logger for all incoming traffic
app.use((req, res, next) => {
  logger.info("request", { method: req.method, url: req.originalUrl });
  next();
});

// Serve generated Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Redirect /api-doc to /api-docs for compatibility with older links
app.get("/api-doc", (req, res) => {
  res.redirect("/api-docs");
});

/*
Routes
*/

// Health and metadata endpoints for monitoring and quick checks
app.get(
"/",
(
req,
res
)=>{

res.json({

success:true,

service:
"ElectraCore Backend",

status:
"running",

version:
"1.0.0",

message:
"ElectraCore Backend running",

endpoints:{

health:
"/health",

api:
"/api",

auth:
"/api/auth",

dashboard:
"/api/dashboard",

ml:
"/api/ml/status"

}

});

}
);

app.get(
"/health",
(
req,
res
)=>{

res.json({

success:true,

service:
"ElectraCore Backend",

status:
"healthy",

uptime:
process.uptime(),

timestamp:
new Date().toISOString()

});

}
);

// Mount API route modules under their respective base URLs
app.use(
"/api/ml",
mlRoutes
);

app.use(
"/api/auth",
authRoutes
);

app.post(
"/api/v1/device/telemetry",
sensorController.ingest
);

app.use(
"/api/devices",
deviceRoutes
);

app.use(
"/api/transformers",
transformerRoutes
);

app.use(
"/api/sensors",
sensorRoutes
);

app.use(
"/api/dashboard",
dashboardRoutes
);

app.use(
"/api/alerts",
alertRoutes
);

app.use(
"/reports",
reportsRoutes
);

app.use(
"/api/reports",
reportsRoutes
);

// Central error handler for any unhandled errors in routes/middleware
app.use(
errorHandler
);

module.exports =
app;
