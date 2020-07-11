import React from 'react'
import ConfirmModal from './ConfirmModal'

const Confirm = ({ isActive, close, title, message, handleOk }) => (
  <ConfirmModal
    isActive={isActive}
    title={title}
    close={close}
    confirmText="Eliminar"
    cancelText="Cancelar"
    handleOk={handleOk}
  >
    <section className="modal-card-body has-text-black">
      {message}
    </section>
  </ConfirmModal>
)

export default Confirm