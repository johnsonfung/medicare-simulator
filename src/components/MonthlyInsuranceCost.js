import React from "react";
import { Row, Col } from "reactstrap";
import * as tools from "../functions";
import { content } from "../content";

class MonthlyInsuranceCost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    let premiums = 0;
    let deductibleBudget = 0;
    if (this.props.state.selectedMedicareA === true) {
      premiums += content.medicareA.premium;
      deductibleBudget += content.medicareA.deductible;
    }
    if (this.props.state.selectedMedicareB === true) {
      premiums += content.medicareB.premium;
      deductibleBudget += content.medicareB.deductible;
    }
    if (
      this.props.state.selectedSecondary === "medicareC" &&
      this.props.state.selectedMedicareC === true
    ) {
      premiums += content.medicareC.premium;
      deductibleBudget = 0;
    }
    if (
      this.props.state.selectedSecondary === "medigap" &&
      this.props.state.selectedMedigap === true
    ) {
      premiums +=
        content.medigapPlanDetails[this.props.state.medigapPlan].premium;
      deductibleBudget -=
        content.medigapPlanDetails[this.props.state.medigapPlan]
          .partADeductible * content.medicareA.deductible;
      deductibleBudget -=
        content.medigapPlanDetails[this.props.state.medigapPlan]
          .partBDeductible * content.medicareB.deductible;
      deductibleBudget +=
        content.medigapPlanDetails[this.props.state.medigapPlan].deductible;
    }
    if (
      this.props.state.selectedSecondary === "medigap" &&
      this.props.state.selectedMedicareD === true
    ) {
      premiums += content.medicareD.premium;
      deductibleBudget += content.medicareD.deductible;
    }
    return (
      <div className="topRightHeader">
        <Row className="text-center">
          <Col>
            <div className="premiumBox">
              <div className="medicareReportSubtext">Annual premiums:</div>
              <div className="medicareReportMainItem success">
                {tools.formatMoney(premiums * 12)}
              </div>
            </div>
          </Col>
          <Col>
            <div className="premiumBox">
              <div className="medicareReportSubtext">Annual deductibles:</div>
              <div className="medicareReportMainItem success">
                {tools.formatMoney(deductibleBudget)}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MonthlyInsuranceCost;
