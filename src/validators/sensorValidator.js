const numericFields = [
  "oilTemperature",
  "transformerTemperature",
  "ambientTemperature",
  "voltage",
  "current",
  "humidity"
];

const ranges = {
  oilTemperature: { min: -20, max: 180 },
  ambientTemperature: { min: -40, max: 80 },
  voltage: { min: 0, max: 500 },
  current: { min: 0, max: 1000 },
  humidity: { min: 0, max: 100 }
};

// The float switch is digital, so normalize common ESP32 payload shapes into
// the two states used everywhere else in the backend.
const normalizeOilLevel = (value) => {
  if (value === undefined || value === null) return value;
  if (value === true || value === 1 || value === "1") return "high";
  if (value === false || value === 0 || value === "0") return "low";

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (["high", "full", "ok", "normal"].includes(normalized)) {
      return "high";
    }

    if (["low", "empty", "fault"].includes(normalized)) {
      return "low";
    }
  }

  return value;
};

exports.validateAndNormalize = (payload) => {
  const data = { ...payload };
  const errors = [];

  // Accept the older firmware field name while storing the clearer domain name.
  if (data.oilTemperature === undefined && data.temperature !== undefined) {
    data.oilTemperature = data.temperature;
  }

  if (data.oilTemperature === undefined && data.transformerTemperature !== undefined) {
    data.oilTemperature = data.transformerTemperature;
  }

  if (data.device === undefined && data.deviceId !== undefined) {
    data.device = data.deviceId;
  }

  if (data.transformer === undefined && data.transformerId !== undefined) {
    data.transformer = data.transformerId;
  }

  if (!data.transformer) errors.push("transformer is required");
  if (!data.device) errors.push("device is required");

  for (const field of numericFields) {
    if (data[field] === undefined || data[field] === null) continue;

    const value = Number(data[field]);
    const range = ranges[field];

    if (!Number.isFinite(value)) {
      errors.push(`${field} must be a valid number`);
      continue;
    }

    if (value < range.min || value > range.max) {
      errors.push(`${field} is outside the expected range`);
    }

    data[field] = value;
  }

  data.oilLevel = normalizeOilLevel(data.oilLevel);

  if (
    data.oilLevel !== undefined &&
    !["high", "low"].includes(data.oilLevel)
  ) {
    errors.push("oilLevel must be high/low, true/false, or 1/0");
  }

  if (errors.length) {
    const error = new Error(errors.join(", "));
    error.statusCode = 400;
    throw error;
  }

  delete data.temperature;
  delete data.transformerTemperature;
  delete data.deviceId;
  delete data.transformerId;
  return data;
};
