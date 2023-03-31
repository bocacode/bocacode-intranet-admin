import * as React from 'react'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

import { UserContext } from 'src/App'

const SingleUser = () => {
  const { user } = React.useContext(UserContext)
  const [form, setForm] = React.useState({})
  const params = useParams()

  console.log(params.id)

  const handleFormUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`, // notice the Bearer before your token
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Restaurant</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Place one add-on or button on either side of an input. You may also place one on both
              sides of an input. Remember to place <code>&lt;CFormLabel&gt;</code>s outside the
              input group.
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
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1">Password</CInputGroupText>
                <CFormInput
                  onChange={handleFormUpdate}
                  name="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </CInputGroup>
              <CButton onClick={handleFormSubmit} color="primary" className="px-4">
                Add User
              </CButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SingleUser
