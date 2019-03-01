import * as React from 'react'
import * as types from '../../store/types'
import ApplicationCard from '../shared/applicationCard'

type props = {
    serverlessApps: types.application[]
}

export default class ServerlessApplications extends React.Component<props, any> {

    render() {
        return (
            <div>
                {this.props.serverlessApps.map((lambda, index) => <ApplicationCard key={index} application={lambda} />)}
            </div>
        )
    }
}