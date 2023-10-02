import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

const CustomModal = ({ isOpen, title, onClose, children, size }) => {
    return (
        <Modal backdrop='opaque' size={size} isOpen={isOpen} onClose={onClose} isDismissable={false}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col py-2 gap-1">{title}</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}

export default CustomModal