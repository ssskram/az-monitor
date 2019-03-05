import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
    name: string
}

export default class AppName extends React.Component<props, {}> {

    validateString(string) {
        // validate
        this.props.setState({ name: string })
    }

    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px 0px' }}>
                <h4 className='oswald-header' style={{ paddingLeft: '10px' }}><b>Which I shall call...</b></h4>
                <input type='search'
                    className='form-control'
                    value={this.props.name}
                    placeholder="Enter a name for the application"
                    onChange={e => this.validateString(e.target.value)}
                    style={{ maxWidth: '400px' }}>
                </input>
            </div>
        )
    }
}