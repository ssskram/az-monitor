import * as React from 'react'

type props = {
    post: () => void
    isEnabled: boolean
}

export default class Submit extends React.Component<props, {}> {

    render() {
        return (
            <div className='col-md-12 text-center' style={{ padding: '45px' }}>
                <button
                    className='btn btn-success'
                    disabled={!this.props.isEnabled}
                    onClick={() => this.props.post()}>
                    Provision it!
                </button>
            </div>
        )
    }
}