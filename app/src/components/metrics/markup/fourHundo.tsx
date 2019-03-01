import * as React from 'react'
import * as types from '../../../store/types'
import getMetrics from '../functions/fourHundo'
import { Line } from 'react-chartjs-2'

type props = {
    application: types.application
}

type state = {
    fourHundo: types.metric[]
}


export default class FourHundo extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            fourHundo: undefined
        }
    }

    async componentDidMount() {
        this.setState({
            fourHundo: await getMetrics(this.props.application.resourceGroup, this.props.application.name)
        })
    }

    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: '400s',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(178,34,34,.4)',
                    borderColor: 'rgb(178,34,34)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(178,34,34)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(178,34,34)',
                    pointHoverBorderColor: 'rgb(178,34,34)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        return (
            <div>
                {this.state.fourHundo &&
                    <Line
                        data={data}
                    />
                }
            </div>
        )
    }
}