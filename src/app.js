const express =
require("express");

const cors =
require("cors");

const helmet =
require("helmet");

const morgan =
require("morgan");

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

app.use(cors());

app.use(helmet());

app.use(
morgan("dev")
);

app.use(
express.json()
);

/*
Routes
*/

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
