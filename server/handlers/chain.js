acceptanceChain = [
  "ClassCoordinator",
  "DepartmentInternshipCoordinator",
  "HOD",
  "CollegeInternshipCoordinator",
  "Principal",
];
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
