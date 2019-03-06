import * as React from 'react'
import * as types from '../../store/types'
import Deployments from '../metrics/markup/deployments'
import Requests from '../metrics/markup/requests'
import FourHundo from '../metrics/markup/fourHundo'
import FiveHundo from '../metrics/markup/fiveHundo'

type props = {
    type: string
    application: types.application
}

export default class ApplicationCard extends React.Component<props, {}> {

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
                                <div className='col-md-12'>
                                    <div className='pull-right'>
                                        <a href={this.props.type == 'api' ? 'https://' + application.url + '/docs' : "https://" + application.url} target='_blank'>{this.props.type == 'api' ? application.url + '/docs' : application.url}</a>
                                    </div>
                                    <div className='pull-left'>
                                        <b>Deployments</b>
                                    </div>
                                </div>
                            </div>
                            <Deployments
                                application={application}
                            />
                        </div>
                    </div>
                    <div className='row'>
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