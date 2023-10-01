import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

const CustomModal = ({ isOpen, title, onClose, children }) => {
    return (
        <Modal backdrop='opaque' isOpen={isOpen} onClose={onClose} isDismissable={false}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}

export default CustomModal