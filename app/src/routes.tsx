import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/layout";
import Provision from "./components/manage/provision";
import Configure from "./components/manage/configure";
import Deploy from "./components/manage/deploy";
import ApplicationServices from "./components/view/appServices";
import ApiApplications from "./components/view/apis";
import ClientApplications from "./components/view/clientApps";
import ServerlessApps from "./components/view/serverlessFuncs";
import VirtualMachines from "./components/view/virtualMachines";

export default () => (
  <Layout>
    <Route exact path="/" component={ApplicationServices} />
    <Route exact path="/Interfaces" component={ApiApplications} />
    <Route exact path="/ClientApplications" component={ClientApplications} />
    <Route exact path="/Serverless" component={ServerlessApps} />
    <Route exact path="/VirtualMachines" component={VirtualMachines} />
    <Route exact path="/Provision" component={Provision} />
    <Route exact path="/Configure/:app?" component={Configure} />
    <Route exact path="/Deploy" component={Deploy} />
  </Layout>
);
