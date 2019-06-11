import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import * as apiApps from "../../../store/apiApplications";
import * as types from "../../../store/types";
import ApplicationCard from "../../shared/applicationCard";
import Paging from "../../utilities/paging";
import Filter from "../../filter";
import NavButtons from "../../serviceTypeSelection";
import HydrateStore from "../../utilities/hydrateStore";

type props = {
  apiApps: types.application[];
};

type state = {
  currentPage: number;
  apiApps: types.application[];
};

export class APIs extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      apiApps: props.apiApps
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ apiApps: nextProps.apiApps });
  }

  filter(appName) {
    if (appName) {
      this.setState({
        currentPage: 1,
        apiApps: this.props.apiApps.filter(app => app.name == appName)
      });
    } else this.setState({ apiApps: this.props.apiApps });
  }

  render() {
    // Logic for paging
    const indexOfLastItem = this.state.currentPage * 5;
    const indexOfFirstItem = indexOfLastItem - 5;
    const currentItems = this.state.apiApps.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    const renderItems = currentItems.map((item, index) => {
      return <ApplicationCard key={index} application={item} type="api" />;
    });

    // Logic for displaying page numbers
    const pageNumbers: any[] = [];
    for (let i = 1; i <= Math.ceil(this.state.apiApps.length / 5); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="col-md-10 col-md-offset-1">
        <HydrateStore />
        <NavButtons currentModule="apis" />
        <Filter
          applications={this.state.apiApps}
          filter={this.filter.bind(this)}
        />
        {renderItems}
        <Paging
          countItems={this.state.apiApps}
          currentPage={this.state.currentPage}
          totalPages={pageNumbers}
          next={() =>
            this.setState({ currentPage: this.state.currentPage + 1 })
          }
          prev={() =>
            this.setState({ currentPage: this.state.currentPage - 1 })
          }
        />
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.apiApps
  }),
  {
    ...apiApps.actionCreators
  }
)(APIs as any);
