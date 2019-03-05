import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
    deploymentSource: string
}

type state = {
    disabled: boolean
}

export default class DeploymentSource extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            disabled: true
        }
    }

    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px' }}>
                <h4 className='oswald-header'><b>Deployment source</b></h4>
                <input type='search'
                    className='form-control'
                    value={this.props.deploymentSource}
                    placeholder="URL of Github repository"
                    disabled={this.state.disabled}
                    onChange={e => this.props.setState({ deploymentSource: e.target.value })}
                    style={{ maxWidth: '600px' }}>
                </input>
            </div>
        )
    }
}