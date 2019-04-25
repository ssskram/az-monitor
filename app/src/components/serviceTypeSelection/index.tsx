import * as React from "react";
import { Link } from "react-router-dom";

type props = {
  currentModule: string;
};

const server = require("../../images/server.png");
const vm = require("../../images/vm.png");
const api = require("../../images/api.png");
const computer = require("../../images/computer.png");
const micro = require("../../images/network.png");

const imgStyle = {
  height: "50px"
};

const selected = {
  border: "3px solid rgba(75,192,192,1)"
};

export default class ModuleSelection extends React.Component<props, {}> {
  render() {
    return (
      <div className="text-center">
        <Link
          to={"/"}
          className="btn btn-secondary"
          style={this.props.currentModule == "appservices" ? selected : null}
        >
          <img src={server as string} style={imgStyle} className="hidden-xs" />
          <h4 className="oswald-header">Application services</h4>
          <div className="hidden-xs">PaaS computing resources</div>
        </Link>
        <Link
          to={"/Interfaces"}
          className="btn btn-secondary"
          style={this.props.currentModule == "apis" ? selected : null}
        >
          <img src={api as string} style={imgStyle} className="hidden-xs" />
          <h4 className="oswald-header">Interfaces</h4>
          <div className="hidden-xs">Middlemen & gatekeepers</div>
        </Link>
        <Link
          to={"/ClientApplications"}
          className="btn btn-secondary"
          style={this.props.currentModule == "clientapps" ? selected : null}
        >
          <img
            src={computer as string}
            style={imgStyle}
            className="hidden-xs"
          />
          <h4 className="oswald-header">Client apps</h4>
          <div className="hidden-xs">UI & business logic</div>
        </Link>
        <Link
          to={"/VirtualMachines"}
          className="btn btn-secondary"
          style={
            this.props.currentModule == "virtualMachines" ? selected : null
          }
        >
          <img src={vm as string} style={imgStyle} className="hidden-xs" />
          <h4 className="oswald-header">Virtual Machines</h4>
          <div className="hidden-xs">When PaaS just can't cut it</div>
        </Link>
        <Link
          to={"/Serverless"}
          className="btn btn-secondary"
          style={this.props.currentModule == "serverless" ? selected : null}
        >
          <img src={micro as string} style={imgStyle} className="hidden-xs" />
          <h4 className="oswald-header">Serverless</h4>
          <div className="hidden-xs">
            <s>Everything else</s>
          </div>
          <div className="script hidden-xs">Microservices</div>
        </Link>
      </div>
    );
  }
}
