const cache =
new Map(); // Simple in-memory cache using a Map to store key-value pairs for dashboard data

// Get cached data for a given key, returning undefined if not found
exports.get =
(key)=>
cache.get(
key
);

// Set cached data for a given key and value, allowing quick retrieval of frequently accessed dashboard data without needing to query the database repeatedly
exports.set =
(
key,
value
)=>
cache.set(
key,
value
);