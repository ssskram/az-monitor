import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
}

export default class ModuleSelection extends React.Component<props, {}> {

    render() {
        return (
            <div className='row'>
                <button
                    onClick={() => this.props.setState({ currentModule: 'appservices' })}
                    className='btn btn-secondary'>
                    Application services
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'apis' })}
                    className='btn btn-secondary'>
                    APIs
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'clientapps' })}
                    className='btn btn-secondary'>
                    Client applications
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'serverless' })}
                    className='btn btn-secondary'>
                    Serverless functions
                </button>
            </div>
        )
    }
}