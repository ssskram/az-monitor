import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
    name: string
}

export default class Name extends React.Component<props, {}> {

    validateString(string: string) {
        const regExp = '[^A-Za-z0-9-]+'
        if (!string.match(regExp)) {
            this.props.setState({ name: string })
        }
    }

    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px 0px' }}>
                <h4 className='oswald-header' style={{ paddingLeft: '10px' }}><b>Named...</b></h4>
                <input type='search'
                    className='form-control'
                    value={this.props.name}
                    placeholder="Enter a name for the service"
                    onChange={e => this.validateString(e.target.value)}
                    style={{ maxWidth: '400px', marginLeft: '5px' }}>
                </input>
            </div>
        )
    }
}