import React from "react";
import { Row, Col } from "reactstrap";
import * as tools from "../functions";

class OutOfPocketItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    // bring in the medical situation
    let colorOfNumber = "success";
    if (this.props.calculationsOutput.outOfPocket > 0) {
      colorOfNumber = "danger";
    }

    if (this.props.active === true) {
      return (
        <Row>
          <Col>
            <div className="medicareReportBlock outOfPocketBlock">
              <div className="medicareReportHeader">
                What you would pay out-of-pocket for this incident
              </div>
              <div className="medicareReportMainItem">
                <span className={colorOfNumber}>
                  {tools.formatMoney(this.props.calculationsOutput.outOfPocket)}
                </span>
              </div>
              <div className="disclaimerTextWhite">
                (after premiums and deductible)
              </div>
              {this.props.medicareCActive === true && (
                <div className="medicareReportSubtext">
                  Limited to $3,400 (+ drug costs) due to Medicare C
                  out-of-pocket maximum
                </div>
              )}
            </div>
          </Col>
        </Row>
      );
    } else {
      return "";
    }
  }
}

export default OutOfPocketItems;
