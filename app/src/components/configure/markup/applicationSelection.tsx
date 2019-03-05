import * as React from 'react'
import * as types from '../../../store/types'
import Select from 'react-select'

type props = {
    setState: (stateObj: object) => void
    applications: types.application[]
    appName: string
}

export default class ApplicationSelection extends React.Component<props, {}> {

    dropdown() {
        let selects = [] as any
        this.props.applications.forEach(i => {
            selects.push({ value: i.name, label: i.name })
        })
        selects.sort((a, b) => a.label.localeCompare(b.label))
        return Array.from(selects.reduce((m, t) => m.set(t.value, t), new Map()).values())
    }

    render() {
        return (
            <div className='col-md-12' style={{ padding: '15px' }}>
                <div className='row'>
                    <div className={'col-md-12'} style={{ margin: '10px 0px' }}>
                        <h4 className='oswald-header'><b>Application</b></h4>
                        <div style={{ maxWidth: '500px' }}>
                            <Select
                                placeholder='Select application'
                                value={this.props.appName ? { value: this.props.appName, label: this.props.appName } : null}
                                onChange={f => this.props.setState({ appName: f.value })}
                                options={this.dropdown()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}