import * as React from "react";
import * as types from "../../../../store/types";
import CPU from "../../../metrics/markup/cpu";
import Memory from "../../../metrics/markup/memory";

type props = {
  appService: types.appService;
};

export default class AppServices extends React.Component<props, any> {
  render() {
    const { appService } = this.props;

    return (
      <div className="panel">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-2">
              <h4 className="oswald-header">{appService.name}</h4>
              <div>
                <u>Status</u>
              </div>
              <div
                className="ubuntu"
                style={
                  appService.status == "Ready"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                <b>{appService.status}</b>
              </div>
              <div>
                <u>Size</u>
              </div>
              <div className="ubuntu">{appService.size}</div>
              <div>
                <u>Instances</u>
              </div>
              <div className="ubuntu">{appService.countInstances}</div>
              <div>
                <u>Servicing</u>
              </div>
              <div className="ubuntu">
                {appService.services.type} - {appService.countServices}
              </div>
            </div>
            <div className="col-md-5">
              <CPU service={this.props.appService} type="appService" />
            </div>
            <div className="col-md-5">
              <Memory service={this.props.appService} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
