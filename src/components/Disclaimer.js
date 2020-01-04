import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

class Disclaimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {}

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className=""
        size="lg"
      >
        <ModalHeader toggle={this.props.toggle}>Disclaimer</ModalHeader>
        <ModalBody>
          <h1>
            I made this because the U.S. health care system is f***ing
            ridiculous.
          </h1>
          <p>
            I'm not an insurance rep, a medical professional, or a lawyer - just
            someone who waded through all the small print and wanted to organize
            it in a way that's easy to understand.
          </p>
          <p>
            You should consider this <strong>an educational endeavor</strong>.
          </p>

          <hr />
          <h6>As such:</h6>
          <p>
            All the numbers in this simulator are my best guesses. Where
            possible, I tried to find accurate numbers from reputable sources.
          </p>
          <p>
            Health care{" "}
            <strong>costs vary drastically from person-to-person</strong>. These
            numbers represent averages and ancedotes and should{" "}
            <strong>not</strong> be used to estimate your own potential costs.
          </p>
          <p>
            Premiums, deductibles, copays, and other details are pulled from
            specific providers. Your state/provider may have different prices.
          </p>
          <p>
            By using this, you agree to not hold me liable for any decisions you
            make related to your medical, legal, or financial decisions.
          </p>
          <p>
            <i>I hope you find this helpful,</i>
          </p>
          <p>
            <i>Johnson</i>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.props.toggle}>
            I agree
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

export default Disclaimer;
