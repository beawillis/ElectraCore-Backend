const { registerSchema, loginSchema, transformerSchema, deviceSchema } = require("./schemas");

const normalizeErrors = (error) =>
  error.issues.map((issue) => ({ field: issue.path[0], message: issue.message }));

const validateRegisterInput = (data = {}) => {
  try {
    registerSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    return { isValid: false, errors: normalizeErrors(error) };
  }
};

const validateLoginInput = (data = {}) => {
  try {
    loginSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    return { isValid: false, errors: normalizeErrors(error) };
  }
};

const validateTransformerInput = (data = {}) => {
  try {
    transformerSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    return { isValid: false, errors: normalizeErrors(error) };
  }
};

const validateDeviceInput = (data = {}) => {
  try {
    deviceSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    return { isValid: false, errors: normalizeErrors(error) };
  }
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateTransformerInput,
  validateDeviceInput
};
