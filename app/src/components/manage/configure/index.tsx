import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as apiApps from '../../../store/apiApplications'
import * as clientApps from '../../../store/clientApps'
import * as serverlessApps from '../../../store/serverlessApps'
import * as types from '../../../store/types'
import DeploymentSource from './markup/deploymentSource'
import AppSelection from './markup/applicationSelection'
import AppSettings from './markup/applicationSettings'
import HydrateStore from '../../utilities/hydrateStore'
import getSourceControl from './functions/getSource'
import getAppSettings from './functions/getAppSettings'
import AccessControl from '../../accessControl'

type props = {
    apiApps: types.application[],
    clientApps: types.application[],
    serverlessApps: types.application[]
}

type state = {
    appName: string
    deploymentSource: string
    branch: string
    appSettings: any
}

export class Configure extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            appName: undefined,
            deploymentSource: '',
            branch: '',
            appSettings: {
                select: "application"
            }
        }
    }

    allApplications() {
        return this.props.apiApps.concat(this.props.clientApps).concat(this.props.serverlessApps)
    }

    getApplicationConfig(appName) {
        this.setState({
            appName: appName,
            branch: '',
            deploymentSource: '',
            appSettings: {
                loading: "application"
            }
        }, async () => {
            const app = this.allApplications().find(i => i.name == appName)
            const source: types.sourceControl = await getSourceControl(app)
            const appSettings: any = await getAppSettings(app)
            this.setState({
                deploymentSource: source.repo,
                branch: source.branch,
                appSettings: appSettings.settings
            })
        })
    }

    setDeploymentSource() {
        console.log(this.state)
    }

    setAppSettings() {
        console.log(this.state)
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2' style={{ marginBottom: '50px' }}>
                <AccessControl />
                <HydrateStore />
                <div className='panel panel-body'>
                    <h2>Configure</h2>
                    <hr />
                    <AppSelection
                        getAppConfig={this.getApplicationConfig.bind(this)}
                        applications={this.allApplications()}
                        appName={this.state.appName}
                    />
                    <DeploymentSource
                        setState={this.setState.bind(this)}
                        deploymentSource={this.state.deploymentSource}
                        branch={this.state.branch}
                        setDeploymentSource={this.setDeploymentSource.bind(this)}
                    />
                    <AppSettings
                        setState={this.setState.bind(this)}
                        appSettings={this.state.appSettings}
                        setAppSettings={this.setAppSettings.bind(this)}
                    />
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