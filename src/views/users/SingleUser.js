import * as React from 'react'
import { useLocation } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CFormCheck,
} from '@coreui/react'
import { DocsExample } from 'src/components'

import { UserContext } from 'src/App'

const SingleUser = () => {
  const { user } = React.useContext(UserContext)
  const [form, setForm] = React.useState({})
  const [logs, setLogs] = React.useState([])
  const { state } = useLocation()

  const id = state

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/user?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`, // notice the Bearer before your token
      },
    })
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error(err))
  }, [id, user.accessToken])

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/logs/log?email=${form.email}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`, // notice the Bearer before your token
      },
    })
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err))
  }, [user.accessToken])

  const handleFormUpdate = (e) => {
    console.log(e.target.name)
    setForm({ ...form, [e.target.name]: e.target.value })

    if (e.target.name === 'active') {
      setForm({ ...form, [e.target.name]: e.target.checked })
    }
  }

  const handleFormSubmit = (e) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/update`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`, // notice the Bearer before your token
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        window.location.reload(false)
        return res.json()
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit User</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                Place one add-on or button on either side of an input. You may also place one on
                both sides of an input. Remember to place <code>&lt;CFormLabel&gt;</code>s outside
                the input group.
              </p>
              <DocsExample href="forms/input-group">
                <CInputGroup className="mb-3">
                  <CInputGroupText id="basic-addon1">Email</CInputGroupText>
                  <CFormInput
                    onChange={handleFormUpdate}
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    value={form.email}
                    disabled
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="basic-addon1">First Name</CInputGroupText>
                  <CFormInput
                    onChange={handleFormUpdate}
                    name="first_name"
                    placeholder="First Name"
                    aria-label="First Name"
                    aria-describedby="basic-addon1"
                    value={form.first_name}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="basic-addon1">Last Name</CInputGroupText>
                  <CFormInput
                    onChange={handleFormUpdate}
                    name="last_name"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    aria-describedby="basic-addon1"
                    value={form.last_name}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="basic-addon1">Access</CInputGroupText>
                  <CFormSelect
                    onChange={handleFormUpdate}
                    options={[
                      { value: 0, label: '0' },
                      { value: 10, label: '10' },
                    ]}
                    name="access_level"
                    placeholder="Access"
                    aria-label="Access"
                    aria-describedby="basic-addon1"
                    value={form.access_level}
                  >
                    <option value={0}> 0</option>
                    <option value={10}> 10</option>
                  </CFormSelect>

                  <CInputGroup className="my-3">
                    <CFormCheck
                      type="checkbox"
                      label="Active"
                      onChange={handleFormUpdate}
                      name="active"
                      placeholder="Active"
                      aria-label="Active"
                      aria-describedby="Active"
                      checked={form.active}
                    />
                  </CInputGroup>
                </CInputGroup>
                <CButton onClick={handleFormSubmit} color="primary" className="px-4">
                  Update User
                </CButton>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

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
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Model</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Updated at</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Updated by</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {logs?.map((item) => {
                      return (
                        <CTableRow key={item._id}>
                          <CTableDataCell>{item.user_id}</CTableDataCell>
                          <CTableDataCell>{item.model}</CTableDataCell>
                          <CTableDataCell>{item.event_type}</CTableDataCell>
                          <CTableDataCell>{item.createdAt}</CTableDataCell>
                          <CTableDataCell>{item.updated_by}</CTableDataCell>
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
    </>
  )
}

export default SingleUser
