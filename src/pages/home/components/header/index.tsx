import React from 'react'

import { Button } from '@material-ui/core'

import { Container, HeaderTitle, HeaderButtons, Spacer } from './styles'

export interface HomeHeaderProps {
  onClick: () => void
  handleDelete?: () => void
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onClick,
  handleDelete,
}) => {
  return (
    <>
      <Container>
        <HeaderTitle>Gerenciar Desenvolvedores</HeaderTitle>
        <HeaderButtons>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Deletar Selecionados
          </Button>
          <Button variant="contained" color="primary" onClick={onClick}>
            Adicionar Desenvolvedor
          </Button>
        </HeaderButtons>
      </Container>
      <Spacer />
    </>
  )
}
