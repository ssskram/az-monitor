import * as React from "react";
import Modal from "react-responsive-modal";
import { Cat } from "react-kawaii";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

type props = {
  setState: (stateObj: object) => void;
  response: any;
};

export default class ServerConfirmation extends React.Component<props, {}> {
  render() {
    return (
      <Modal
        open={true}
        onClose={() => this.props.setState({ serverConfirmation: false })}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        showCloseIcon={true}
        center
      >
        <div>
          <br />
          <div className="text-center">
            <Cat size={180} mood="excited" color="#596881" />
            <h2 className="oswald-header">Success!</h2>
            <h4>Here's your new machine:</h4>
          </div>
          <JSONInput
            id="json"
            placeholder={this.props.response}
            locale={locale}
            viewOnly={true}
            confirmGood={false}
            onKeyPressUpdate={false}
            height="auto"
            width="auto"
            style={{
              body: { padding: "10px 0px" }
            }}
          />
          <div className="text-center">
            <br />
            <h4>Give it atleast 5 minutes before trying to SSH</h4>
          </div>
        </div>
      </Modal>
    );
  }
}
