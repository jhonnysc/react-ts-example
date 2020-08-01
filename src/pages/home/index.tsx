import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import lodash from 'lodash'

import { AppState } from '@/store/ducks/types'
import { Creators } from '@/store/ducks/users'

import { HomeHeader } from './components/header'
import { TableHeader, Sort } from './components/table-header'
import { TableRow } from './components/table-row'
import { Container, Table, TableRows } from './styles'

interface RowCheck {
  [id: string]: boolean
}

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: AppState) => state.User.pagination.items)
  const [checked, setChecked] = useState<boolean>(false)
  const [rowChecked, setRowChecked] = useState<RowCheck>({})
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

  return (
    <Container>
      <HomeHeader onClick={handleAdd} />
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
    </Container>
  )
}
