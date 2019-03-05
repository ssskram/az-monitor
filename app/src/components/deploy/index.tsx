import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as apiApps from '../../store/apiApplications'
import * as clientApps from '../../store/clientApps'
import * as serverlessApps from '../../store/serverlessApps'
import * as types from '../../store/types'
import AppSelection from '../configure/markup/applicationSelection'
import Button from './markup/deployBtn'
import HydrateStore from '../utilities/hydrateStore'

type props = {
    apiApps: types.application[],
    clientApps: types.application[],
    serverlessApps: types.application[]
}

type state = {
    appName: string
}

export class Deploy extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            appName: undefined
        }
    }

    allApplications() {
        return this.props.apiApps.concat(this.props.clientApps).concat(this.props.serverlessApps)
    }

    deploy() {

    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2' style={{ marginBottom: '50px' }}>
                <HydrateStore />
                <div className='panel panel-body'>
                    <h2>Deploy <span style={{fontSize: '.5em'}}> from Github repo</span></h2>
                    <hr />
                        <AppSelection
                            setState={this.setState.bind(this)}
                            applications={this.allApplications()}
                            appName={this.state.appName}
                        />
                        <Button
                            isEnabled={this.state.appName != undefined}
                            deploy={this.deploy.bind(this)}
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
)(Deploy as any)