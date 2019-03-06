import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from './../../store/types'
import * as user from '../../store/user'
import isUserContributor from '../../functions/userIsContributor'

type props = {
    user: types.user,
    loadUser: () => void
}

const btnStyle = {
    fontSize: '16px',
    margin: '10px 5px'
}

const actionTypes = [
    "Provision",
    "Configure",
    "Deploy"
]

export class ActionButtons extends React.Component<props, {}> {

    render() {
        return <div>
            {actionTypes.map((type, index) => {
                const isContrib = isUserContributor(this.props.user)
                return (
                    <Nav key={index}>
                        <LinkContainer to={'/' + type}>
                            <NavItem>
                                <button
                                    disabled={!isContrib}
                                    className='btn btn-secondary'
                                    style={btnStyle}
                                    title={isContrib ? null : 'To play with computers, talk to Paul Marks'}>
                                    {type}
                                </button>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                )
            })}
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user
    }),
    ({
        ...user.actionCreators
    })
)(ActionButtons as any)