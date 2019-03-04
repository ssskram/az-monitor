import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
    name: string
}

export default class AppName extends React.Component<props, {}> {

    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px' }}>
                <h4><b>Whose name shall be...</b></h4>
                <input type='search'
                    className='form-control'
                    value={this.props.name}
                    placeholder="Enter a name for the application"
                    onChange={e => this.props.setState({ name: e.target.value })}>
                </input>
            </div>
        )
    }
}