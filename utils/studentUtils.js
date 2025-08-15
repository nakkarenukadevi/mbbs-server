const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const students = require("../students.json");

function formatStudentData(data) {
  return data.map((student) => {
    return {
      s_no: student["S.No."],
      registrationID: student["Registration ID"],
      rollNo: student["NEET\r\nRoll No"],
      rank: student["NEET\r\nRank"],
      score: student["NEET\r\nScore"],
      name: student["Name of the Candidate"],
      gender: student["Gender"],
      category: student["Category"],
      area: student["Area"],
      muslimMinority: student["Muslim\r\nMinority"],
      angloIndian: student["Anglo\r\nIndian"],
      ews: student["EWS"],
      pmc: student["PMC"],
    };
  });
}

function filterStudents(payload) {
  return students.filter((student) => {
    return Object.entries(payload).every(([key, value]) => {
      if (key === "score") {
        // If payload has score, student.score should be >= value (support array or single value)
        if (Array.isArray(value)) {
          return value.some((v) => Number(student.score) >= Number(v));
        }
        return Number(student.score) >= Number(value);
      } else {
        // For all other keys, support array or single value (case-insensitive for strings)
        if (Array.isArray(value)) {
          return value.some((v) => {
            if (typeof student[key] === "string" && typeof v === "string") {
              return student[key].toLowerCase() === v.toLowerCase();
            }
            return student[key] === v;
          });
        } else {
          if (typeof student[key] === "string" && typeof value === "string") {
            return student[key].toLowerCase() === value.toLowerCase();
          }
          return student[key] === value;
        }
      }
    });
  });
}

function getPaginatedStudents(payload, pageNumber = 1, pageSize = 10) {
  const filteredStudents = filterStudents(payload);
  const total = filteredStudents.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  const data = filteredStudents.slice(start, end);

  return {
    data,
    total,
    pageNumber,
    pageSize,
    totalPages,
  };
}

// New function: Reads students.xlsx and writes formatted data to students.json
function writeStudentsToJson() {
  const excelPath = path.join(__dirname, "..", "students.xlsx");
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const students = formatStudentData(
    XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  );
  const jsonPath = path.join(__dirname, "..", "students.json");
  fs.writeFileSync(jsonPath, JSON.stringify(students, null, 2), "utf-8");
  return jsonPath;
}

module.exports = {
  formatStudentData,
  filterStudents,
  getPaginatedStudents,
  writeStudentsToJson,
};
