import * as React from 'react'
import { NavLink } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CNavLink,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

import { UserContext } from 'src/App'

const Tables = () => {
  const { user } = React.useContext(UserContext)
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`, // notice the Bearer before your token
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Users</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/table">
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Access Level</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Updated At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created by</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users?.map((item) => {
                    return (
                      <CTableRow key={item.uid}>
                        <CNavLink to="/users/user?id=64261b6c9e8dc646372b29b3" component={NavLink}>
                          <CTableHeaderCell scope="row">{item._id}</CTableHeaderCell>
                        </CNavLink>
                        <CTableDataCell>{item.first_name}</CTableDataCell>
                        <CTableDataCell>{item.last_name}</CTableDataCell>
                        <CTableDataCell>{item.status}</CTableDataCell>
                        <CTableDataCell>{item.access_level}</CTableDataCell>
                        <CTableDataCell>{item.updatedAt}</CTableDataCell>
                        <CTableDataCell>{item.created_by}</CTableDataCell>
                        <CTableDataCell>{item.createdAt}</CTableDataCell>
                        <CTableDataCell>
                          <img src={item.photo_url} alt="" srcSet="" style={{ width: '200px' }} />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
