const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email format is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
  email: z.string().email("Email format is invalid"),
  password: z.string().min(1, "Password is required")
});

const transformerSchema = z.object({
  transformerId: z.string().min(1, "Transformer ID is required"),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  capacity: z.number().positive("Capacity must be a positive number")
});

const deviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
  name: z.string().min(1, "Name is required"),
  transformer: z.string().min(1, "Transformer reference is required")
});

module.exports = { registerSchema, loginSchema, transformerSchema, deviceSchema };
