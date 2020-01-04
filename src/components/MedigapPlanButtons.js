import React from "react";
import { Row, Col, Button } from "reactstrap";

class MedigapPlanButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    let medigapAColor,
      medigapBColor,
      medigapCColor,
      medigapDColor,
      medigapFColor,
      medigapGColor,
      medigapKColor,
      medigapLColor,
      medigapMColor,
      medigapNColor;

    medigapAColor = medigapBColor = medigapCColor = medigapDColor = medigapFColor = medigapGColor = medigapKColor = medigapLColor = medigapMColor = medigapNColor =
      "secondary";

    // set the active medigap plan to green - success)
    let medigapColorString =
      "medigap" + this.props.medigapPlan.toString().toUpperCase() + "Color";
    eval(medigapColorString + " = 'success'");

    if (this.props.selectedSecondary === "medigap") {
      return (
        <Row className="text-center mb-3">
          <Col>
            <div className="medigapButtonsGroup">
              <div className="medigapHelpText">
                <h4>Choose a MediGAP Plan</h4>
                <p>
                  As of Jan 2020, <strong>"G"</strong> is the most comprehensive
                  plan (covers the most).
                </p>
              </div>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapAColor}
                onClick={this.props.handleToggleMedigap("a")}
              >
                A
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapBColor}
                onClick={this.props.handleToggleMedigap("b")}
              >
                B
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapCColor}
                onClick={this.props.handleToggleMedigap("c")}
              >
                C
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapDColor}
                onClick={this.props.handleToggleMedigap("d")}
              >
                D
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapFColor}
                onClick={this.props.handleToggleMedigap("f")}
              >
                F
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapGColor}
                onClick={this.props.handleToggleMedigap("g")}
              >
                G
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapKColor}
                onClick={this.props.handleToggleMedigap("k")}
              >
                K
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapLColor}
                onClick={this.props.handleToggleMedigap("l")}
              >
                L
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapMColor}
                onClick={this.props.handleToggleMedigap("m")}
              >
                M
              </Button>
              <Button
                className="medigapBtn"
                outline
                size="m"
                color={medigapNColor}
                onClick={this.props.handleToggleMedigap("n")}
              >
                N
              </Button>
            </div>
          </Col>
        </Row>
      );
    } else {
      return "";
    }
  }
}

export default MedigapPlanButtons;
