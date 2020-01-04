import React from "react";
import MedicarePaySummary from "./MedicarePaySummary";
import { content } from "../content";

class MedigapLineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    // bring in the medical situation
    let sitDetails = this.props.situation;
    let medigapLineItemsArray = [];

    if (this.props.calculationsOutput.medicareACharges > 0) {
      medigapLineItemsArray.push({
        name:
          content.medigapPlanDetails[this.props.medigapPlan].partACoInsurance *
            100 +
          "% of Medicare A co-insurance and co-pays"
      });
    }
    if (this.props.calculationsOutput.medicareASNCharges > 0) {
      medigapLineItemsArray.push({
        name:
          content.medigapPlanDetails[this.props.medigapPlan]
            .skilledNursingCoInsurance *
            100 +
          "% of Medicare A skilled nursing co-insurance and co-pays"
      });
    }
    if (sitDetails.bloodTransfusionCost > 0) {
      medigapLineItemsArray.push({
        name:
          content.medigapPlanDetails[this.props.medigapPlan].bloodTransfusion *
            100 +
          "% of up to 3 blood transfusions"
      });
    }
    if (sitDetails.hospiceCareCost > 0) {
      medigapLineItemsArray.push({
        name:
          content.medigapPlanDetails[this.props.medigapPlan].partAHospice *
            100 +
          "% of hospice costs"
      });
    }
    if (this.props.calculationsOutput.medicareBCharges > 0) {
      medigapLineItemsArray.push({
        name:
          content.medigapPlanDetails[this.props.medigapPlan].partBCoInsurance *
            100 +
          "% of Medicare B co-insurance and co-pays"
      });
      if (sitDetails.excessHealthCareCost > 0) {
        medigapLineItemsArray.push({
          name:
            content.medigapPlanDetails[this.props.medigapPlan].partBExcess *
              100 +
            "% of Medicare B uncovered excess care"
        });
      }
    }

    if (this.props.active === true) {
      return (
        <div>
          <MedicarePaySummary
            id="medigap"
            title="MediGAP"
            lineItems={medigapLineItemsArray}
            amount={this.props.calculationsOutput.medigapCoverage}
            color="success"
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default MedigapLineItems;
