import * as React from "react";
import * as constants from "../constants";

type props = {
  setState: (stateObj: object) => void;
  serverSize: "Scrawny" | "Well-fed" | "Beefcake";
};

export default class ServerSize extends React.Component<props, {}> {
  render() {
    const buttons = constants.serverSizes.map((size, index) => {
      return (
        <button
          key={index}
          onClick={() => this.props.setState({ serverSize: size.value })}
          className="btn btn-secondary"
          disabled={!size.enabled}
          title={size.enabled ? null : "In the works, dude"}
          style={
            this.props.serverSize == size.value
              ? { backgroundColor: "rgba(75,192,192,.5)" }
              : null
          }
        >
          <h4 className="oswald-header">{size.value}</h4>
          <div>{size.description}</div>
          <div>{size.cost}</div>
        </button>
      );
    });

    return (
      <div className="col-md-12" style={{ padding: "15px 0px" }}>
        <h4 className="oswald-header" style={{ paddingLeft: "10px" }}>
          <b>It needs to be...</b>
        </h4>
        {buttons}
      </div>
    );
  }
}
