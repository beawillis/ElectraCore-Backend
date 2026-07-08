const express =
require("express");

const cors =
require("cors");

const helmet =
require("helmet");

const morgan =
require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const limiter = require("./middleware/rateLimiter");
const logger = require("./utils/logger");
const fs = require("fs");

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

const transformerRoutes =
require("./routes/transformerRoutes");

const sensorRoutes =
require("./routes/sensorRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const alertRoutes =
require("./routes/alertRoutes");

const errorHandler =
require(
"./middleware/errorHandler"
);

const app =
express();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ElectraCore Backend API",
      version: "1.0.0",
      description: "API for transformer monitoring, device registration, and alerts"
    }
  },
  apis: ["./src/routes/*.js", "./src/app.js"]
});

app.use(cors());

app.use(helmet());

app.use(
morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim())
  }
})
);

app.use(limiter);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use((req, res, next) => {
  logger.info("request", { method: req.method, url: req.originalUrl });
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
Routes
*/

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

app.use(
"/api/ml",
mlRoutes
);

app.use(
"/api/auth",
authRoutes
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
errorHandler
);

module.exports =
app;
