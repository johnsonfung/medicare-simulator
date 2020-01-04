import React from "react";
import * as tools from "../functions";
import {
  Row,
  Col,
  Card,
  CardBody,
  NavLink,
  CardHeader,
  UncontrolledCollapse
} from "reactstrap";

class MedicarePaySummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {}

  render() {
    let lineItemsGroup = "";
    let lineItems;
    if (this.props.lineItems.length > 0) {
      if (this.props.medicareC === true) {
        lineItemsGroup = <div>Deferred to Medicare C (Advantage).</div>;
      } else {
        lineItems = this.props.lineItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ));
        lineItemsGroup = (
          <div>
            <ul>{lineItems}</ul>
          </div>
        );
      }
    } else {
      lineItemsGroup = <div>No items applicable for coverage.</div>;
    }
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader className="accordianHeader">
              <h5 className="m-0">
                <NavLink
                  className="custom-accordion-title d-block pt-2 pb-2"
                  id={this.props.id}
                  href="#"
                >
                  {this.props.title} will cover{" "}
                  <span className="success">
                    {tools.formatMoney(this.props.amount)}
                  </span>
                  <span className="float-right">
                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                  </span>
                </NavLink>
              </h5>
            </CardHeader>
            <UncontrolledCollapse toggler={"#" + this.props.id}>
              <CardBody>
                <div className="medicareReportBlock">
                  <Row>
                    <Col xl={5} className="border-right mobileCost">
                      {this.props.amount > 0 && (
                        <div className="medicareReportSubtext">
                          Cost covered by {this.props.title}:
                        </div>
                      )}
                      {this.props.amount > 0 && (
                        <div className="medicareReportMainItem success">
                          {tools.formatMoney(this.props.amount)}
                        </div>
                      )}

                      {this.props.coPayLine && this.props.amount > 0 && (
                        <div className="medicareReportSubtext">
                          {this.props.coPayLine &&
                            this.props.amount > 0 &&
                            (this.props.drugCharges === 0 ||
                              this.props.drugCharges === null ||
                              typeof this.props.drugCharges ===
                                "undefined") && (
                              <span>
                                Leaving{" "}
                                <strong>
                                  {tools.formatMoney(this.props.leftOver)}
                                </strong>{" "}
                                in {this.props.title} co-insurance and co-pays.
                              </span>
                            )}
                          {this.props.coPayLine &&
                            this.props.amount > 0 &&
                            this.props.drugCharges > 0 && (
                              <span>
                                Leaving{" "}
                                <strong>
                                  {tools.formatMoney(this.props.leftOver)}
                                </strong>{" "}
                                in {this.props.title} co-insurance and co-pays
                                and{" "}
                                <strong>
                                  {tools.formatMoney(this.props.drugCharges)}
                                </strong>{" "}
                                in drug costs.
                              </span>
                            )}
                        </div>
                      )}
                    </Col>
                    <Col xl={7} className="mobileDetails">
                      {lineItemsGroup}
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </UncontrolledCollapse>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MedicarePaySummary;
