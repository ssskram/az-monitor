import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const btnStyle = {
    fontSize: '16px',
    margin: '10px 5px'
}

export default class ActionButtons extends React.Component<{}, {}> {

    render() {
        return <div>
            <Nav>
                <LinkContainer to={'/Provision'}>
                    <NavItem><button className='btn btn-secondary' style={btnStyle}>Provision</button></NavItem>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to={'/Configure'}>
                    <NavItem><button className='btn btn-secondary' style={btnStyle}>Configure</button></NavItem>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to={'/Deploy'}>
                    <NavItem><button className='btn btn-secondary' style={btnStyle}>Deploy</button></NavItem>
                </LinkContainer>
            </Nav>
        </div>
    }
}