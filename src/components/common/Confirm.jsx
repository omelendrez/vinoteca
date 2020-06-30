import React from 'react'
import Modal from './Modal'

const Confirm = ({ isActive, close, title, message, handleOk }) => (
  <Modal
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
  </Modal>
)

export default Confirm