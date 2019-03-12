import * as React from 'react'
import { Link } from 'react-router-dom'
import * as types from '../../store/types'
import Deployments from '../metrics/markup/deployments'
import Requests from '../metrics/markup/requests'
import FourHundo from '../metrics/markup/fourHundo'
import FiveHundo from '../metrics/markup/fiveHundo'
import getSource from '../manage/configure/functions/getSource'

type props = {
    type: string
    application: types.application
}

type state = {
    showDeployments: boolean
    source: { repo: string, branch: string }
}

export default class ApplicationCard extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            showDeployments: false,
            source: undefined
        }
    }

    async componentDidMount() {
        this.setState({
            source: await getSource(this.props.application)
        })
    }

    render() {
        const {
            application
        } = this.props

        return (
            <div className='panel'>
                <div className='panel-body'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <h4 className='oswald-header'>{application.name}</h4>
                            <div><b>Status</b></div>
                            <div className='ubuntu' style={application.status == "Running" ? { color: 'green' } : { color: 'red' }}><b>{application.status}</b></div>
                            <div><b>Resource group</b></div>
                            <div className='ubuntu'>{application.resourceGroup}</div>
                        </div>
                        <div className='col-md-9 ubuntu' style={{ marginBottom: '25px' }}>
                            <div className='row'>
                                {(this.props.type == 'api' || this.props.type == 'client') &&
                                    <div className='col-md-12'>
                                        <div onClick={() => window.open(this.props.type == 'api' ? 'https://' + application.url + '/docs' : "https://" + application.url, '_blank')} style={{ width: '100%', borderRadius: '0px' }} className='btn btn-secondary' >{this.props.type == 'api' ? "View documentation" : "View site"}</div>
                                    </div>
                                }
                                {(this.state.source && this.state.source.repo) &&
                                    <div className='col-md-12'>
                                        <div onClick={() => window.open(this.state.source.repo, '_blank')} style={{ width: '100%', borderRadius: '0px' }} className='btn btn-secondary' >View source code</div>
                                    </div>
                                }
                                <div className='col-md-12'>
                                    <div style={{ width: '100%', borderRadius: '0px' }} onClick={() => this.setState({ showDeployments: !this.state.showDeployments })} className='btn btn-secondary'>{this.state.showDeployments ? 'Hide deployments' : 'Show deployments'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {this.state.showDeployments &&
                            <Deployments
                                application={application}
                            />
                        }
                    </div>
                    <div className='row' style={{ marginTop: '15px' }}>
                        <div className='col-md-4 text-center'>
                            <Requests
                                application={application}
                            />
                        </div>
                        <div className='col-md-4 text-center'>
                            <FiveHundo
                                application={application}
                            />
                        </div>
                        <div className='col-md-4 text-center'>
                            <FourHundo
                                application={application}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}