import * as React from 'react'
import * as constants from '../constants'

type props = {
    setState: (stateObj: object) => void
    type: 'API' | 'Client' | 'Lambda' | 'Python'
}

export default class AppType extends React.Component<props, {}> {

    render() {
        const buttons = constants.types.map((type, index) => {
            return (
                <button
                    key={index}
                    onClick={() => this.props.setState({ type: type.value })}
                    className='btn btn-secondary'
                    style={this.props.type == type.value ? { backgroundColor: 'rgba(75,192,192,.5)' } : null}>
                    <h4 className='oswald-header'>{type.value}</h4>
                    <div>{type.description}</div>
                </button>
            )
        })

        return (
            <div className='col-md-12' style={{ padding: '15px 0px' }}>
                <h4 className='oswald-header' style={{ paddingLeft: '10px' }}><b>I need a...</b></h4>
                {buttons}
            </div>
        )
    }
}