import React from "react";
import MedicarePaySummary from "./MedicarePaySummary";

class MedicareBLineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    // bring in the medical situation
    let sitDetails = this.props.situation;
    let medicareBLineItemsArray = [];

    if (sitDetails.regularHealthCareCost > 0) {
      medicareBLineItemsArray.push({
        name: "80% of medical care and diagnostics costs"
      });
    }
    if (sitDetails.excessHealthCareCost > 0) {
      medicareBLineItemsArray.push({ name: "0% of excess care" });
    }

    if (this.props.active === true) {
      return (
        <div>
          <MedicarePaySummary
            id="medicareB"
            title="Medicare B"
            medicareC={this.props.medicareCActive}
            coPayLine={true}
            leftOver={this.props.calculationsOutput.medicareBCharges}
            lineItems={medicareBLineItemsArray}
            amount={this.props.calculationsOutput.medicareBCoverage}
            color="success"
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default MedicareBLineItems;
