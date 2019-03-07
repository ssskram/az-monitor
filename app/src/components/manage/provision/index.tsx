import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as apiApps from '../../../store/apiApplications'
import * as clientApps from '../../../store/clientApps'
import * as serverlessApps from '../../../store/serverlessApps'
import AppTypeSelection from './markup/appType'
import LanguageSelection from './markup/languageType'
import AppName from './markup/appName'
import SubmitButton from './markup/submit'
import AccessControl from '../../accessControl'
import Spinner from '../../utilities/spinner'

type props = {
    addApiApp: (appName: string) => void
    addClientApp: (appName: string) => void
    addServerlessApp: (appName: string, runtime: "dotnet" | "node") => void
}

type state = {
    type: 'API' | 'Client' | 'Lambda'
    language: 'Javascript' | 'C#' | 'Java' | 'Python'
    name: string
    spinner: boolean
    redirect: boolean
}

export class Provision extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            type: undefined,
            language: undefined,
            name: '',
            spinner: false,
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    post() {
        this.setState({ spinner: true }, async () => {
            if (this.state.type == "API") {
                await this.props.addApiApp(this.state.name)
                this.redirect()
            }
            if (this.state.type == "Client") {
                await this.props.addClientApp(this.state.name)
                this.redirect()
            }
            if (this.state.type == "Lambda") {
                if (this.state.language == "Javascript") {
                    await this.props.addServerlessApp(this.state.name, "node")
                    this.redirect()
                }
                if (this.state.language == "C#") {
                    await this.props.addServerlessApp(this.state.name, "dotnet")
                    this.redirect()
                }
            }
        })
    }

    redirect() {
        this.setState({ redirect: true })
    }

    render() {
        const isEnabled =
            this.state.type != undefined &&
            this.state.language != undefined &&
            this.state.name != ''

        if (this.state.redirect) {
            return <Redirect push to={'/Configure/' + this.state.name} />
        }

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
                {this.state.spinner &&
                    <Spinner notice={'...provisioning ' + this.state.name + '...'} />
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.apiApps,
        ...state.clientApps,
        ...state.serverlessApps
    }),
    ({
        ...apiApps.actionCreators,
        ...clientApps.actionCreators,
        ...serverlessApps.actionCreators
    })
)(Provision as any)