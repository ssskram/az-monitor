import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
    currentModule: string
}

const server = require('../../../images/server.png')
const api = require('../../../images/api.png')
const computer = require('../../../images/computer.png')
const micro = require('../../../images/network.png')

const imgStyle = {
    height: '50px'
}

export default class ModuleSelection extends React.Component<props, {}> {

    render() {
        return (
            <div className='text-center'>
                <button
                    onClick={() => this.props.setState({ currentModule: 'appservices' })}
                    className='btn btn-secondary'
                    style={this.props.currentModule == 'appservices' ? { border: '3px solid rgba(75,192,192,1)' } : null}>
                    <img src={server as string} style={imgStyle} className='hidden-xs'></img>
                    <h4 className='oswald-header'>Application services</h4>
                    <div className='hidden-xs'>Computing resources</div>
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'apis' })}
                    className='btn btn-secondary'
                    style={this.props.currentModule == 'apis' ? { border: '3px solid rgba(75,192,192,1)' } : null}>
                    <img src={api as string} style={imgStyle} className='hidden-xs'></img>
                    <h4 className='oswald-header'>Interfaces</h4>
                    <div className='hidden-xs'>Middlemen & gatekeepers</div>
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'clientapps' })}
                    className='btn btn-secondary'
                    style={this.props.currentModule == 'clientapps' ? { border: '3px solid rgba(75,192,192,1)' } : null}>
                    <img src={computer as string} style={imgStyle} className='hidden-xs'></img>
                    <h4 className='oswald-header'>Client apps</h4>
                    <div className='hidden-xs'>UI & business logic</div>
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'serverless' })}
                    className='btn btn-secondary'
                    style={this.props.currentModule == 'serverless' ? { border: '3px solid rgba(75,192,192,1)' } : null}>
                    <img src={micro as string} style={imgStyle} className='hidden-xs'></img>
                    <h4 className='oswald-header'>Serverless</h4>
                    <div className='hidden-xs'><s>Everything else</s></div>
                    <div className='script hidden-xs'>Microservices</div>
                </button>
            </div>
        )
    }
}