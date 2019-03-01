import * as React from 'react'
import * as types from '../../store/types'

type props = {
    apiApps: types.application[]
}

export default class APIs extends React.Component<props, any> {

    render() {
        return (
            <div>
                APIs
            </div>
        )
    }
}