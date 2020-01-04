import React from "react";
import MedicarePaySummary from "./MedicarePaySummary";
import { content } from "../content";
import * as tools from "../functions";

class MedicareCLineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    // bring in the medical situation
    let sitDetails = this.props.situation;
    let medicareCLineItemsArray = [];

    if (sitDetails.hospitalDays > 0) {
      medicareCLineItemsArray.push({
        name: "First 5 hospital days w/ $200/day co-pay"
      });
    }
    if (sitDetails.hospitalDays > 5) {
      medicareCLineItemsArray.push({
        name: "100% covered for any additional hospital days"
      });
    }

    if (sitDetails.skilledNursingDays > 0) {
      medicareCLineItemsArray.push({
        name: "100% of the first 20 skilled nursing days"
      });
    }
    if (sitDetails.skilledNursingDays > 20) {
      medicareCLineItemsArray.push({
        name: "Next 80 skilled nursing days w/ $20/day co-pay"
      });
    }
    if (sitDetails.skilledNursingDays > 100) {
      medicareCLineItemsArray.push({
        name: "0% of any additional nursing days"
      });
    }
    if (sitDetails.homeCareEquipmentCost > 0) {
      medicareCLineItemsArray.push({
        name: "80% of home care equiptment"
      });
    }
    if (sitDetails.inpatientMentalCareCost > 0) {
      medicareCLineItemsArray.push({
        name: "80% of inpatient mental care"
      });
    }
    if (sitDetails.medicareC.doctorVisits > 0) {
      medicareCLineItemsArray.push({
        name: sitDetails.medicareC.doctorVisits + " doctor visit(s) @ $25/each"
      });
    }
    if (sitDetails.medicareC.emergencyRoom > 0) {
      medicareCLineItemsArray.push({
        name:
          sitDetails.medicareC.emergencyRoom +
          " emergency room visit(s) @ $90/each"
      });
    }
    if (sitDetails.medicareC.urgentCare > 0) {
      medicareCLineItemsArray.push({
        name:
          sitDetails.medicareC.urgentCare + " urgent care visit(s) @ $25/each"
      });
    }
    if (sitDetails.medicareC.xRay > 0) {
      medicareCLineItemsArray.push({
        name: sitDetails.medicareC.xRay + " xRay(s) @ $20/each"
      });
    }
    if (sitDetails.medicareC.advancedDiag > 0) {
      medicareCLineItemsArray.push({
        name:
          sitDetails.medicareC.advancedDiag + " MRI/CT/PET Scan(s) @ $240/each"
      });
    }
    if (sitDetails.medicareC.surgery > 0) {
      medicareCLineItemsArray.push({
        name: sitDetails.medicareC.surgery + " surgery(s) @ $175/each"
      });
    }
    if (sitDetails.drugsCost > 0) {
      medicareCLineItemsArray.push({
        name:
          "75% covered for the first " +
          tools.formatMoney(content.medicareD.initialCoverageLimit) +
          " in drug costs. (Note that this is a gross simplification because drugs are covered as a fixed co-pay based on different tiers)"
      });
    }
    if (sitDetails.drugsCost > content.medicareD.initialCoverageLimit) {
      medicareCLineItemsArray.push({
        name:
          "0% covered for the next " +
          tools.formatMoney(
            content.medicareD.donutHoleLimit -
              content.medicareD.initialCoverageLimit
          ) +
          " (a.k.a. The Donut Hole)"
      });
    }
    if (sitDetails.drugsCost > content.medicareD.donutHoleLimit) {
      medicareCLineItemsArray.push({
        name:
          "95% covered for all subsequent costs (a.k.a. catastrophic coverage)"
      });
    }

    if (this.props.active === true) {
      return (
        <div>
          <MedicarePaySummary
            id="medicareC"
            title="Medicare C"
            coPayLine={true}
            leftOver={this.props.calculationsOutput.medicareCCharges}
            drugCharges={this.props.calculationsOutput.medicareCDrugCharges}
            lineItems={medicareCLineItemsArray}
            amount={this.props.calculationsOutput.medicareCCoverage}
            color="success"
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default MedicareCLineItems;
