import * as React from 'react'
import * as constants from '../constants'

type props = {
    setState: (stateObj: object) => void
    language: 'Javascript' | 'C#' | 'Java' | 'Python'
}

export default class LanguageSelection extends React.Component<props, {}> {

    render() {
        const buttons = constants.languages.map((lang, index) => {
            return (
                <button
                    key={index}
                    onClick={() => this.props.setState({ language: lang.value })}
                    className='btn btn-secondary'
                    style={this.props.language == lang.value ? { backgroundColor: 'rgba(75,192,192,.5)' } : null}>
                    <h4 className='oswald-header'>{lang.value}</h4>
                    <div>{lang.description}</div>
                </button>
            )
        })

        return (
            <div className='col-md-12' style={{ padding: '15px 0px' }}>
                <h4 className='oswald-header' style={{ paddingLeft: '10px' }}><b>Written in...</b></h4>
                {buttons}
            </div>
        )
    }
}