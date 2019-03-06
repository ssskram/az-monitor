import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as clientApps from '../../../store/clientApps'
import * as types from '../../../store/types'
import ApplicationCard from '../../shared/applicationCard'
import Paging from '../../utilities/paging'
import Filter from '../../filter'
import NavButtons from '../../serviceTypeSelection'
import HydrateStore from '../../utilities/hydrateStore'

type props = {
    clientApps: types.application[]
}

type state = {
    currentPage: number
    clientApps: any
}

export class ClientApplications extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            clientApps: props.clientApps
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({ clientApps: nextProps.clientApps }) 
    }

    filter(appName) {
        if (appName) {
            this.setState({
                currentPage: 1,
                clientApps: this.props.clientApps.filter(app => app.name == appName)
            })
        } else this.setState({ clientApps: this.props.clientApps })
    }

    render() {

        // Logic for paging
        const indexOfLastItem = this.state.currentPage * 5
        const indexOfFirstItem = indexOfLastItem - 5;
        const currentItems = this.state.clientApps.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item, index) => {
            return <ApplicationCard key={index} application={item} type='client' />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(this.state.clientApps.length / 5); i++) {
            pageNumbers.push(i);
        }

        return <div>
            <HydrateStore />
            <NavButtons
                currentModule='clientapps'
            />
            <Filter
                filter={this.filter.bind(this)}
                applications={this.props.clientApps}
            />
            {renderItems}
            <Paging
                countItems={this.state.clientApps}
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
        ...state.clientApps
    }),
    ({
        ...clientApps.actionCreators
    })
)(ClientApplications as any)