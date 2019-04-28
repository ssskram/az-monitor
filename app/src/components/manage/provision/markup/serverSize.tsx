import * as React from "react";
import * as constants from "../constants";

type props = {
  setState: (stateObj: object) => void;
  serverSize: "Scrawny" | "Well-fed" | "Beefcake";
};

const statsTableContainer = {
  padding: 0
};

const statsTableHeader = {
  lineHeight: "8px !important",
  fontSize: ".7em",
  fontStyle: "italic"
};

const statsTableContent = {
  fontSize: ".8em"
};

export default class ServerSize extends React.Component<props, {}> {
  render() {
    const buttons = constants.serverSizes.map((size, index) => {
      return (
        <div className="col-md-4" style={{ margin: 0, padding: 0 }}>
          <button
            key={index}
            onClick={() => this.props.setState({ serverSize: size.value })}
            className="btn btn-secondary"
            disabled={!size.enabled}
            title={size.enabled ? null : "In the works, dude"}
            style={
              this.props.serverSize == size.value
                ? {
                    backgroundColor: "rgba(75,192,192,.5)",
                    width: "100%",
                    margin: "0px 5px",
                    border: "1px solid black",
                    borderRadius: "0px"
                  }
                : {
                    width: "100%",
                    margin: "0px 5px",
                    border: "1px solid black",
                    borderRadius: "0px"
                  }
            }
          >
            <h4 className="oswald-header">{size.value}</h4>
            <div>
              <div className="col-lg-4" style={statsTableContainer}>
                <div style={statsTableHeader}>RAM</div>
                <div style={statsTableContent}>{size.description.RAM}</div>
              </div>
              <div className="col-lg-4" style={statsTableContainer}>
                <div style={statsTableHeader}>Temporary storage</div>
                <div style={statsTableContent}>{size.description.SSD}</div>
              </div>
              <div className="col-lg-4" style={statsTableContainer}>
                <div style={statsTableHeader}>Persistent storage</div>
                <div style={statsTableContent}>{size.description.VHD}</div>
              </div>
            </div>
            <div style={{ color: "red" }}>{size.cost}</div>
          </button>
        </div>
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
