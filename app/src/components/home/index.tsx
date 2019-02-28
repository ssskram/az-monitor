import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as MessageStore from '../../store/messages'
import HydrateStore from '../utilities/hydrateStore'
import Messages from '../utilities/messages'
import ModuleSelection from './markup/moduleSelection'
import AppServices from '../appServices'
import APIs from '../apis'
import ClientApps from '../clientApps'
import Serverless from '../serverlessFuncs'

type props = {

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
                    <AppServices />
                }
                {currentModule == 'apis' &&
                    <APIs />
                }
                {currentModule == 'clientapps' &&
                    <ClientApps />
                }
                {currentModule == 'serverless' &&
                    <Serverless />
                }
            </div>
        )
    }
}


export default connect(
    (state: ApplicationState) => ({
        ...state.messages
    }),
    ({
        ...MessageStore.actionCreators,
    })
)(Home)