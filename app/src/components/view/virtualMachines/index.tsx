import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as virtualMachines from '../../../store/virtualMachines'
import * as types from '../../../store/types'
import ServerCard from './markup/serverCard'
import Paging from '../../utilities/paging'
import NavButtons from '../../serviceTypeSelection'
import HydrateStore from '../../utilities/hydrateStore'

type props = {
    virtualMachines: types.virtualMachine[]
}

type state = {
    currentPage: number
    virtualMachines: any
}

export class VirtualMachines extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            currentPage: 1,
            virtualMachines: props.virtualMachines
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillReceiveProps(nextProps: props) {
        this.setState({ virtualMachines: nextProps.virtualMachines })
    }

    render() {

        // Logic for paging
        const indexOfLastItem = this.state.currentPage * 5
        const indexOfFirstItem = indexOfLastItem - 5;
        const currentItems = this.state.virtualMachines.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item, index) => {
            return <ServerCard key={index} virtualMachine={item} />
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(this.state.virtualMachines.length / 5); i++) {
            pageNumbers.push(i);
        }

        return <div className='col-md-10 col-md-offset-1'>
            <HydrateStore />
            <NavButtons
                currentModule='virtualMachines'
            />
            {renderItems}
            <Paging
                countItems={this.state.virtualMachines}
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
        ...state.virtualMachines
    }),
    ({
        ...virtualMachines.actionCreators
    })
)(VirtualMachines as any)