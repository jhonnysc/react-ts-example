import React from 'react'

import { Button } from '@material-ui/core'

import { Container, HeaderTitle, HeaderButtons, Spacer } from './styles'

export interface HomeHeaderProps {
  onClick: () => void
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onClick }) => {
  return (
    <>
      <Container>
        <HeaderTitle>Gerenciar Desenvolvedores</HeaderTitle>
        <HeaderButtons>
          <Button variant="contained" color="primary" onClick={onClick}>
            Adicionar Developer
          </Button>
        </HeaderButtons>
      </Container>
      <Spacer />
    </>
  )
}
