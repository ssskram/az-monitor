import * as React from 'react'
import Modal from 'react-responsive-modal'

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
                <div>Here</div>
            </Modal>
        )
    }
}