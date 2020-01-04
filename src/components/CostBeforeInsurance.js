import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  NavLink,
  UncontrolledCollapse
} from "reactstrap";
import * as tools from "../functions";
import { constants } from "../content";

class CostBeforeInsurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    // bring in the medical situation
    let sitDetails = this.props.situation;

    // figure out costs that fall under Medicare A
    let costMedicareAGroup = "";
    let costMedicareAItems = [];
    if (sitDetails.hospitalDays > 0) {
      costMedicareAItems.push({
        text:
          tools.formatMoney(
            sitDetails.hospitalDays * constants.hospitalStayNoInsurance
          ) +
          " for " +
          sitDetails.hospitalDays +
          " days in the hospital"
      });
    }
    if (sitDetails.skilledNursingDays > 0) {
      costMedicareAItems.push({
        text:
          tools.formatMoney(
            sitDetails.skilledNursingDays * constants.skilledNursingNoInsurance
          ) +
          " for " +
          sitDetails.skilledNursingDays +
          " days in a skilled nursing facility"
      });
    }
    if (sitDetails.homeCareEquipmentCost > 0) {
      costMedicareAItems.push({
        text:
          tools.formatMoney(sitDetails.homeCareEquipmentCost) +
          " for home care equipment"
      });
    }
    if (sitDetails.inpatientMentalCareCost > 0) {
      costMedicareAItems.push({
        text:
          tools.formatMoney(sitDetails.inpatientMentalCareCost) +
          " for inpatient mental health care"
      });
    }
    if (costMedicareAItems.length > 0) {
      let costMedicareADisplay = costMedicareAItems.map((item, index) => (
        <li key={index}>{item.text}</li>
      ));
      costMedicareAGroup = (
        <div>
          <div className="medicareReportSubtext">Related to Medicare A:</div>
          <ul>{costMedicareADisplay}</ul>
        </div>
      );
    } else {
      costMedicareAGroup = (
        <div className="medicareReportSubtext">
          No items applicable to Medicare A.
        </div>
      );
    }

    // figure out costs for extra items that are extra items under Medicare A (that are covered by some Medigap plans)
    let costExtrasGroup = "";
    let costExtrasItems = [];
    if (sitDetails.hospiceCareCost > 0) {
      costExtrasItems.push({
        text:
          tools.formatMoney(sitDetails.hospiceCareCost) + " for hospice care"
      });
    }
    if (sitDetails.bloodTransfusionCost > 0) {
      costExtrasItems.push({
        text:
          tools.formatMoney(sitDetails.bloodTransfusionCost) +
          " for blood transfusions"
      });
    }
    if (costExtrasItems.length > 0) {
      let costExtrasDisplay = costExtrasItems.map(item => <li>{item.text}</li>);
      costExtrasGroup = (
        <div>
          <div className="medicareReportSubtext">Extra items:</div>
          <ul>{costExtrasDisplay}</ul>
        </div>
      );
    } else {
      costExtrasGroup = <div className="medicareReportSubtext"></div>;
    }

    // figure out costs that fall under Medicare B
    let costMedicareBGroup = "";
    let costMedicareBItems = [];
    if (sitDetails.regularHealthCareCost > 0) {
      costMedicareBItems.push({
        text:
          tools.formatMoney(sitDetails.regularHealthCareCost) +
          " for medical care and diagnostics"
      });
    }
    if (sitDetails.excessHealthCareCost > 0) {
      costMedicareBItems.push({
        text:
          tools.formatMoney(sitDetails.excessHealthCareCost) +
          " for uncovered excess care"
      });
    }
    if (costMedicareBItems.length > 0) {
      let costMedicareBDisplay = costMedicareBItems.map((item, index) => (
        <li key={index}>{item.text}</li>
      ));
      costMedicareBGroup = (
        <div>
          <div className="medicareReportSubtext">Related to Medicare B:</div>
          <ul>{costMedicareBDisplay}</ul>
        </div>
      );
    } else {
      costMedicareBGroup = (
        <div className="medicareReportSubtext">
          No items applicable to Medicare B.
        </div>
      );
    }

    // figure out costs that fall under Medicare D
    let costMedicareDGroup = "";
    let costMedicareDItems = [];
    if (sitDetails.drugsCost > 0) {
      costMedicareDItems.push({
        text:
          tools.formatMoney(sitDetails.drugsCost) + " for drugs and injections"
      });
    }
    if (costMedicareDItems.length > 0) {
      let costMedicareDDisplay = costMedicareDItems.map((item, index) => (
        <li key={index}>{item.text}</li>
      ));
      costMedicareDGroup = (
        <div>
          <div className="medicareReportSubtext">
            Related to Medicare D (drugs):
          </div>
          <ul>{costMedicareDDisplay}</ul>
        </div>
      );
    } else {
      costMedicareDGroup = (
        <div className="medicareReportSubtext">
          No items applicable to Medicare D.
        </div>
      );
    }
    if (this.props.active === true) {
      return (
        <div>
          <Row>
            <Col>
              <Card>
                <CardHeader className="accordianHeader">
                  <h5 className="m-0">
                    <NavLink
                      className="custom-accordion-title d-block pt-2 pb-2"
                      id="costsAccordian"
                      href="#"
                    >
                      Hypothetical Medical Bill:{" "}
                      <span className="danger">
                        {tools.formatMoney(
                          this.props.calculationsOutput.noInsuranceCost
                        )}
                      </span>
                      <span className="float-right">
                        <i className="mdi mdi-chevron-down accordion-arrow"></i>
                      </span>
                    </NavLink>
                  </h5>
                </CardHeader>
                <UncontrolledCollapse toggler={"#costsAccordian"}>
                  <CardBody>
                    <div className="medicareReportBlock">
                      <Row>
                        <Col xl={5} className="border-right mobileCost">
                          <div className="medicareReportSubtext mt-2">
                            Total cost before insurance:
                          </div>
                          <div className="medicareReportMainItem danger">
                            {tools.formatMoney(
                              this.props.calculationsOutput.noInsuranceCost
                            )}
                          </div>
                        </Col>
                        <Col xl={7} className="mobileDetails">
                          {costMedicareAGroup}
                          {costExtrasGroup}
                          {costMedicareBGroup}
                          {costMedicareDGroup}
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default CostBeforeInsurance;
