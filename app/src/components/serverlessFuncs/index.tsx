import * as React from 'react'
import * as types from '../../store/types'

type props = {
    serverlessApps: types.application[]
}

export default class ServerlessApplications extends React.Component<props, any> {

    render() {
        return (
            <div>
                lambdas
            </div>
        )
    }
}