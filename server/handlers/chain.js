acceptanceChain = [
  "ClassCoordinator",
  "DepartmentInternshipCoordinator",
  "HOD",
  "CollegeInternshipCoordinator",
  "Principal",
];

//returns the faculty's designation to whom the application must be sent for approval after it is approved by previous faculty or sent by a student.
exports.getNextPerson = (currentPersonDesignation, currentPersonDepartment) => {
  if (currentPersonDesignation === acceptanceChain[0]) {
    return {
      department: currentPersonDepartment,
      designation:
        acceptanceChain[acceptanceChain.indexOf(currentPersonDesignation) + 1],
    };
  } else
    return {
      designation:
        acceptanceChain[acceptanceChain.indexOf(currentPersonDesignation) + 1],
    };
};
