import React from 'react'
import ConfirmModal from './ConfirmModal'

const Confirm = ({ isActive, close, title, message, handleOk, okText, cancelText, isLoading }) => (
  <ConfirmModal
    isActive={isActive}
    title={title}
    close={close}
    confirmText={okText || "Eliminar"}
    cancelText={cancelText || "Cancelar"}
    handleOk={handleOk}
    isLoading={isLoading}
  >
    <section className="modal-card-body has-text-black">
      {message}
    </section>
  </ConfirmModal>
)

export default Confirm