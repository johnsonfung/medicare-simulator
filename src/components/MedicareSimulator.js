// @flow
import React from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  TabContent,
  TabPane
} from "reactstrap";
import { situationPresets, content, constants, initState } from "../content";
import * as tools from "../functions";
import Disclaimer from "./Disclaimer";
import MedicarePreset from "./MedicarePreset";
import PlanOptionCard from "./PlanOptionCard";
import MedigapPlanButtons from "./MedigapPlanButtons";
import SecondaryCareButtons from "./SecondaryCareButtons";
import CostBeforeInsurance from "./CostBeforeInsurance";
import MedicareALineItems from "./MedicareALineItems";
import MedicareBLineItems from "./MedicareBLineItems";
import MedicareCLineItems from "./MedicareCLineItems";
import MedicareDLineItems from "./MedicareDLineItems";
import MedigapLineItems from "./MedigapLineItems";
import OutOfPocketItems from "./OutOfPocketItems";
import MonthlyInsuranceCost from "./MonthlyInsuranceCost";

class MedicareSimulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.openModalWithSize = this.openModalWithSize.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleToggleSecondary = this.handleToggleSecondary.bind(this);
    this.handleToggleMedigap = this.handleToggleMedigap.bind(this);
    this.handleUpdateSituation = this.handleUpdateSituation.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleResetSituation = this.handleResetSituation.bind(this);
  }

  openModalWithSize = size => {
    this.setState({ size: size, className: null });
    this.toggle();
  };

  toggleTab = tab => {
    if (this.state.simulationTab !== tab) {
      this.setState({
        simulationTab: tab
      });
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleToggleSecondary = path => e => {
    if (this.state.selectedSecondary === path) {
      this.setState({
        selectedSecondary: null
      });
    } else {
      this.setState({
        selectedSecondary: path
      });
    }
  };

  handleToggleMedigap = plan => e => {
    this.setState({
      medigapPlan: plan
    });
  };

  handleUpdateSituation = data => e => {
    let situation = data.situationSample;
    situation.active = true;
    this.setState({
      situation: situation,
      simulationTab: "results"
    });
  };

  handleResetSituation = () => e => {
    this.setState({
      simulationTab: "presets"
    });
  };

  componentDidMount() {}

  componentDidUpdate() {
    //if no medicareA, no medicareB
    if (
      this.state.selectedMedicareA === false &&
      this.state.selectedMedicareB === true
    ) {
      this.setState({
        selectedMedicareB: false
      });
    }

    // if no medicareB, no secondary care
    if (
      this.state.selectedMedicareB === false &&
      this.state.selectedSecondary !== null
    ) {
      this.setState({
        selectedSecondary: null
      });
    }
  }

  render() {
    // Get all calulation outputs
    let calculationsOutput = tools.calculateHospitalCosts(
      this.state.situation,
      this,
      constants,
      content
    );

    // Medical situation preset buttons
    const situationPresetButtons = situationPresets.map((item, index) => (
      <MedicarePreset
        key={index}
        title={item.title}
        image={item.image}
        situation={item.situation}
        constants={constants}
        content={content}
        parent={this}
      />
    ));

    // Medigap plans
    let medigapPlanBlock;
    if (this.state.selectedSecondary === "medigap") {
      let selectedMedigapPlan =
        content.medigapPlanDetails[this.state.medigapPlan];
      medigapPlanBlock = (
        <Row>
          <Col xs={12} sm={6}>
            <PlanOptionCard
              title={selectedMedigapPlan.name}
              subtitle={selectedMedigapPlan.subtitle}
              image={selectedMedigapPlan.image}
              premium={selectedMedigapPlan.premium}
              deductible={selectedMedigapPlan.deductible}
              coInsurance={selectedMedigapPlan.coInsurance}
              coPays={selectedMedigapPlan.coPays}
              oopLimit={selectedMedigapPlan.oopLimit}
              selected={this.state.selectedMedigap}
              medigapTrue={true}
              partACoInsurance={selectedMedigapPlan.partACoInsurance}
              partBCoInsurance={selectedMedigapPlan.partBCoInsurance}
              bloodTransfusion={selectedMedigapPlan.bloodTransfusion}
              partAHospice={selectedMedigapPlan.partAHospice}
              skilledNursingCoInsurance={
                selectedMedigapPlan.skilledNursingCoInsurance
              }
              partADeductible={selectedMedigapPlan.partADeductible}
              partBDeductible={selectedMedigapPlan.partBDeductible}
              partBExcess={selectedMedigapPlan.partBExcess}
              foreignTravel={selectedMedigapPlan.foreignTravel}
              parent={this}
              field="Medigap"
            />
          </Col>
          <Col xs={12} sm={6}>
            <PlanOptionCard
              title={content.medicareD.name}
              subtitle={content.medicareD.subtitle}
              image={content.medicareD.image}
              premium={content.medicareD.premium}
              deductible={content.medicareD.deductible}
              coInsurance={content.medicareD.coInsurance}
              coPays={content.medicareD.coPays}
              oopLimit={content.medicareD.oopLimit}
              selected={this.state.selectedMedicareD}
              details={content.medicareD.details}
              parent={this}
              field="MedicareD"
            />
          </Col>
        </Row>
      );
    }

    return (
      <React.Fragment>
        <Row className="headerBar">
          <div className="logoArea">
            <h1 className="medicareH1">The Medicare Simulator </h1>
          </div>
          <MonthlyInsuranceCost state={this.state} />
        </Row>
        <Row className="appBody">
          <Disclaimer isOpen={this.state.modal} toggle={this.toggle} />
          <Col xl={5} className="situationsCol">
            <Card>
              <CardBody>
                <Row>
                  <Col className="text-center">
                    {this.state.simulationTab === "results" && (
                      <div>
                        <h2 className="mb-3">{this.state.situation.title}</h2>
                        <div className="mobileBackToScenario">
                          <Button
                            onClick={() => {
                              this.toggleTab("presets");
                            }}
                          >
                            Choose another scenario
                          </Button>
                        </div>
                      </div>
                    )}
                    {this.state.simulationTab === "presets" && (
                      <h2 className="mb-3">1. Choose a scenario</h2>
                    )}

                    <TabContent activeTab={this.state.simulationTab}>
                      <TabPane tabId="presets">
                        <Row>
                          <Col sm="12">
                            <Row className="mt-3">{situationPresetButtons}</Row>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.simulationTab}>
                      <TabPane tabId="results">
                        <Row>
                          <Col sm="12">
                            <div className="medicareReport mt-1">
                              {this.state.situation.active === true && (
                                <div>
                                  <CostBeforeInsurance
                                    active={this.state.situation.active}
                                    situation={this.state.situation}
                                    calculationsOutput={calculationsOutput}
                                  />
                                  <MedicareALineItems
                                    active={
                                      this.state.situation.active &&
                                      this.state.selectedMedicareA === true
                                    }
                                    medicareCActive={
                                      this.state.selectedSecondary ===
                                        "medicareC" &&
                                      this.state.selectedMedicareC === true
                                    }
                                    situation={this.state.situation}
                                    calculationsOutput={calculationsOutput}
                                  />
                                  <MedicareBLineItems
                                    active={
                                      this.state.situation.active &&
                                      this.state.selectedMedicareB === true
                                    }
                                    medicareCActive={
                                      this.state.selectedSecondary ===
                                        "medicareC" &&
                                      this.state.selectedMedicareC === true
                                    }
                                    situation={this.state.situation}
                                    calculationsOutput={calculationsOutput}
                                  />
                                  <MedicareCLineItems
                                    active={
                                      this.state.situation.active === true &&
                                      this.state.selectedSecondary ===
                                        "medicareC" &&
                                      this.state.selectedMedicareC === true
                                    }
                                    situation={this.state.situation}
                                    calculationsOutput={calculationsOutput}
                                  />
                                  <MedigapLineItems
                                    active={
                                      this.state.situation.active === true &&
                                      this.state.selectedSecondary ===
                                        "medigap" &&
                                      this.state.selectedMedigap === true
                                    }
                                    medigapPlan={this.state.medigapPlan}
                                    situation={this.state.situation}
                                    calculationsOutput={calculationsOutput}
                                  />
                                  <MedicareDLineItems
                                    active={
                                      this.state.situation.active === true &&
                                      this.state.selectedSecondary ===
                                        "medigap" &&
                                      this.state.selectedMedicareD === true
                                    }
                                    situation={this.state.situation}
                                    calculationsOutput={calculationsOutput}
                                  />
                                  <OutOfPocketItems
                                    active={
                                      this.state.situation.active === true
                                    }
                                    medicareCActive={
                                      this.state.selectedSecondary ===
                                        "medicareC" &&
                                      this.state.selectedMedicareC === true
                                    }
                                    calculationsOutput={calculationsOutput}
                                  />
                                </div>
                              )}
                              {this.state.situation.active === false && (
                                <div>
                                  Select a situation to see costs and coverage.
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl={7} className="plansCol">
            <Card>
              <CardBody>
                <Row className="mb-3 text-center">
                  <Col>
                    <h2>2. Click on the plans to increase your coverage</h2>
                  </Col>
                </Row>
                <Row className="text-center mb-3">
                  <Col>
                    <h4>Foundational Coverage</h4>
                    <p>
                      These are provided by the government and cover the most
                      basic of medical care.
                    </p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} sm={6}>
                    <PlanOptionCard
                      title={content.medicareA.name}
                      subtitle={content.medicareA.subtitle}
                      image={content.medicareA.image}
                      premium={content.medicareA.premium}
                      deductible={content.medicareA.deductible}
                      coInsurance={content.medicareA.coInsurance}
                      coPays={content.medicareA.coPays}
                      oopLimit={content.medicareA.oopLimit}
                      selected={this.state.selectedMedicareA}
                      details={content.medicareA.details}
                      parent={this}
                      field="MedicareA"
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Row>
                      <Col>
                        <PlanOptionCard
                          title={content.medicareB.name}
                          subtitle={content.medicareB.subtitle}
                          image={content.medicareB.image}
                          premium={content.medicareB.premium}
                          deductible={content.medicareB.deductible}
                          coInsurance={content.medicareB.coInsurance}
                          coPays={content.medicareB.coPays}
                          oopLimit={content.medicareB.oopLimit}
                          selected={this.state.selectedMedicareB}
                          details={content.medicareB.details}
                          parent={this}
                          field="MedicareB"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {this.state.selectedMedicareA === false && (
                          <div className="warningTextMedicare">
                            Medicare B requires Medicare A
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="text-center mb-3">
                  <Col xl={3}></Col>
                  <Col xl={6}>
                    <h4>Secondary Coverage</h4>
                    <p>
                      These <strong>supplement</strong> the foundational plans.
                      These plans are regulated by government, but priced and
                      provided by private companies.
                    </p>
                    <p>
                      You can pick <strong>only one</strong> of these types of
                      secondary coverage.
                    </p>
                  </Col>
                  <Col xl={3}></Col>
                </Row>
                <SecondaryCareButtons
                  selectedSecondary={this.state.selectedSecondary}
                  selectedMedicareB={this.state.selectedMedicareB}
                  handleToggleSecondary={this.handleToggleSecondary}
                />
                <MedigapPlanButtons
                  selectedSecondary={this.state.selectedSecondary}
                  medigapPlan={this.state.medigapPlan}
                  handleToggleMedigap={this.handleToggleMedigap}
                />{" "}
                {medigapPlanBlock}
                {this.state.selectedSecondary === "medicareC" && (
                  <Row>
                    <Col xl={3}></Col>
                    <Col>
                      <PlanOptionCard
                        title={content.medicareC.name}
                        subtitle={content.medicareC.subtitle}
                        image={content.medicareC.image}
                        premium={content.medicareC.premium}
                        deductible={content.medicareC.deductible}
                        coInsurance={content.medicareC.coInsurance}
                        coPays={content.medicareC.coPays}
                        oopLimit={content.medicareC.oopLimit}
                        selected={this.state.selectedMedicareC}
                        details={content.medicareC.details}
                        parent={this}
                        field="MedicareC"
                      />
                    </Col>
                    <Col xl={3}></Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.state.situation.active && (
          <div className="mobileFooter">
            Out-of-pocket cost for this incident:{" "}
            <span className="danger">
              {tools.formatMoney(calculationsOutput.outOfPocket)}
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MedicareSimulator;
