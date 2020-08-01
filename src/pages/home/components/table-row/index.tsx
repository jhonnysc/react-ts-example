import React from 'react'
import { FiTrash, FiEdit } from 'react-icons/fi'

import { Checkbox } from '@material-ui/core'

import { Container, Column, IconsContainer } from './styles'

interface TableRowProps {
  checked: boolean
  handleCheck: (checked: boolean, id: string) => void
  name: string
  email: string
  hobby: string
  dayOfBirth: string
  age: number
  sex: string
  id: string
}

export const TableRow: React.FC<TableRowProps> = ({
  checked,
  handleCheck,
  age,
  dayOfBirth,
  email,
  hobby,
  name,
  sex,
  id,
}) => {
  return (
    <Container>
      <Checkbox
        checked={checked || false}
        onChange={(_, checked) => handleCheck(checked, id)}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Column id="name" flex="1">
        {name}
      </Column>
      <Column id="email" flex="1">
        {email}
      </Column>
      <Column id="hobby" flex="1">
        {hobby}
      </Column>
      <Column id="dayOfBirth" flex="1">
        {new Date(dayOfBirth).toLocaleDateString()}
      </Column>
      <Column id="age" flex="0.5">
        {age}
      </Column>
      <Column id="sex" flex="0.5">
        {sex}
      </Column>
      <IconsContainer>
        <FiEdit color="blue" />
        <FiTrash color="red" />
      </IconsContainer>
    </Container>
  )
}
