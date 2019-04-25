import * as React from 'react'
import * as types from '../../store/types'
import Select from 'react-select'

type props = {
    applications: types.application[]
    filter: (appName: string) => void
}

type state = {
    searchTerm: string
}

export default class Filter extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: undefined
        }
    }

    filter(appName) {
        this.setState({ searchTerm: appName })
        this.props.filter(appName)
    }

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
            <div className='row'>
                <div className={this.state.searchTerm ? 'col-sm-6' : 'col-md-12'} style={{ margin: '10px 0px' }}>
                    <Select
                        placeholder='Search for service'
                        value={this.state.searchTerm ? { value: this.state.searchTerm, label: this.state.searchTerm } : null}
                        onChange={f => this.filter(f.value)}
                        options={this.dropdown()}
                    />
                </div>
                {this.state.searchTerm &&
                    <div className='col-sm-6' style={{ margin: '10px 0px' }}>
                        <button
                            className='btn btn-warning'
                            onClick={() => this.filter(undefined)}
                            style={{ width: '100%', margin: '0px' }}
                        >Clear</button>
                    </div>
                }
            </div>
        )
    }
}