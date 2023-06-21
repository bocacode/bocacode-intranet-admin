import * as React from 'react'
import { UserContext } from 'src/App'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

const AddUser = () => {
  const { user } = React.useContext(UserContext)
  const [form, setForm] = React.useState({})
  // const [validation, setValidation] = React.useState(false)
  const navigate = useNavigate()

  const handleFormUpdate = (e) => {
    // if (form.email.includes('@')) {
    //   setValidation(true)
    // }
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`, // notice the Bearer before your token
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) {
          e.preventDefault()
        } else {
          e.preventDefault()
          navigate('/users')
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add User</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Place one add-on or button on either side of an input. You may also place one on both
              sides of an input. Remember to place <code>&lt;CFormLabel&gt;</code>s outside the
              input group.
            </p>
            <CForm href="forms/input-group">
              <CInputGroup className="mb-3">
                <CInputGroupText id="email">Email</CInputGroupText>
                <CFormInput
                  // valid={validation ?? true}
                  // invalid={!validation ?? true}
                  required
                  type="email"
                  feedback="Email Required !"
                  onChange={handleFormUpdate}
                  name="email"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="email"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="first_name">First Name</CInputGroupText>
                <CFormInput
                  required
                  onChange={handleFormUpdate}
                  name="first_name"
                  placeholder="First Name"
                  aria-label="First Name"
                  aria-describedby="first_name"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="last_name">Last Name</CInputGroupText>
                <CFormInput
                  required
                  onChange={handleFormUpdate}
                  name="last_name"
                  placeholder="Last Name"
                  aria-label="Last Name"
                  aria-describedby="last_name"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="password">Password</CInputGroupText>
                <CFormInput
                  required
                  type="password"
                  onChange={handleFormUpdate}
                  name="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="password"
                />
              </CInputGroup>
              <CButton onClick={handleFormSubmit} color="primary" className="px-4" type="submit">
                Add User
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddUser
