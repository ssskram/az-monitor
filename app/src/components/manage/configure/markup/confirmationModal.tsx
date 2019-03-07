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
                    <Cat size={220} mood="excited" color="#596881" />
                    <h2 className='oswald-header'>Success!</h2>
                    <h4>Now just sync your code from Github,<br />and add any additional environment variables.</h4>
                </div>
            </Modal>
        )
    }
}