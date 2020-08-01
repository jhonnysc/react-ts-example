import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import lodash from 'lodash'

import { Modal } from '@/components/modal'
import { AppState } from '@/store/ducks/types'
import { Creators } from '@/store/ducks/users'
import { Button } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

import { HomeHeader } from './components/header'
import { TableHeader, Sort } from './components/table-header'
import { TableRow } from './components/table-row'
import {
  Container,
  Table,
  TableRows,
  ModalButtons,
  ModalTitle,
  PaginationContainer,
} from './styles'

interface RowCheck {
  [id: string]: boolean
}

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: AppState) => state.User.pagination.items)
  const pagination = useSelector((state: AppState) => state.User.pagination)
  const [checked, setChecked] = useState<boolean>(false)
  const [rowChecked, setRowChecked] = useState<RowCheck>({})
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')

  const handleDeleteSelected = () => {
    setModalTitle('Deseja realmente deletar todos selecionados?')
    setModalIsOpen(true)
  }

  const handleAdd = () => {
    console.log('add')
  }

  const handleSort = (field: string, direction: Sort) => {
    console.log({ field, direction })
  }

  const handleCheckAll = (isChecked: boolean) => {
    setChecked(isChecked)
    setRowChecked(lodash.mapValues(rowChecked, () => isChecked))
  }

  const handleCheckRow = (checked: boolean, id: string) => {
    setRowChecked({ ...rowChecked, [id]: checked })
    setChecked(false)
  }

  useEffect(() => {
    dispatch(Creators.requestUsers())
  }, [dispatch])

  useEffect(() => {
    const usersChecked = {}
    users?.forEach(user => Object.assign(usersChecked, { [user._id]: false }))
    setRowChecked(usersChecked)
  }, [users])

  const handleModalClose = () => {
    setModalIsOpen(false)
  }

  const handleConfirmModal = () => {
    console.log('modal confirmed')
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    console.log(page)
  }

  return (
    <Container>
      {modalIsOpen && (
        <Modal onClose={handleModalClose}>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalButtons>
            <Button
              variant="contained"
              onClick={handleModalClose}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmModal}
              color="primary"
            >
              Confirmar
            </Button>
          </ModalButtons>
        </Modal>
      )}

      <HomeHeader onClick={handleAdd} handleDelete={handleDeleteSelected} />
      <Table>
        <TableHeader
          onSort={handleSort}
          checked={checked}
          handleCheck={handleCheckAll}
        />
        <TableRows>
          {users?.map((user, index) => (
            <TableRow
              key={index}
              age={user.age}
              checked={rowChecked[user._id]}
              dayOfBirth={user.dayOfBirth}
              email={user.email}
              handleCheck={handleCheckRow}
              hobby={user.hobby}
              id={user._id}
              name={user.name}
              sex={user.sex}
            />
          ))}
        </TableRows>
      </Table>
      <PaginationContainer>
        <Pagination
          count={pagination.meta.total_pages}
          page={pagination.meta.current_page}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </Container>
  )
}
