import React from "react";
import { Row, Col, Button } from "reactstrap";

class SecondaryCareButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    let medicareCColor = "secondary";
    let medigapColor = "secondary";

    // set button colors for secondary care
    if (this.props.selectedSecondary !== null) {
      if (this.props.selectedSecondary === "medicareC") {
        medicareCColor = "success";
        medigapColor = "secondary";
      } else if (this.props.selectedSecondary === "medigap") {
        medicareCColor = "secondary";
        medigapColor = "success";
      }
    }
    if (this.props.selectedMedicareB === true) {
      return (
        <Row className="text-center mb-3">
          <Col>
            <Button
              size="lg"
              color={medicareCColor}
              onClick={this.props.handleToggleSecondary("medicareC")}
            >
              Medicare C (Advantange)
            </Button>{" "}
            <Button
              size="lg"
              color={medigapColor}
              onClick={this.props.handleToggleSecondary("medigap")}
            >
              MediGAP + Medicare D
            </Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <div className="warningTextMedicare mb-3">
          Secondary coverage require Medicare B
        </div>
      );
    }
  }
}

export default SecondaryCareButtons;
