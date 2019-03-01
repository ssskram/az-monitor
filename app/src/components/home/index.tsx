import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as apiApps from '../../store/apiApplications'
import * as appServices from '../../store/appServices'
import * as clientApps from '../../store/clientApps'
import * as serverlessApps from '../../store/serverlessApps'
import * as types from '../../store/types'
import HydrateStore from '../utilities/hydrateStore'
import Messages from '../utilities/messages'
import ModuleSelection from './markup/moduleSelection'
import AppServices from '../appServices'
import APIs from '../apis'
import ClientApps from '../clientApps'
import Serverless from '../serverlessFuncs'

type props = {
    apiApps: types.application[],
    clientApps: types.application[],
    serverlessApps: types.application[],
    appServices: types.appService[]
}

type state = {
    currentModule: string
}

export class Home extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            currentModule: undefined
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const {
            currentModule
        } = this.state

        return (
            <div className='text-center'>
                <HydrateStore />
                <Messages />
                <ModuleSelection
                    setState={this.setState.bind(this)}
                />
                {currentModule == 'appservices' &&
                    <AppServices 
                        appServices={this.props.appServices}
                    />
                }
                {currentModule == 'apis' &&
                    <APIs 
                        apiApps={this.props.apiApps}
                    />
                }
                {currentModule == 'clientapps' &&
                    <ClientApps 
                        clientApps={this.props.clientApps}
                    />
                }
                {currentModule == 'serverless' &&
                    <Serverless 
                        serverlessApps={this.props.serverlessApps}
                    />
                }
            </div>
        )
    }
}


export default connect(
    (state: ApplicationState) => ({
        ...state.apiApps,
        ...state.appServices,
        ...state.clientApps,
        ...state.serverlessApps
    }),
    ({
        ...apiApps.actionCreators,
        ...appServices.actionCreators,
        ...clientApps.actionCreators,
        ...serverlessApps.actionCreators
    })
)(Home as any)