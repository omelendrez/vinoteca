import React from 'react'
import ConfirmModal from './ConfirmModal'

const Confirm = ({ isActive, close, title, message, handleOk, okText, cancelText, isLoading, bgColor }) => (
  <ConfirmModal
    isActive={isActive}
    title={title}
    close={close}
    confirmText={okText || "Eliminar"}
    cancelText={cancelText}
    handleOk={handleOk}
    isLoading={isLoading}
    bgColor={bgColor}
  >
    <section className="modal-card-body has-text-black">
      {message}
    </section>
  </ConfirmModal>
)

export default Confirm