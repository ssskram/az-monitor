import * as React from 'react'

type props = {
    deploy: () => void
    isEnabled: boolean
}

export default class Button extends React.Component<props, {}> {

    render() {
        return (
            <div className='col-md-12' style={{ marginBottom: '40px' }}>
                <button
                    className='btn btn-success btn-deploy'
                    disabled={!this.props.isEnabled}
                    onClick={() => this.props.deploy()}
                    style={{ margin: '0px' }}>
                    Deploy
                </button>
            </div>
        )
    }
}