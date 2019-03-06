import * as React from 'react'
import * as types from '../../../../store/types'
import CPU from '../../../metrics/markup/cpu'
import Memory from '../../../metrics/markup/memory'

type props = {
    appService: types.appService
}

export default class AppServices extends React.Component<props, any> {

    render() {
        const {
            appService
        } = this.props

        return (
            <div className='panel'>
                <div className='panel-body'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <h4 className='oswald-header'>{appService.name}</h4>
                            <div><b>Status</b></div>
                            <div className='ubuntu' style={appService.status == "Ready" ? { color: 'green' } : { color: 'red' }}><b>{appService.status}</b></div>
                            <div><b>Size</b></div>
                            <div className='ubuntu'>{appService.size}</div>
                            <div><b>Instances</b></div>
                            <div className='ubuntu'>{appService.countInstances}</div>
                            <div><b>Servicing</b></div>
                            <div className='ubuntu'>{appService.services.type} - {appService.countServices}</div>
                        </div>
                        <div className='col-md-5'>
                            <CPU
                                appService={this.props.appService}
                            />
                        </div>
                        <div className='col-md-5'>
                            <Memory
                                appService={this.props.appService}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}