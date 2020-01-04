import React from "react";
import MedicarePaySummary from "./MedicarePaySummary";

class MedicareALineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    // bring in the medical situation
    let sitDetails = this.props.situation;
    let medicareALineItemsArray = [];

    if (sitDetails.hospitalDays > 0) {
      medicareALineItemsArray.push({
        name: "First 60 hospital days (via $1364 deductible)"
      });
    }
    if (sitDetails.hospitalDays > 60) {
      medicareALineItemsArray.push({
        name: "Next 30 hospital days w/ $341/day co-pay"
      });
    }
    if (sitDetails.hospitalDays > 90) {
      medicareALineItemsArray.push({
        name: "Next 60 hospital days w/ $682/day co-pay"
      });
    }
    if (sitDetails.hospitalDays > 150) {
      medicareALineItemsArray.push({
        name: "0% of any additional hospital days"
      });
    }
    if (sitDetails.skilledNursingDays > 0) {
      medicareALineItemsArray.push({
        name: "100% of the first 20 skilled nursing days"
      });
    }
    if (sitDetails.skilledNursingDays > 20) {
      medicareALineItemsArray.push({
        name: "Next 80 skilled nursing days w/ $170.50/day co-pay"
      });
    }
    if (sitDetails.skilledNursingDays > 100) {
      medicareALineItemsArray.push({
        name: "0% of any additional nursing days"
      });
    }
    if (sitDetails.homeCareEquipmentCost > 0) {
      medicareALineItemsArray.push({
        name: "80% of home care equiptment"
      });
    }
    if (sitDetails.inpatientMentalCareCost > 0) {
      medicareALineItemsArray.push({
        name: "80% of inpatient mental care"
      });
    }

    if (this.props.active === true) {
      return (
        <div>
          <MedicarePaySummary
            id="medicareA"
            title="Medicare A"
            medicareC={this.props.medicareCActive}
            coPayLine={true}
            leftOver={this.props.calculationsOutput.totalMedicareACharges}
            lineItems={medicareALineItemsArray}
            amount={this.props.calculationsOutput.medicareACoverage}
            color="success"
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default MedicareALineItems;
