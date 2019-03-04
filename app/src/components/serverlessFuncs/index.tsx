import * as React from 'react'
import * as types from '../../store/types'
import ApplicationCard from '../shared/applicationCard'
import Paging from '../utilities/paging'

type props = {
    serverlessApps: types.application[]
}

type state = {
    currentPage: number
    items: any
}

export default class ServerlessApplications extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            items: undefined
        }
    }

    render() {

        // Logic for paging
        const indexOfLastItem = this.state.currentPage * 10
        const indexOfFirstItem = indexOfLastItem - 10;
        const currentItems = this.props.serverlessApps.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item, index) => {
            return <ApplicationCard key={index} application={item} />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(this.props.serverlessApps.length / 10); i++) {
            pageNumbers.push(i);
        }

        return <div>
            {renderItems}
            <Paging
                countItems={this.props.serverlessApps}
                currentPage={this.state.currentPage}
                totalPages={pageNumbers}
                next={() => this.setState({ currentPage: this.state.currentPage + 1 })}
                prev={() => this.setState({ currentPage: this.state.currentPage - 1 })}
            />
        </div>
    }
}