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
                    className='btn btn-success'
                    disabled={!this.props.isEnabled}
                    onClick={() => this.props.deploy()}
                    style={{ padding: '25px 50px', margin: '0px' }}>
                    <span className='oswald-header'>Deploy it</span>
                </button>
            </div>
        )
    }
}