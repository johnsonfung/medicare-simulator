import React from "react";
import * as tools from "../functions";
import { Row, Col, Card, CardBody, Progress } from "reactstrap";
import crossIcon from "../assets/images/cross.svg";
import checkIcon from "../assets/images/check.svg";

class PlanOptionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.field !== "") {
      let stateField = "selected" + this.props.field;
      this.props.parent.setState(prevState => ({
        [stateField]: !prevState[stateField]
      }));
    }
  }

  componentDidUpdate() {}

  render() {
    let selectedClass = "planOptionCard h-100";
    let checkOrCross = crossIcon;
    if (this.props.selected === true) {
      selectedClass = "planOptionCardSelected h-100";
      checkOrCross = checkIcon;
    }

    let premium;
    let deductible;
    let coInsurance;
    let oopLimit;
    if (this.props.premium !== 0) {
      premium = tools.formatMoney(this.props.premium) + "/month";
    } else {
      premium = <span className="good">Free</span>;
    }

    if (this.props.medigapTrue === true) {
      premium = (
        <div>
          <div>{tools.formatMoney(this.props.premium)}/month</div>
          <div className="disclaimerText">
            Note that premiums vary widely depending on provider and your
            profile (e.g. smoker/age)
          </div>
        </div>
      );
    }

    if (this.props.deductible !== 0) {
      deductible = tools.formatMoney(this.props.deductible) + "/year";
    } else {
      deductible = <span className="good">None</span>;
    }

    if (this.props.oopLimit !== null) {
      oopLimit = (
        <span className="good">
          {tools.formatMoney(this.props.oopLimit)}/year
        </span>
      );
    } else {
      oopLimit = <span className="bad">Unlimited</span>;
    }

    if (this.props.coInsurance !== 0) {
      coInsurance = this.props.coInsurance;
    } else {
      coInsurance = <span className="good">None</span>;
    }

    let medicarePlanDetails;

    if (this.props.medigapTrue === true) {
      medicarePlanDetails = (
        <div>
          <Row className="mb-2">
            <Col>
              <div className="planOptionCardText">
                <strong>Premium: </strong>
                {premium}
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h4>Coverage (%)</h4>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm={12} m={12} xl={6}>
              <div className="planOptionCardText">
                <strong>
                  Medicare A<br />
                  Co-Insurance:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.partACoInsurance * 100}
                  className="mb-2"
                />
              </div>
              <div className="planOptionCardText">
                <strong>
                  Medicare B<br />
                  Co-Insurance and Co-Pay:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.partBCoInsurance * 100}
                  className="mb-2"
                />
              </div>
              <div className="planOptionCardText">
                <strong>
                  Blood transfusions <br />
                  (first 3 pints):{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.bloodTransfusion * 100}
                  className="mb-2"
                />
              </div>
              <div className="planOptionCardText">
                <strong>
                  Medicare A <br />
                  Hospice:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.partAHospice * 100}
                  className="mb-2"
                />
              </div>
            </Col>
            <Col sm={12} m={12} xl={6}>
              <div className="planOptionCardText">
                <strong>
                  Medicare A <br />
                  Skilled Nursing Co-Insurance:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.skilledNursingCoInsurance * 100}
                  className="mb-2"
                />
              </div>
              <div className="planOptionCardText">
                <strong>
                  Medicare A <br />
                  Deductible:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.partADeductible * 100}
                  className="mb-2"
                />
              </div>
              <div className="planOptionCardText">
                <strong>
                  Medicare B <br />
                  Deductible:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.partBDeductible * 100}
                  className="mb-2"
                />
              </div>
              <div className="planOptionCardText">
                <strong>
                  Medicare B <br />
                  Excess:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.partBExcess * 100}
                  className="mb-2"
                />
              </div>
              <div className="planOptionCardText">
                <strong>
                  Foreign travel <br />
                  emergency:{" "}
                </strong>
                <Progress
                  color="success"
                  value={this.props.foreignTravel * 100}
                  className="mb-2"
                />
              </div>
            </Col>
          </Row>
        </div>
      );
    } else {
      medicarePlanDetails = (
        <div>
          <Row className="mb-2">
            <Col sm={12} m={12} xl={6}>
              <div className="planOptionCardText">
                <strong>Premium: </strong>
                {premium}
              </div>
              <div className="planOptionCardText">
                <strong>Deductible: </strong>
                {deductible}
              </div>
            </Col>
            <Col sm={12} m={12} xl={6}>
              <div className="planOptionCardText">
                <strong>Co-Insurance and Co-Pays: </strong>
                {this.props.coPays}
              </div>
            </Col>
          </Row>
          {/*<Row>
						<Col><div className="planOptionCardText">
								<strong>Out-of-Pocket Limit: </strong>
								{oopLimit}
							</div>
							
							<div className="planOptionCardText">
								<strong>Details: </strong>
								<div>{this.props.details}</div>
							</div>
						</Col>
					</Row>*/}
        </div>
      );
    }

    return (
      <div className="planOptionCardWrapper">
        <Card className={selectedClass} onClick={this.handleClick}>
          <CardBody className="text-center">
            <Row className="mb-2">
              <Col>
                <img className="planOptionCardCheck" src={checkOrCross} />
                <img className="planOptionCardImage" src={this.props.image} />
                <div className="planOptionCardTitle">{this.props.title}</div>
                <div className="planOptionCardSubtitle">
                  {this.props.subtitle}
                </div>
              </Col>
            </Row>
            {medicarePlanDetails}
          </CardBody>
        </Card>
        <div className="planDetailsLink">{this.props.details}</div>
      </div>
    );
  }
}

export default PlanOptionCard;
