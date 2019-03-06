import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as serverlessApps from '../../../store/serverlessApps'
import * as types from '../../../store/types'
import ApplicationCard from '../../shared/applicationCard'
import Paging from '../../utilities/paging'
import Filter from '../../filter'
import NavButtons from '../../serviceTypeSelection'
import HydrateStore from '../../utilities/hydrateStore'

type props = {
    serverlessApps: types.application[]
}

type state = {
    currentPage: number
    serverlessApps: any
}

export class ServerlessApplications extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            serverlessApps: props.serverlessApps
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillReceiveProps(nextProps: props) {
        this.setState({ serverlessApps: nextProps.serverlessApps })
    }

    filter(appName) {
        if (appName) {
            this.setState({
                currentPage: 1,
                serverlessApps: this.props.serverlessApps.filter(app => app.name == appName)
            })
        } else this.setState({ serverlessApps: this.props.serverlessApps })
    }

    render() {

        // Logic for paging
        const indexOfLastItem = this.state.currentPage * 5
        const indexOfFirstItem = indexOfLastItem - 5;
        const currentItems = this.state.serverlessApps.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item, index) => {
            return <ApplicationCard key={index} application={item} type='lambda' />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(this.state.serverlessApps.length / 5); i++) {
            pageNumbers.push(i);
        }

        return <div className='col-md-10 col-md-offset-1'>
            <HydrateStore />
            <NavButtons
                currentModule='serverless'
            />
            <Filter
                filter={this.filter.bind(this)}
                applications={this.props.serverlessApps}
            />
            {renderItems}
            <Paging
                countItems={this.state.serverlessApps}
                currentPage={this.state.currentPage}
                totalPages={pageNumbers}
                next={() => this.setState({ currentPage: this.state.currentPage + 1 })}
                prev={() => this.setState({ currentPage: this.state.currentPage - 1 })}
            />
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.serverlessApps
    }),
    ({
        ...serverlessApps.actionCreators
    })
)(ServerlessApplications as any)