import * as React from 'react'
import * as types from '../../store/types'
import Card from './markup/card'

type props = {
    appServices: types.appService[]
}

export default class AppServices extends React.Component<props, any> {

    render() {
        return (
            <div>
                {this.props.appServices.map((service, index) => <Card key={index} appService={service} />)}
            </div>
        )
    }
}