import React from "react";
import MedicarePaySummary from "./MedicarePaySummary";
import { content } from "../content";
import * as tools from "../functions";

class MedicareDLineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    // bring in the medical situation
    let sitDetails = this.props.situation;
    let medicareDLineItemsArray = [];

    if (this.props.calculationsOutput.medicareDCosts > 0) {
      medicareDLineItemsArray.push({
        name:
          "75% covered for the first " +
          tools.formatMoney(content.medicareD.initialCoverageLimit) +
          " in drug costs. (Note that this is a gross simplification because drugs are covered as a fixed co-pay based on different tiers)."
      });
    }
    if (
      this.props.calculationsOutput.medicareDCosts >
      content.medicareD.initialCoverageLimit
    ) {
      medicareDLineItemsArray.push({
        name:
          "0% covered for the next " +
          tools.formatMoney(
            content.medicareD.donutHoleLimit -
              content.medicareD.initialCoverageLimit
          ) +
          " (a.k.a. The Donut Hole)"
      });
    }
    if (
      this.props.calculationsOutput.medicareDCosts >
      content.medicareD.donutHoleLimit
    ) {
      medicareDLineItemsArray.push({
        name:
          "95% covered for all subsequent costs (a.k.a. catastrophic coverage)"
      });
    }

    if (this.props.active === true) {
      return (
        <div>
          <MedicarePaySummary
            id="medicareD"
            title="Medicare D (Drugs)"
            lineItems={medicareDLineItemsArray}
            coPayLine={true}
            leftOver={
              sitDetails.drugsCost -
              this.props.calculationsOutput.medicareDCoverage
            }
            amount={this.props.calculationsOutput.medicareDCoverage}
            color="success"
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default MedicareDLineItems;
