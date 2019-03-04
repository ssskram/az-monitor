import * as React from 'react'
import * as types from '../../../store/types'
import getMetrics from '../functions/cpu'
import { Line } from 'react-chartjs-2'

type props = {
    appService: types.appService
}

type state = {
    cpu: any
}

export default class FourHundo extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            cpu: undefined
        }
    }

    async componentDidMount() {
        this.setState({
            cpu: await getMetrics(this.props.appService.name)
        })
    }

    render() {
        const data = {
            labels: this.state.cpu ? this.state.cpu[0].metrics.map(i => i.timestamp) : [],
            datasets: [
                {
                    label: 'CPU consumption',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.cpu ? this.state.cpu[0].metrics.map(i => i.average) : []
                }
            ]
        }
        return (
            <div>
                <Line
                    data={data}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value, index, values) {
                                        return value + "%"
                                    }
                                }
                            }]
                        }
                    }}
                />

            </div>
        )
    }
}