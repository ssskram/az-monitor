import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
}

export default class ApplicationSettings extends React.Component<props, {}> {


    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px' }}>
                App settings
            </div>
        )
    }
}