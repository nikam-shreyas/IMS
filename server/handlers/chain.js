acceptanceChain = [
  "ClassCoordinator",
  "DepartmentInternshipCoordinator",
  "CollegeInternshipCoordinator",
  "Principal",
];
exports.getNextPerson = (currentPersonDesignation, currentPersonDepartment) => {
  if (currentPersonDesignation === acceptanceChain[0]) {
    return {
      department: currentPersonDepartment,
      designation: acceptanceChain[1],
    };
  } else
    return {
      designation:
        acceptanceChain[acceptanceChain.indexOf(currentPersonDesignation) + 1],
    };
};
