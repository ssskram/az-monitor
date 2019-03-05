import * as React from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

type props = {
    setState: (stateObj: object) => void
    appSettings: any
    setAppSettings: () => void
}

type state = {
    disabled: boolean
}

const btnStyle = {
    margin: '5px 0px',
    fontSize: '10px'
}

export default class ApplicationSettings extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            disabled: true
        }
    }

    newObj(obj) {
        this.props.setState({ appSettings: obj.jsObject })
    }

    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px' }}>
                <h4 className='oswald-header'><b>Environment variables</b></h4>
                <JSONInput
                    id='a_unique_id'
                    placeholder={this.props.appSettings}
                    locale={locale}
                    viewOnly={this.state.disabled}
                    confirmGood={false}
                    height='auto'
                    onChange={this.newObj.bind(this)}
                    style={{
                        outerBox: { width: '100%' },
                        container: { overflow: 'visible' },
                        body: { padding: '10px 0px' }
                    }}
                />
                {this.state.disabled &&
                    <button
                        className='btn btn-secondary'
                        style={btnStyle}
                        onClick={() => this.setState({ disabled: false })}>
                        Edit env
                    </button>
                }
                {!this.state.disabled &&
                    <div>
                        <button
                            className='btn btn-success'
                            style={btnStyle}
                            onClick={() => {
                                this.setState({ disabled: true })
                                this.props.setAppSettings()
                            }}>
                            Save env
                        </button>
                    </div>
                }
            </div>
        )
    }
}