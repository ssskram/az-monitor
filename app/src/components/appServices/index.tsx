import * as React from 'react'
import * as types from '../../store/types'

type props = {
    appServices: types.appService[]
}

export default class AppServices extends React.Component<props, any> {

    render() {
        return (
            <div>
                app services
            </div>
        )
    }
}