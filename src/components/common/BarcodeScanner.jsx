import React from 'react'
import Modal from './Modal'
import Scanner from './Scanner'

const BarcodeScanner = ({ show, codeRead }) => {
  return (
    <Modal isActive={show}>
      <Scanner codeRead={codeRead} />
    </Modal>
  )
}

export default BarcodeScanner
