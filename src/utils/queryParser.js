const parseQuery = (query = {}) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  const search = typeof query.search === "string" ? query.search.trim() : "";
  const sortBy = typeof query.sortBy === "string" ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { transformerId: { $regex: search, $options: "i" } },
      { deviceId: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  if (query.status) {
    filters.status = query.status;
  }

  if (query.role) {
    filters.role = query.role;
  }

  if (query.transformer) {
    filters.transformer = query.transformer;
  }

  if (query.device) {
    filters.device = query.device;
  }

  if (query.healthLevel) {
    filters.healthScore = { $lte: Number(query.healthLevel) };
  }

  if (query.startDate || query.endDate) {
    filters.createdAt = {};
    if (query.startDate) filters.createdAt.$gte = new Date(query.startDate);
    if (query.endDate) filters.createdAt.$lte = new Date(query.endDate);
  }

  return { page, limit, skip, filters, sort: { [sortBy]: sortOrder } };
};

module.exports = { parseQuery };
