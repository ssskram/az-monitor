import * as React from 'react'
import * as types from '../../../store/types'
import getDeployments from '../functions/getDeployments'
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
    mounted = false
    constructor(props) {
        super(props)
        this.state = {
            deployments: undefined
        }
    }

    componentDidMount() {
        this.mounted = true
        this.getDeployments(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.application.name != this.props.application.name) {
            this.setState({ deployments: undefined })
        }
        if (this.mounted) {
            this.getDeployments(nextProps)
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    async getDeployments(props) {
        const deployments = await getDeployments(props.application.resourceGroup, props.application.name)
        if (this.mounted) {
            this.setState({
                deployments: deployments
            })
        }
    }

    render() {
        return (
            <div className='col-md-12' style={{ margin: '15px 0px' }}>
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
            </div>
        )
    }
}