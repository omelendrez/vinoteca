import React from 'react'
import Modal from './Modal'

const Confirm = ({ isActive, close, title, message, handleOk, hasCancel }) => (
  <Modal
    isActive={isActive}
    title={title}
    close={close}
    confirmText="Confirm"
    cancelText="Cancel"
  >
    <section className="modal-card-body has-text-black">
      {message}
    </section>
  </Modal>
)

export default Confirm