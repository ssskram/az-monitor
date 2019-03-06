import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as appServices from '../../../store/appServices'
import * as types from '../../../store/types'
import Card from './markup/card'
import NavButtons from '../../serviceTypeSelection'
import HydrateStore from '../../utilities/hydrateStore'

type props = {
    appServices: types.appService[]
}

export class AppServices extends React.Component<props, any> {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div>
                <HydrateStore />
                <NavButtons
                    currentModule='appservices'
                />
                {this.props.appServices.map((service, index) => <Card key={index} appService={service} />)}
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.appServices
    }),
    ({
        ...appServices.actionCreators
    })
)(AppServices as any)