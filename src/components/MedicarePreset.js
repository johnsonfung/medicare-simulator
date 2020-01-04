import React from "react";
import { Col, Card, CardBody } from "reactstrap";

class MedicarePreset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.scrollTo(0, 0);
    this.props.parent.setState({
      situation: this.props.situation,
      simulationTab: "results"
    });
  }

  componentDidUpdate() {}

  render() {
    return (
      <Col sm={6}>
        <Card onClick={this.handleClick} className="formsChoiceBox">
          <CardBody>
            <img
              alt={this.props.title}
              className="formsChoiceBoxImage"
              src={this.props.image}
            />
            <div className="formsChoiceBoxText">{this.props.title}</div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default MedicarePreset;
