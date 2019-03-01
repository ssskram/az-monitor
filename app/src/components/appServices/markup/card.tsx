import * as React from 'react'
import * as types from '../../../store/types'

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
                    <h4 className='oswald-header'>{appService.name}</h4>
                    <div><b>Status </b> <span style={appService.status == "Ready" ? { color: 'green' } : { color: 'red' }}><b>{appService.status}</b></span></div>
                    <div><b>Size</b> {appService.size}</div>
                    <div><b>Instances</b> {appService.countInstances}</div>
                    <div><b>Resource group</b> {appService.resourceGroup}</div>
                    <div><b>Servicing</b> {appService.services.type} ({appService.countServices})</div>
                </div>
            </div>
        )
    }
}