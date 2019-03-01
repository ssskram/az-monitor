import * as React from 'react'
import * as types from '../../../store/types'
import getMetrics from '../functions/getRequests'
import { Line } from 'react-chartjs-2'

type props = {
    application: types.application
}

type state = {
    requests: types.metric[]
}


export default class Requests extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            requests: undefined
        }
    }

    async componentDidMount() {
        this.setState({
            requests: await getMetrics(this.props.application.resourceGroup, this.props.application.name)
        })
    }

    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Requests',
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
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        return (
            <div>
                {this.state.requests &&
                    <Line
                        data={data}
                    />
                }
            </div>
        )
    }
}