import React from 'react'
import { FiX } from 'react-icons/fi'

import { Container, ModalContainer, IconsContainer } from './styles'

interface ModalProps {
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const handleClose = (
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event) event.stopPropagation()
    onClose()
  }

  return (
    <Container onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <IconsContainer>
          <FiX cursor="pointer" onClick={() => handleClose()} />
        </IconsContainer>
        {children}
      </ModalContainer>
    </Container>
  )
}
