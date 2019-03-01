import * as React from 'react'
import * as types from '../../store/types'

type props = {  
    application: types.application
}

export default class ApplicationCard extends React.Component<props, {}> {

    render() {
        return (
            <div>
                App card
            </div>
        )
    }
}