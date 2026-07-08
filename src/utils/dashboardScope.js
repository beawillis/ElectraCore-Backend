const mongoose = require("mongoose");

const buildDashboardScopeQueries = ({ transformerId, deviceId } = {}) => {
  const transformerObjectId = transformerId && mongoose.Types.ObjectId.isValid(transformerId)
    ? new mongoose.Types.ObjectId(transformerId)
    : null;

  const deviceObjectId = deviceId && mongoose.Types.ObjectId.isValid(deviceId)
    ? new mongoose.Types.ObjectId(deviceId)
    : null;

  const transformerQuery = {};
  const deviceQuery = {};
  const sensorQuery = {};

  if (transformerObjectId) {
    transformerQuery._id = transformerObjectId;
    deviceQuery.transformer = transformerObjectId;
    sensorQuery.transformer = transformerObjectId;
  }

  if (deviceObjectId) {
    deviceQuery._id = deviceObjectId;
    sensorQuery.device = deviceObjectId;
  }

  return {
    transformerQuery,
    deviceQuery,
    sensorQuery
  };
};

module.exports = {
  buildDashboardScopeQueries
};
