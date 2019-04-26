import * as React from "react";
import * as types from "../../../../store/types";
import CPU from "../../../metrics/markup/cpu";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

type props = {
  virtualMachine: types.virtualMachine;
};

export default class VMCard extends React.Component<props, any> {
  render() {
    const { virtualMachine } = this.props;
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-4" style={{ padding: "10px 5px" }}>
              <h3 className="oswald-header">{virtualMachine.name}</h3>
              <div>
                <u>Size</u>
              </div>
              <div className="ubuntu">{virtualMachine.size}</div>
              <div>
                <u>Image</u>
              </div>
              <div className="ubuntu">{virtualMachine.image.type}</div>
              <div className="ubuntu">{virtualMachine.image.sku}</div>
              <div>
                <u>osDisk</u>
              </div>
              <div className="ubuntu">OS: {virtualMachine.osDisk.osType}</div>
              <div className="ubuntu">
                Size: {virtualMachine.osDisk.diskSize} GB
              </div>
            </div>
            <div className="col-md-8" style={{ padding: "10px 5px" }}>
              <CPU service={this.props.virtualMachine} type="virtualMachine" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
