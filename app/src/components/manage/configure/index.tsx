import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as apiApps from '../../../store/apiApplications'
import * as clientApps from '../../../store/clientApps'
import * as serverlessApps from '../../../store/serverlessApps'
import * as types from '../../../store/types'
import DeploymentSource from './markup/deploymentSource'
import AppSelection from './markup/appSelection'
import AppSettings from './markup/appSettings'
import HydrateStore from '../../utilities/hydrateStore'
import getSourceControl from './functions/getSource'
import getAppSettings from './functions/getAppSettings'
import AccessControl from '../../accessControl'
import Spinner from '../../utilities/spinner'
import setAppSettings from './functions/setAppSettings'
import setDeploymentSource from './functions/setSource'
import ConfirmationModal from './markup/confirmationModal'

type props = {
    apiApps: types.application[],
    clientApps: types.application[],
    serverlessApps: types.application[]
    match: any
}

type state = {
    appName: string
    deploymentSource: string
    branch: string
    appSettings: any
    spinner: boolean
    confirmationModal: boolean
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
            },
            spinner: false,
            confirmationModal: false
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        if (this.props.match.params.app) {
            await this.getApplicationConfig(this.props.match.params.app)
            this.setState({
                confirmationModal: true
            })
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
            },
            spinner: true
        }, async () => {
            const app = this.allApplications().find(i => i.name == appName)
            const source: types.sourceControl = await getSourceControl(app)
            const appSettings: any = await getAppSettings(app)
            this.setState({
                deploymentSource: source.repo ? source.repo : '',
                branch: source.branch ? source.branch : '',
                appSettings: appSettings.settings,
                spinner: false
            })
        })
    }

    setDeploymentSource() {
        this.setState({ spinner: true }, async () => {
            const newSource = await setDeploymentSource(this.state.appName, this.allApplications().find(x => x.name == this.state.appName).resourceGroup, this.state.deploymentSource, this.state.branch)
            this.setState({
                deploymentSource: newSource.repo,
                branch: newSource.branch,
                spinner: false
            })
        })
    }

    setAppSettings() {
        this.setState({ spinner: true }, async () => {
            const newSettings = await setAppSettings(this.state.appName, this.allApplications().find(x => x.name == this.state.appName).resourceGroup, this.state.appSettings)
            this.setState({
                appSettings: newSettings,
                spinner: false
            })
        })
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
                        appName={this.state.appName}
                        setState={this.setState.bind(this)}
                        deploymentSource={this.state.deploymentSource}
                        branch={this.state.branch}
                        setDeploymentSource={this.setDeploymentSource.bind(this)}
                    />
                    <AppSettings
                        appName={this.state.appName}
                        setState={this.setState.bind(this)}
                        appSettings={this.state.appSettings}
                        setAppSettings={this.setAppSettings.bind(this)}
                    />
                </div>
                {this.state.spinner &&
                    <Spinner notice={'...loading ' + this.state.appName + ' configuration...'} />
                }
                {this.state.confirmationModal &&
                    <ConfirmationModal
                        setState={this.setState.bind(this)}
                    />
                }
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