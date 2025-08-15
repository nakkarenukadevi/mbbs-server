const { getPaginatedStudents } = require("../utils/studentUtils");

// Example usage for an API endpoint (Express style)
function getFilteredStudents(req, res) {
  // Extract payload, pageNumber, and pageSize from request (adjust as per your frontend)
  const payload = req.body || {};
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  // Get paginated students
  const result = getPaginatedStudents(payload, pageNumber, pageSize);

  // Send paginated data to frontend
  res.json(result);
}

module.exports = { getFilteredStudents };
