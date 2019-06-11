import * as React from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

type props = {
  branch: string;
  url: string;
};

export default class DeploymentSettings extends React.Component<props, {}> {
  render() {
    return (
      <div className="col-md-12" style={{ marginBottom: "20px" }}>
        <JSONInput
          id="json"
          placeholder={{
            repository: this.props.url,
            branch: this.props.branch
          }}
          locale={locale}
          viewOnly={true}
          confirmGood={false}
          height="auto"
          style={{
            body: { padding: "10px 0px" }
          }}
        />
      </div>
    );
  }
}
