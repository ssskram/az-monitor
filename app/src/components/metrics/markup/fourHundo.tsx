import * as React from "react";
import * as types from "../../../store/types";
import getMetrics from "../functions/fourHundo";
import { Line } from "react-chartjs-2";

type props = {
  application: types.application;
};

type state = {
  fourHundo: any;
};

export default class FourHundo extends React.Component<props, state> {
  mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      fourHundo: undefined
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.getFourHundoErrors(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.application.name != this.props.application.name) {
      this.setState({ fourHundo: undefined });
    }
    if (this.mounted) {
      this.getFourHundoErrors(nextProps);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async getFourHundoErrors(props) {
    const fourHundo = await getMetrics(
      props.application.resourceGroup,
      props.application.name
    );
    if (this.mounted) {
      this.setState({
        fourHundo: fourHundo
      });
    }
  }

  render() {
    const data = {
      labels: this.state.fourHundo
        ? this.state.fourHundo[0].metrics.map(i => i.timestamp)
        : [],
      datasets: [
        {
          label: "400s",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(178,34,34,.4)",
          borderColor: "rgb(178,34,34)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(178,34,34)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(178,34,34)",
          pointHoverBorderColor: "rgb(178,34,34)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.fourHundo
            ? this.state.fourHundo[0].metrics.map(i => i.average)
            : []
        }
      ]
    };
    return (
      <div>
        <Line
          data={data}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}
