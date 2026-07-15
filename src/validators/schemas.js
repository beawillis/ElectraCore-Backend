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
  transformerId: z.string().min(1, "Transformer ID is required").optional(),
  id: z.string().min(1).optional(),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required").optional(),
  capacity: z.number().positive("Capacity must be a positive number").optional()
}).superRefine((data, ctx) => {
  const transformerId = data.transformerId || data.id;
  if (!transformerId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["transformerId"],
      message: "Transformer ID is required"
    });
  }

  if (!data.name || data.name.trim() === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["name"],
      message: "Name is required"
    });
  }

  if (!data.location && data.capacity === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["location"],
      message: "Location is required"
    });
  }
});

const deviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required").optional(),
  id: z.string().min(1).optional(),
  name: z.string().min(1, "Name is required"),
  transformer: z.string().min(1, "Transformer reference is required").optional(),
  transformerId: z.string().min(1).optional()
}).superRefine((data, ctx) => {
  const deviceIdentifier = data.deviceId || data.id;
  if (!deviceIdentifier) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["deviceId"],
      message: "Device ID is required"
    });
  }

  if (!data.name || data.name.trim() === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["name"],
      message: "Name is required"
    });
  }

  const transformerReference = data.transformer || data.transformerId;
  if (!transformerReference) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["transformer"],
      message: "Transformer reference is required"
    });
  }
});

module.exports = { registerSchema, loginSchema, transformerSchema, deviceSchema };
