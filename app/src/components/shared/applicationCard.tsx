import * as React from 'react'
import * as types from '../../store/types'

type props = {
    application: types.application
}

export default class ApplicationCard extends React.Component<props, {}> {

    render() {
        const {
            application
        } = this.props

        return (
            <div className='panel'>
                <div className='panel-body'>
                    <div className='col-md-6'>
                        <h4 className='oswald-header'>{application.name}</h4>
                        <div><b>Status: </b> <span style={application.status == "Running" ? { color: 'green' } : { color: 'red' }}><b>{application.status}</b></span></div>
                        <div><b>Resource group:</b> {application.resourceGroup}</div>
                        <div>{application.url}</div>
                    </div>
                </div>
            </div>
        )
    }
}