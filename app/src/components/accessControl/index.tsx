import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import { Redirect } from 'react-router-dom'
import * as types from '../../store/types'
import * as user from '../../store/user'
import userIsContributor from '../../functions/userIsContributor'

type props = {
    user: types.user
}

export class AccessControl extends React.Component<props, {}> {

    render() {
        const isContrib = userIsContributor(this.props.user)
        if (isContrib) {
            return null
        } else {
            return <Redirect push to={'/'}/>
        }
    }
}


export default connect(
    (state: ApplicationState) => ({
        ...state.user
    }),
    ({
        ...user.actionCreators
    })
)(AccessControl as any)