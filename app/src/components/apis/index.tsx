import * as React from 'react'
import * as types from '../../store/types'
import ApplicationCard from '../shared/applicationCard'
import Paging from '../utilities/paging'
import Filter from '../filter'

type props = {
    apiApps: types.application[]
}

type state = {
    currentPage: number
    apiApps: types.application[]
}

export default class APIs extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            apiApps: props.apiApps
        }
    }

    componentWillReceiveProps(nextProps) { this.setState({ apiApps: nextProps.apiApps }) }
    filter(appName) {
        if (appName) {
            this.setState({ 
                currentPage: 1,
                apiApps: this.props.apiApps.filter(app => app.name == appName) 
            })
        } else this.setState({ apiApps: this.props.apiApps })
    }

    render() {

        // Logic for paging
        const indexOfLastItem = this.state.currentPage * 10
        const indexOfFirstItem = indexOfLastItem - 10;
        const currentItems = this.state.apiApps.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item, index) => {
            return <ApplicationCard key={index} application={item} type='api' />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(this.state.apiApps.length / 10); i++) {
            pageNumbers.push(i);
        }

        return <div>
            <Filter
                applications={this.state.apiApps}
                filter={this.filter.bind(this)}
            />
            {renderItems}
            <Paging
                countItems={this.state.apiApps}
                currentPage={this.state.currentPage}
                totalPages={pageNumbers}
                next={() => this.setState({ currentPage: this.state.currentPage + 1 })}
                prev={() => this.setState({ currentPage: this.state.currentPage - 1 })}
            />
        </div>
    }
}