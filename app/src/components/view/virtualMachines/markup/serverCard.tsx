import * as React from "react";
import * as types from "../../../../store/types";
import CPU from "../../../metrics/markup/cpu";
import Memory from "../../../metrics/markup/memory";

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
            <div className="col-md-2">
              <h4 className="oswald-header">{virtualMachine.name}</h4>
            </div>
            <div className="col-md-5">
              <CPU service={this.props.virtualMachine} />
            </div>
            <div className="col-md-5">
              <Memory service={this.props.virtualMachine} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
