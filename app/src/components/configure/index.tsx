import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as apiApps from '../../store/apiApplications'
import * as clientApps from '../../store/clientApps'
import * as serverlessApps from '../../store/serverlessApps'
import * as types from '../../store/types'
import DeploymentSource from './markup/deploymentSource'
import AppSelection from './markup/applicationSelection'
import AppSettings from './markup/applicationSettings'

type props = {
    apiApps: types.application[],
    clientApps: types.application[],
    serverlessApps: types.application[],
}

type state = {
    appName: string
    deploymentSource: string
}

export class Configure extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            appName: undefined,
            deploymentSource: undefined
        }
    }

    allApplications() {
        return this.props.apiApps.concat(this.props.clientApps).concat(this.props.serverlessApps)
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2' style={{ marginBottom: '50px' }}>
                <div className='panel panel-body'>
                    <h2>Configure a service</h2>
                    <hr />
                    <div className='col-md-8 col-md-offset-2'>
                        <AppSelection
                            setState={this.setState.bind(this)}
                            applications={this.allApplications()}
                            appName={this.state.appName}
                        />
                        {this.state.appName &&
                            <div>
                                <DeploymentSource
                                    setState={this.setState.bind(this)}
                                    deploymentSource={this.state.deploymentSource}
                                />
                                <AppSettings
                                    setState={this.setState.bind(this)}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.apiApps,
        ...state.clientApps,
        ...state.serverlessApps
    }),
    ({
        ...apiApps.actionCreators,
        ...clientApps.actionCreators,
        ...serverlessApps.actionCreators
    })
)(Configure as any)