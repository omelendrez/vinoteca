import React from 'react'
import ConfirmModal from './ConfirmModal'

const Confirm = ({ isActive, close, title, message, handleOk, okText, cancelText }) => (
  <ConfirmModal
    isActive={isActive}
    title={title}
    close={close}
    confirmText={okText || "Eliminar"}
    cancelText={cancelText || "Cancelar"}
    handleOk={handleOk}
  >
    <section className="modal-card-body has-text-black">
      {message}
    </section>
  </ConfirmModal>
)

export default Confirm