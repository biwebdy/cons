export function calculateEmployerContributionPercent(age) {
  let LPP = 0;
  if (age >= 25 && age <= 34) {
    LPP = 0.045;
  } else if (age >= 35 && age <= 44) {
    LPP = 0.06;
  } else if (age >= 45 && age <= 54) {
    LPP = 0.085;
  } else if (age >= 55) {
    LPP = 0.10;
  }
  const employerContribution = {
    LPP: {
      percent: LPP,
      percentageDisplay: parseFloat(LPP * 100).toFixed(4) + "%",
    },

    IJM: {
      percent: 0.00563,
      percentageDisplay: "0.563%",
    },
    LAAC2: {
      percent: 0.006565,
      percentageDisplay: "0.6565%",
    },
    LAAC1: {
      percent: 0.000235,
      percentageDisplay: "0.0235%",
    },
    LAANP: {
      percent: 0,
      percentageDisplay: "0%",
    },

    LPCFemme: {
      percent: 0.0006,
      percentageDisplay: "0.06%",
    },
    AC: {
      percent: 0.011,
      percentageDisplay: "1.1%",
    },
    AVS: {
      percent: 0.053,
      percentageDisplay: "5.3%",
    },
    AVSAdmin: {
      percent: 0.0016,
      percentageDisplay: "0.16%",
    },
    LAAP: {
      percent: 0.00077,
      percentageDisplay: "0.077%",
    },
    CAF: {
      percent: 0.0248,
      percentageDisplay: "2.48%",
    },
    FPV: {
      percent: 0.00024,
      percentageDisplay: "0.024%",
    },
  };
  const totalPercent =
    employerContribution.LPP.percent +
    employerContribution.IJM.percent +
    employerContribution.LAAC2.percent +
    employerContribution.LAAC1.percent +
    employerContribution.LPCFemme.percent +
    employerContribution.AC.percent +
    employerContribution.AVS.percent +
    employerContribution.AVSAdmin.percent +
    employerContribution.CAF.percent +
    employerContribution.FPV.percent +
    employerContribution?.LAAP?.percent;
  return {
    totalPercent: parseFloat(totalPercent.toFixed(5)),
    employerContribution: employerContribution,
  };
}

export function calculateTotalGrossHourlyRate(rate, totalPercent) {
  return parseFloat(rate / (1 + totalPercent)).toFixed(2);
}

export function calculateGrossHourlyRate(totalGrossHourlyRate) {
  return parseFloat(totalGrossHourlyRate / 1.106).toFixed(2);
}

export function calculateEmployeeContributionPercent(age) {
  let LPP = 0;
  if (age >= 25 && age <= 34) {
    LPP = 0.035;
  } else if (age >= 35 && age <= 44) {
    LPP = 0.05;
  } else if (age >= 45 && age <= 54) {
    LPP = 0.075;
  } else if (age >= 55) {
    LPP = 0.09;
  }
  const employeeContribution = {
    LPP: {
      percent: LPP,
      percentageDisplay: parseFloat(LPP * 100).toFixed(4) + "%",
    },

    IJM: {
      percent: 0.00563,
      percentageDisplay: "0.563%",
    },
    LAAC2: {
      percent: 0.006565,
      percentageDisplay: "0.6565%",
    },
    LAAC1: {
      percent: 0.000235,
      percentageDisplay: "0.0235%",
    },
    LAANP: {
      percent: 0.01209,
      percentageDisplay: "1.209%",
    },

    LPCFemme: {
      percent: 0.0006,
      percentageDisplay: "0.06%",
    },
    AC: {
      percent: 0.011,
      percentageDisplay: "1.1%",
    },
    AVS: {
      percent: 0.053,
      percentageDisplay: "5.3%",
    },
    AVSAdmin: {
      percent: 0,
      percentageDisplay: "0%",
    },
    LAAP: {
      percent: 0,
      percentageDisplay: "0%",
    },
    CAF: {
      percent: 0,
      percentageDisplay: "0%",
    },
    FPV: {
      percent: 0,
      percentageDisplay: "0%",
    },
  };
  const totalPercent =
    employeeContribution.LPP.percent +
    employeeContribution.IJM.percent +
    employeeContribution.LAANP.percent +
    employeeContribution.LAAC2.percent +
    employeeContribution.LAAC1.percent +
    employeeContribution.LPCFemme.percent +
    employeeContribution.AC.percent +
    employeeContribution.AVS.percent +
    employeeContribution.AVSAdmin.percent +
    employeeContribution.CAF.percent +
    employeeContribution.FPV.percent +
    employeeContribution?.LAAP?.percent;
  return {
    totalPercent: totalPercent.toFixed(5),
    employeeContribution: employeeContribution,
  };
}
