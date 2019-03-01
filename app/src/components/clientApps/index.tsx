import * as React from 'react'
import * as types from '../../store/types'
import ApplicationCard from '../shared/applicationCard'

type props = {
    clientApps: types.application[]
}

export default class ClientApplications extends React.Component<props, any> {

    render() {
        return (
            <div>
                {this.props.clientApps.map((client, index) => <ApplicationCard key={index} application={client} />)}
            </div>
        )
    }
}