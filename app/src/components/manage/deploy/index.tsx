import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as apiApps from '../../../store/apiApplications'
import * as clientApps from '../../../store/clientApps'
import * as serverlessApps from '../../../store/serverlessApps'
import * as types from '../../../store/types'
import AppSelection from '../configure/markup/appSelection'
import Button from './markup/deployBtn'
import HydrateStore from '../../utilities/hydrateStore'
import AccessControl from '../../accessControl'
import getSourceControl from '../configure/functions/getSource'
import DeploymentSource from './markup/deploymentSettings'
import Spinner from '../../utilities/spinner'
import syncSource from './functions/syncSource'

type props = {
    apiApps: types.application[],
    clientApps: types.application[],
    serverlessApps: types.application[]
}

type state = {
    appName: string,
    deploymentSource: string
    branch: string,
    spinner: boolean
}

export class Deploy extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            appName: undefined,
            branch: undefined,
            deploymentSource: undefined,
            spinner: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    allApplications() {
        return this.props.apiApps.concat(this.props.clientApps).concat(this.props.serverlessApps)
    }

    getApplicationConfig(appName) {
        this.setState({ appName: appName, spinner: true }, async () => {
            const app = this.allApplications().find(i => i.name == appName)
            const source: types.sourceControl = await getSourceControl(app)
            this.setState({
                deploymentSource: source.repo ? source.repo : '',
                branch: source.branch ? source.branch : '',
                spinner: false
            })
        })
    }

    deploy() {
        this.setState({ spinner: true }, async () => {
            await syncSource(this.state.appName, this.allApplications().find(x => x.name == this.state.appName).resourceGroup)
            this.setState({ 
                spinner: false, 
                appName: undefined,
                branch: undefined,
                deploymentSource: undefined
            })
        })
    }

    render() {
        const isEnabled =
            this.state.appName != undefined &&
            this.state.deploymentSource != undefined &&
            this.state.branch != undefined

        return (
            <div className='col-md-8 col-md-offset-2' style={{ marginBottom: '50px' }}>
                <AccessControl />
                <HydrateStore />
                <div className='panel panel-body'>
                    <h2>Deploy <span style={{ fontSize: '.5em' }}> from Github repo</span></h2>
                    <hr />
                    <AppSelection
                        getAppConfig={this.getApplicationConfig.bind(this)}
                        applications={this.allApplications()}
                        appName={this.state.appName}
                    />
                    {this.state.deploymentSource && this.state.branch &&
                        <DeploymentSource
                            url={this.state.deploymentSource}
                            branch={this.state.branch}
                        />
                    }
                    <Button
                        isEnabled={isEnabled}
                        deploy={this.deploy.bind(this)}
                    />
                </div>
                {this.state.spinner &&
                    <Spinner notice={'...working...'} />
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
)(Deploy as any)