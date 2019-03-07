import * as React from 'react'

type props = {
    appName: string
    setState: (stateObj: object) => void
    deploymentSource: string
    branch: string
    setDeploymentSource: () => void
}

type state = {
    disabled: boolean
}

const btnStyle = {
    margin: '5px 0px',
    fontSize: '10px'
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
                {!this.state.disabled &&
                    <div style={{ fontSize: '.8em', padding: '2px' }}>Note: This must be the url to a public repository</div>
                }
                <input
                    className='form-control'
                    value={this.props.deploymentSource}
                    placeholder="Github repository"
                    disabled={this.state.disabled}
                    onChange={e => this.props.setState({ deploymentSource: e.target.value })}
                    style={{ maxWidth: '500px', margin: '3px 0px' }}>
                </input>
                <input
                    className='form-control'
                    value={this.props.branch}
                    placeholder="Branch"
                    disabled={this.state.disabled}
                    onChange={e => this.props.setState({ branch: e.target.value })}
                    style={{ maxWidth: '500px', margin: '3px 0px' }}>
                </input>
                {this.state.disabled &&
                    <button
                        className='btn btn-secondary'
                        style={btnStyle}
                        onClick={() => this.setState({ disabled: false })}
                        disabled={this.props.appName == undefined}>
                        Edit deployment source
                    </button>
                }
                {!this.state.disabled &&
                    <div>
                        <button
                            className='btn btn-success'
                            style={btnStyle}
                            disabled={!this.props.deploymentSource}
                            onClick={() => {
                                this.setState({ disabled: true })
                                this.props.setDeploymentSource()
                            }}>
                            Save deployment source
                        </button>
                    </div>
                }
            </div>
        )
    }
}