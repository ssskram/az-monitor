import * as React from 'react'
import * as types from '../../store/types'
import getDeployments from './functions/getDeployments'
import ReactTable from "react-table"
import "react-table/react-table.css"

type props = {
    application: types.application
}

type state = {
    deployments: types.deployment[]
}

const columns = [{
    Header: 'Active',
    accessor: 'active',
    Cell: props => {
        if (props.original.active) {
            return <span className='glyphicon glyphicon-ok text-center' style={{ color: 'green' }}></span>
        } else {
            return null
        }
    }
}, {
    Header: 'Date',
    accessor: 'completed'
}, {
    Header: 'Author',
    accessor: 'author'
}, {
    Header: 'Commit',
    accessor: 'message'
}]

export default class Deployments extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            deployments: undefined
        }
    }

    async componentDidMount() {
        this.setState({
            deployments: await getDeployments(this.props.application.resourceGroup, this.props.application.name)
        })
    }

    render() {
        return (
            <ReactTable
                data={this.state.deployments}
                columns={columns}
                loading={false}
                minRows={3}
                pageSize={3}
                showPageJump={false}
                showPageSizeOptions={false}
                noDataText='...loading deployment history...'
            />
        )
    }
}