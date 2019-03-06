import * as React from 'react'
import AppTypeSelection from './markup/appType'
import LanguageSelection from './markup/languageType'
import AppName from './markup/appName'
import SubmitButton from './markup/submit'
import AccessControl from '../accessControl'

type props = {
}

type state = {
    type: 'API' | 'Client' | 'Lambda'
    language: 'Javascript' | 'C#' | 'Java' | 'Python'
    name: string
}

export default class Provision extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            type: undefined,
            language: undefined,
            name: undefined
        }
    }

    post() {
        console.log(this.state)
    }

    render() {
        const isEnabled =
            this.state.type != undefined &&
            this.state.language != undefined &&
            this.state.name != undefined

        return (
            <div className='col-md-8 col-md-offset-2' style={{ marginBottom: '50px' }}>
                <AccessControl />
                <div className='panel panel-body'>
                    <h2>Provision</h2>
                    <hr />
                    <AppTypeSelection
                        setState={this.setState.bind(this)}
                        type={this.state.type}
                    />
                    <LanguageSelection
                        setState={this.setState.bind(this)}
                        language={this.state.language}
                    />
                    <AppName
                        setState={this.setState.bind(this)}
                        name={this.state.name}
                    />
                    <SubmitButton
                        post={this.post.bind(this)}
                        isEnabled={isEnabled}
                    />
                </div>
            </div>
        )
    }
}