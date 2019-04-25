import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import * as apiApps from "../../../store/apiApplications";
import * as clientApps from "../../../store/clientApps";
import * as serverlessApps from "../../../store/serverlessApps";
import TypeSelection from "./markup/type";
import LanguageSelection from "./markup/languageType";
import ServerSize from "./markup/serverSize";
import AppName from "./markup/name";
import SubmitButton from "./markup/submit";
import AccessControl from "../../accessControl";
import Spinner from "../../utilities/spinner";
import addVirtualMachine from "./functions/createVM";

type props = {
  addApiApp: (appName: string) => void;
  addClientApp: (appName: string) => void;
  addServerlessApp: (appName: string, runtime: "dotnet" | "node") => void;
};

type state = {
  type: "API" | "Client" | "Lambda" | "Virtual Machine";
  language: "Javascript" | "C#" | "Java" | "Python";
  name: string;
  serverSize: "Scrawny" | "Well-fed" | "Beefcake";
  spinner: boolean;
  redirect: boolean;
};

export class Provision extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      type: undefined,
      language: undefined,
      name: "",
      serverSize: undefined,
      spinner: false,
      redirect: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  post() {
    this.setState({ spinner: true }, async () => {
      if (this.state.type == "API") {
        await this.props.addApiApp(this.state.name);
        this.redirect();
      }
      if (this.state.type == "Client") {
        await this.props.addClientApp(this.state.name);
        this.redirect();
      }
      if (this.state.type == "Lambda") {
        if (this.state.language == "Javascript") {
          await this.props.addServerlessApp(this.state.name, "node");
          this.redirect();
        }
        if (this.state.language == "C#") {
          await this.props.addServerlessApp(this.state.name, "dotnet");
          this.redirect();
        }
      }
      if (this.state.type == "Virtual Machine") {
        const response = await addVirtualMachine(
          this.state.name,
          this.state.serverSize
        );
        console.log(response);
        this.setState({
          type: undefined,
          language: undefined,
          name: "",
          serverSize: undefined
        });
      }
    });
  }

  redirect() {
    this.setState({ redirect: true });
  }

  render() {
    const isEnabled =
      this.state.type != undefined &&
      (this.state.language != undefined ||
        this.state.serverSize != undefined) &&
      this.state.name != "";

    if (this.state.redirect) {
      return <Redirect push to={"/Configure/" + this.state.name} />;
    }

    return (
      <div
        className="col-md-8 col-md-offset-2"
        style={{ marginBottom: "50px" }}
      >
        <AccessControl />
        <div className="panel panel-body">
          <h2>Provision</h2>
          <hr />
          <TypeSelection
            setState={this.setState.bind(this)}
            type={this.state.type}
          />
          {this.state.type == "Virtual Machine" ? (
            <ServerSize
              setState={this.setState.bind(this)}
              serverSize={this.state.serverSize}
            />
          ) : (
            <LanguageSelection
              setState={this.setState.bind(this)}
              language={this.state.language}
            />
          )}
          <AppName setState={this.setState.bind(this)} name={this.state.name} />
          <SubmitButton post={this.post.bind(this)} isEnabled={isEnabled} />
        </div>
        {this.state.spinner && (
          <Spinner notice={"...provisioning " + this.state.name + "..."} />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.apiApps,
    ...state.clientApps,
    ...state.serverlessApps
  }),
  {
    ...apiApps.actionCreators,
    ...clientApps.actionCreators,
    ...serverlessApps.actionCreators
  }
)(Provision as any);
