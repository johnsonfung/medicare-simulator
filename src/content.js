import React from "react";

import medicareAIcon from "./assets/images/medicareA.svg";
import medicareBIcon from "./assets/images/medicareB.svg";
import medicareCIcon from "./assets/images/medicareC.svg";
import medicareDIcon from "./assets/images/medicareD.svg";
import medigapIcon from "./assets/images/medigap.svg";
import heartAttackIcon from "./assets/images/heartAttack.svg";
import strokeIcon from "./assets/images/stroke.svg";
import cancerIcon from "./assets/images/cancer.svg";
import kidneyIcon from "./assets/images/kidney.svg";
import pneumoniaIcon from "./assets/images/pneumonia.svg";
import hipIcon from "./assets/images/hip.svg";
import diabetesIcon from "./assets/images/diabetes.svg";
import arteriesIcon from "./assets/images/arteries.svg";
import ventilatorIcon from "./assets/images/ventilator.svg";

let situationPresets = [
  {
    title: "Heart Attack",
    image: heartAttackIcon,
    situation: {
      title: "Heart Attack",
      active: true,
      hospitalDays: 5,
      skilledNursingDays: 16,
      homeCareEquipmentCost: 0,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 50000,
      excessHealthCareCost: 1000,
      drugsCost: 3000,
      medicareC: {
        doctorVisits: 6,
        emergencyRoom: 1,
        urgentCare: 1,
        xRay: 0,
        advancedDiag: 0,
        surgery: 0
      }
    }
  },
  {
    title: "Stroke",
    image: strokeIcon,
    situation: {
      title: "Stroke",
      active: true,
      hospitalDays: 7,
      skilledNursingDays: 32,
      homeCareEquipmentCost: 4000,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 20000,
      excessHealthCareCost: 500,
      drugsCost: 5300,
      medicareC: {
        doctorVisits: 5,
        emergencyRoom: 1,
        urgentCare: 1,
        xRay: 0,
        advancedDiag: 1,
        surgery: 0
      }
    }
  },
  {
    title: "Breast Cancer",
    image: cancerIcon,
    situation: {
      title: "Breast Cancer",
      active: true,
      hospitalDays: 7,
      skilledNursingDays: 3,
      homeCareEquipmentCost: 0,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 80000,
      excessHealthCareCost: 2000,
      drugsCost: 5000,
      medicareC: {
        doctorVisits: 10,
        emergencyRoom: 0,
        urgentCare: 0,
        xRay: 0,
        advancedDiag: 4,
        surgery: 1
      }
    }
  },
  {
    title: "Kidney Transplant",
    image: kidneyIcon,
    situation: {
      title: "Kidney Transplant",
      active: true,
      hospitalDays: 10,
      skilledNursingDays: 0,
      homeCareEquipmentCost: 0,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 300000,
      excessHealthCareCost: 5000,
      drugsCost: 2500,
      medicareC: {
        doctorVisits: 6,
        emergencyRoom: 0,
        urgentCare: 0,
        xRay: 0,
        advancedDiag: 1,
        surgery: 1
      }
    }
  },
  {
    title: "Pneumonia",
    image: pneumoniaIcon,
    situation: {
      title: "Pneumonia",
      active: true,
      hospitalDays: 3,
      skilledNursingDays: 8,
      homeCareEquipmentCost: 0,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 3000,
      excessHealthCareCost: 100,
      drugsCost: 100,
      medicareC: {
        doctorVisits: 2,
        emergencyRoom: 0,
        urgentCare: 0,
        xRay: 1,
        advancedDiag: 0,
        surgery: 0
      }
    }
  },
  {
    title: "Hip Replacement",
    image: hipIcon,
    situation: {
      title: "Hip Replacement",
      active: true,
      hospitalDays: 3,
      skilledNursingDays: 0,
      homeCareEquipmentCost: 1000,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 25000,
      excessHealthCareCost: 500,
      drugsCost: 50,
      medicareC: {
        doctorVisits: 2,
        emergencyRoom: 0,
        urgentCare: 0,
        xRay: 1,
        advancedDiag: 0,
        surgery: 1
      }
    }
  },
  {
    title: "Diabetes",
    image: diabetesIcon,
    situation: {
      title: "Diabetes",
      active: true,
      hospitalDays: 1,
      skilledNursingDays: 1,
      homeCareEquipmentCost: 0,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 5000,
      excessHealthCareCost: 150,
      drugsCost: 4000,
      medicareC: {
        doctorVisits: 8,
        emergencyRoom: 0,
        urgentCare: 1,
        xRay: 0,
        advancedDiag: 0,
        surgery: 0
      }
    }
  },
  {
    title: "Coronary Artery Disease",
    image: arteriesIcon,
    situation: {
      title: "Coronary Artery Disease",
      active: true,
      hospitalDays: 3,
      skilledNursingDays: 15,
      homeCareEquipmentCost: 0,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 2000,
      regularHealthCareCost: 52000,
      excessHealthCareCost: 1250,
      drugsCost: 4000,
      medicareC: {
        doctorVisits: 10,
        emergencyRoom: 1,
        urgentCare: 1,
        xRay: 0,
        advancedDiag: 2,
        surgery: 1
      }
    }
  },
  {
    title: "Respiratory Failure",
    image: ventilatorIcon,
    situation: {
      title: "Respiratory Failure",
      active: true,
      hospitalDays: 30,
      skilledNursingDays: 0,
      homeCareEquipmentCost: 0,
      inpatientMentalCareCost: 0,
      // hospice care is not applicable
      hospiceCareCost: 0,
      //
      bloodTransfusionCost: 0,
      regularHealthCareCost: 190000,
      excessHealthCareCost: 5000,
      drugsCost: 10000,
      medicareC: {
        doctorVisits: 5,
        emergencyRoom: 1,
        urgentCare: 2,
        xRay: 0,
        advancedDiag: 3,
        surgery: 1
      }
    }
  }
];

let content = {
  medicareA: {
    name: "Medicare A",
    subtitle: "Covers part of hospital visits",
    image: medicareAIcon,
    premium: 0,
    deductible: 1408,
    coInsurance: 0,
    coPays:
      "Depends on length of hospital and specialized nursing facility stay",
    oopLimit: null,
    details: (
      <a
        target="_blank"
        href="https://www.medicare.gov/your-medicare-costs/medicare-costs-at-a-glance"
        rel="noopener noreferrer"
      >
        Details
      </a>
    )
  },
  medicareB: {
    name: "Medicare B",
    subtitle: "Covers part of medical care",
    image: medicareBIcon,
    premium: 144.6,
    deductible: 198,
    coInsurance: 0.2,
    coPays: "20% of the costs",
    oopLimit: null,
    details: (
      <a
        target="_blank"
        href="https://www.medicare.gov/your-medicare-costs/medicare-costs-at-a-glance"
        rel="noopener noreferrer"
      >
        Details
      </a>
    )
  },
  medicareC: {
    name: "Medicare C (Advantage)",
    subtitle: "(e.g. HMOs such as Kaiser, Blue Cross, Aetna, United, Anthem)",
    image: medicareCIcon,
    premium: 91,
    deductible: 0,
    coInsurance: 0,
    coPays: "$25-$200 depending on procedure.",
    oopLimit: 3400,
    details: (
      <a
        target="_blank"
        href="https://www.medicare.gov/sign-up-change-plans/types-of-medicare-health-plans/medicare-advantage-plans"
        rel="noopener noreferrer"
      >
        Details
      </a>
    )
  },
  medicareD: {
    name: "Medicare D",
    subtitle: "Covers part of drugs and injections",
    image: medicareDIcon,
    premium: 70,
    deductible: 150,
    coInsurance: 0,
    coPays: "$5-$25 depending on the drug",
    oopLimit: null,
    details: (
      <a
        target="_blank"
        href="https://www.medicare.gov/drug-coverage-part-d/costs-for-medicare-drug-coverage/costs-in-the-coverage-gap"
        rel="noopener noreferrer"
      >
        Details
      </a>
    ),
    initialCoverageLimit: 4020,
    donutHoleLimit: 6350
  },
  medigapPlanDetails: {
    a: {
      name: "MediGAP A",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 222,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 0,
      partADeductible: 0,
      partBDeductible: 0,
      partBExcess: 0,
      foreignTravel: 0
    },
    b: {
      name: "MediGAP B",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 317,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 0,
      partADeductible: 1,
      partBDeductible: 0,
      partBExcess: 0,
      foreignTravel: 0
    },
    c: {
      name: "MediGAP C",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 354,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 1,
      partADeductible: 1,
      partBDeductible: 1,
      partBExcess: 0,
      foreignTravel: 0.8
    },
    d: {
      name: "MediGAP D",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 352,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 1,
      partADeductible: 1,
      partBDeductible: 0,
      partBExcess: 0,
      foreignTravel: 0.8
    },
    f: {
      name: "MediGAP F",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 313,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 1,
      partADeductible: 1,
      partBDeductible: 1,
      partBExcess: 1,
      foreignTravel: 0.8
    },
    g: {
      name: "MediGAP G",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 348,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 1,
      partADeductible: 1,
      partBDeductible: 0,
      partBExcess: 1,
      foreignTravel: 0.8
    },
    k: {
      name: "MediGAP K",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 135,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 0.5,
      bloodTransfusion: 0.5,
      partAHospice: 0.5,
      skilledNursingCoInsurance: 0.5,
      partADeductible: 0.5,
      partBDeductible: 0,
      partBExcess: 0,
      foreignTravel: 0
    },
    l: {
      name: "MediGAP L",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 200,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 0.75,
      bloodTransfusion: 0.75,
      partAHospice: 0.75,
      skilledNursingCoInsurance: 0.75,
      partADeductible: 0.75,
      partBDeductible: 0,
      partBExcess: 0,
      foreignTravel: 0
    },
    m: {
      name: "MediGAP M",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 227,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 1,
      partADeductible: 1,
      partBDeductible: 0,
      partBExcess: 0,
      foreignTravel: 0.8
    },
    n: {
      name: "MediGAP N",
      subtitle: "Covers Medicare A & B leftovers",
      image: medigapIcon,
      premium: 207,
      deductible: 0,
      coInsurance: 0,
      coPays: "None",
      oopLimit: null,
      details: "",
      partACoInsurance: 1,
      partBCoInsurance: 1,
      bloodTransfusion: 1,
      partAHospice: 1,
      skilledNursingCoInsurance: 1,
      partADeductible: 1,
      partBDeductible: 0,
      partBExcess: 0,
      foreignTravel: 0.8
    }
  }
};

let constants = {
  hospitalStayNoInsurance: 3949,
  medicareAStage1Max: 0,
  hospitalStaysStage2: 341,
  hospitalStaysStage3: 682,
  skilledNursingNoInsurance: 245,
  skilledNursingStage1: 0,
  skilledNursingStage2: 170.5
};

let initState = {
  selectedMedicareA: true,
  selectedMedicareB: false,
  selectedMedicareC: true,
  selectedMedigap: true,
  selectedMedicareD: true,
  selectedSecondary: null,
  medigapPlan: "g",
  modal: true,
  simulationWindow: "setup",
  simulationTab: "presets",
  situation: {
    title: "Custom",
    active: false,
    hospitalDays: 0,
    skilledNursingDays: 0,
    homeCareEquipmentCost: 0,
    inpatientMentalCareCost: 0,
    // hospice care is not applicable
    hospiceCareCost: 0,
    //
    bloodTransfusionCost: 0,
    regularHealthCareCost: 0,
    excessHealthCareCost: 0,
    drugsCost: 0,
    medicareC: {
      doctorVisits: 0,
      emergencyRoom: 0,
      urgentCare: 0,
      xRay: 0,
      advancedDiag: 0,
      surgery: 0
    }
  }
};

export { constants, content, situationPresets, initState };
