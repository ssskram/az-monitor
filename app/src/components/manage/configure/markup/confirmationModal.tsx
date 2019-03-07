import * as React from 'react'
import Modal from 'react-responsive-modal'
import { Cat } from 'react-kawaii'

type props = {
    setState: (stateObj: object) => void
}

export default class ProvisionConfirmation extends React.Component<props, {}> {

    render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.setState({ confirmationModal: false })}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                showCloseIcon={true}
                center>
                <div className='text-center'>
                    <h3>Success!</h3>
                    <Cat size={220} mood="excited" color="#596881" />
                </div>
            </Modal>
        )
    }
}