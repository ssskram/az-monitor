import * as React from 'react'
import * as types from '../../store/types'

type props = {
    clientApps: types.application[]
}

export default class ClientApplications extends React.Component<props, any> {

    render() {
        return (
            <div>
                Client apps
            </div>
        )
    }
}