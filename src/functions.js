function calculateHospitalCosts(situation, that, constants, content) {
  let output = {
    noInsuranceCost: 0,
    medicareACosts: 0,
    medicareACharges: 0,
    medicareASNCharges: 0,
    totalMedicareACharges: 0,
    medicareACoverage: 0,
    medicareBCharges: 0,
    medicareBCoverage: 0,
    medigapCoverage: 0,
    medicareCCharges: 0,
    medicareCDrugCharges: 0,
    medicareCCoverage: 0,
    medicareDCosts: 0,
    medicareDCoverage: 0,
    outOfPocket: 0
  };

  // hospital
  output.medicareACosts +=
    situation.hospitalDays * constants.hospitalStayNoInsurance;
  output.medicareACosts +=
    situation.skilledNursingDays * constants.skilledNursingNoInsurance;
  output.medicareACosts += situation.homeCareEquipmentCost;
  output.medicareACosts += situation.inpatientMentalCareCost;

  //other care

  // START WITH ALL MEDICARE A COSTS
  output.noInsuranceCost += output.medicareACosts;
  // add extras
  output.noInsuranceCost += situation.hospiceCareCost;

  output.noInsuranceCost += situation.bloodTransfusionCost;

  // ADD MEDICARE B COSTS
  output.noInsuranceCost += situation.regularHealthCareCost;

  output.noInsuranceCost += situation.excessHealthCareCost;

  // ADD MEDICARE D COSTS
  output.noInsuranceCost += situation.drugsCost;

  // MEDICARE A
  // medicare hospital days:
  if (
    that.state.selectedMedicareA === true &&
    (that.state.selectedSecondary !== "medicareC" ||
      that.state.selectedMedicareC === false)
  ) {
    if (situation.hospitalDays > 0) {
      if (situation.hospitalDays < 60) {
        output.medicareACharges += constants.medicareAStage1Max;
      } else if (situation.hospitalDays < 91) {
        output.medicareACharges += constants.medicareAStage1Max;
        output.medicareACharges +=
          (situation.hospitalDays - 60) * constants.hospitalStaysStage2;
      } else if (situation.hospitalDays > 90) {
        output.medicareACharges += constants.medicareAStage1Max;
        output.medicareACharges += 30 * constants.hospitalStaysStage2;
        output.medicareACharges +=
          (situation.hospitalDays - 90) * constants.hospitalStaysStage3;
      }
    }

    if (
      situation.skilledNursingDays > 20 &&
      situation.skilledNursingDays < 101
    ) {
      output.medicareASNCharges +=
        (situation.skilledNursingDays - 20) * constants.skilledNursingStage2;
    } else if (situation.skilledNursingDays > 100) {
      output.medicareASNCharges += 80 * constants.skilledNursingStage2;
      output.medicareASNCharges +=
        (situation.skilledNursingDays - 100) *
        constants.skilledNursingNoInsurance;
    }

    output.medicareACharges += 0.2 * situation.homeCareEquipmentCost;
    output.medicareACharges += 0.2 * situation.inpatientMentalCareCost;

    output.medicareACoverage =
      output.medicareACosts -
      output.medicareACharges -
      output.medicareASNCharges;
    output.totalMedicareACharges =
      output.medicareACharges + output.medicareASNCharges;
  }

  // MEDICARE B

  if (
    that.state.selectedMedicareB === true &&
    (that.state.selectedSecondary !== "medicareC" ||
      that.state.selectedMedicareC === false)
  ) {
    output.medicareBCoverage +=
      situation.regularHealthCareCost * (1 - content.medicareB.coInsurance);
    output.medicareBCharges +=
      situation.regularHealthCareCost * content.medicareB.coInsurance +
      situation.excessHealthCareCost;
  }

  // Medigap

  if (
    that.state.selectedSecondary === "medigap" &&
    that.state.selectedMedigap === true
  ) {
    output.medigapCoverage +=
      content.medigapPlanDetails[that.state.medigapPlan].partACoInsurance *
      output.medicareACharges;
    output.medigapCoverage +=
      content.medigapPlanDetails[that.state.medigapPlan]
        .skilledNursingCoInsurance * output.medicareASNCharges;
    output.medigapCoverage +=
      content.medigapPlanDetails[that.state.medigapPlan].partAHospice *
      situation.hospiceCareCost;
    output.medigapCoverage +=
      content.medigapPlanDetails[that.state.medigapPlan].bloodTransfusion *
      situation.bloodTransfusionCost;
    output.medigapCoverage +=
      content.medigapPlanDetails[that.state.medigapPlan].partBCoInsurance *
      situation.regularHealthCareCost *
      content.medicareB.coInsurance;
    output.medigapCoverage +=
      content.medigapPlanDetails[that.state.medigapPlan].partBExcess *
      situation.excessHealthCareCost;
  }

  output.foundationalCoverage =
    output.medicareACoverage + output.medicareBCoverage;

  // Medicare C Coverage

  if (
    that.state.selectedSecondary === "medicareC" &&
    that.state.selectedMedicareC === true
  ) {
    if (situation.hospitalDays > 0) {
      if (situation.hospitalDays < 6) {
        output.medicareCCharges += situation.hospitalDays * 200;
      } else if (situation.hospitalDays > 5) {
        output.medicareCCharges += 200 * 5;
      }
    }

    if (
      situation.skilledNursingDays > 20 &&
      situation.skilledNursingDays < 101
    ) {
      output.medicareCharges += (situation.skilledNursingDays - 20) * 20;
    } else if (situation.skilledNursingDays > 100) {
      output.medicareCCharges += 80 * 20;
      output.medicareCCharges +=
        (situation.skilledNursingDays - 100) *
        constants.skilledNursingNoInsurance;
    }

    output.medicareCCharges += 0.2 * situation.homeCareEquipmentCost;
    output.medicareCCharges += 0.2 * situation.inpatientMentalCareCost;

    output.medicareCCharges += situation.medicareC.doctorVisits * 25;
    output.medicareCCharges += situation.medicareC.emergencyRoom * 90;
    output.medicareCCharges += situation.medicareC.urgentCare * 25;
    output.medicareCCharges += situation.medicareC.xRay * 20;
    output.medicareCCharges += situation.medicareC.advancedDiag * 240;
    output.medicareCCharges += situation.medicareC.surgery * 175;

    if (situation.drugsCost < content.medicareD.initialCoverageLimit) {
      output.medicareCDrugCharges += 0.25 * situation.drugsCost;
    } else if (
      situation.drugsCost >= content.medicareD.initialCoverageLimit &&
      situation.drugsCost < content.medicareD.donutHoleLimit
    ) {
      output.medicareCDrugCharges +=
        0.25 * content.medicareD.initialCoverageLimit;
      output.medicareCDrugCharges +=
        situation.drugsCost - content.medicareD.initialCoverageLimit;
    } else if (situation.drugsCost >= content.medicareD.donutHoleLimit) {
      output.medicareCDrugCharges +=
        0.25 * content.medicareD.initialCoverageLimit;
      output.medicareCDrugCharges +=
        content.medicareD.donutHoleLimit -
        content.medicareD.initialCoverageLimit;
      output.medicareCDrugCharges +=
        0.05 * (situation.drugsCost - content.medicareD.donutHoleLimit);
    }
    output.medicareCCoverage =
      output.noInsuranceCost -
      output.medicareCCharges -
      output.medicareCDrugCharges;
  }

  output.foundationalCoverage =
    output.medicareACoverage + output.medicareBCoverage;

  // MEDICARE D
  output.medicareDCosts = situation.drugsCost;

  if (
    that.state.selectedSecondary === "medigap" &&
    that.state.selectedMedicareD === true
  ) {
    if (output.medicareDCosts < content.medicareD.initialCoverageLimit) {
      output.medicareDCoverage += 0.75 * output.medicareDCosts;
    } else if (
      output.medicareDCosts >= content.medicareD.initialCoverageLimit &&
      output.medicareDCosts < content.medicareD.donutHoleLimit
    ) {
      output.medicareDCoverage += 0.75 * content.medicareD.initialCoverageLimit;
    } else if (output.medicareDCosts >= content.medicareD.donutHoleLimit) {
      output.medicareDCoverage += 0.75 * content.medicareD.initialCoverageLimit;
      output.medicareDCoverage +=
        0.95 * (output.medicareDCosts - content.medicareD.donutHoleLimit);
    }
  }

  if (
    that.state.selectedSecondary === "medicareC" &&
    that.state.selectedMedicareC === true
  ) {
    if (output.medicareCCharges > 3400) {
      output.outOfPocket = 3400 + output.medicareCDrugCharges;
    } else {
      output.outOfPocket =
        output.medicareCCharges + output.medicareCDrugCharges;
    }
  } else {
    output.outOfPocket =
      output.noInsuranceCost -
      output.medicareACoverage -
      output.medicareBCoverage -
      output.medigapCoverage -
      output.medicareDCoverage;
  }

  return output;
}

function formatMoney(x) {
  if (x === null || typeof x === "undefined") {
    x = 0;
  }
  x = x.toString().replace(/[.](?=.*?\.)/g, "");
  x = x.replace(/[^0-9.]/g, "");
  x = parseFloat(x).toFixed(0);
  if (x < 0) {
    x = x * -1;
    return "-$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (x > 0) {
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "$0";
  }
}

export { calculateHospitalCosts };
export { formatMoney };
