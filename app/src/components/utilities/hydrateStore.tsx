// hydrates the wholeeeeee store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as user from "../../store/user";
import * as appServices from "../../store/appServices";
import * as apiApps from "../../store/apiApplications";
import * as clientApps from "../../store/clientApps";
import * as serverlessApps from "../../store/serverlessApps";
import * as virtualMachines from "../../store/virtualMachines";

class Hydrate extends React.Component<any, {}> {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadApiApps();
    this.props.loadAppServices();
    this.props.loadClientApps();
    this.props.loadServerlessApps();
    this.props.loadVirtualMachines();
  }

  public render() {
    return null;
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user,
    ...state.appServices,
    ...state.apiApps,
    ...state.clientApps,
    ...state.serverlessApps,
    ...state.virtualMachines
  }),
  {
    ...user.actionCreators,
    ...appServices.actionCreators,
    ...apiApps.actionCreators,
    ...clientApps.actionCreators,
    ...serverlessApps.actionCreators,
    ...virtualMachines.actionCreators
  }
)(Hydrate);
