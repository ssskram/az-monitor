import * as React from 'react'
import * as types from '../../store/types'
import ApplicationCard from '../shared/applicationCard'

type props = {
    apiApps: types.application[]
}

export default class APIs extends React.Component<props, {}> {

    render() {
        return (
            <div>
                {this.props.apiApps.map((api, index) => <ApplicationCard key={index} application={api} />)}
            </div>
        )
    }
}