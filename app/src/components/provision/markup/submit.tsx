import * as React from 'react'

type props = {
    post: () => void
    isEnabled: boolean
}

export default class Submit extends React.Component<props, {}> {

    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px 0px' }}>
                <button
                    className='btn btn-success btn-deploy'
                    disabled={!this.props.isEnabled}
                    onClick={() => this.props.post()}
                    style={{ marginLeft: '5px' }}>
                    Provision it!
                </button>
            </div>
        )
    }
}