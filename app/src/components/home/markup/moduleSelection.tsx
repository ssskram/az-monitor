import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
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
            <div className='row'>
                <button
                    onClick={() => this.props.setState({ currentModule: 'appservices' })}
                    className='btn btn-secondary'>
                    <img src={server as string} style={imgStyle}></img>
                    <h4 className='oswald-header'>Application services</h4>
                    <div>The computing resources</div>
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'apis' })}
                    className='btn btn-secondary'>
                    <img src={api as string} style={imgStyle}></img>
                    <h4 className='oswald-header'>Interfaces</h4>
                    <div>The middlemen.  The body guards</div>
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'clientapps' })}
                    className='btn btn-secondary'>
                    <img src={computer as string} style={imgStyle}></img>
                    <h4 className='oswald-header'>Client apps</h4>
                    <div>The UI and business logic</div>
                </button>
                <button
                    onClick={() => this.props.setState({ currentModule: 'serverless' })}
                    className='btn btn-secondary'>
                    <img src={micro as string} style={imgStyle}></img>
                    <h4 className='oswald-header'>Serverless</h4>
                    <div><s>Everything else</s></div>
                    <div className='script'>Microservices</div>
                </button>
            </div>
        )
    }
}