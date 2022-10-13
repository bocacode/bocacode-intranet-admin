import React, { useState } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CButton,
  CCardHeader,
  CCardBody,
  CFormTextarea,
  CFormInput,
} from '@coreui/react'
import { FirestorePostNews } from 'src/utils/firebaseUtils'

const WriteArticle = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = () => {
    FirestorePostNews({ body, title }).then((id) => {
      console.log('docId', id)
      setTitle('')
      setBody('')
    })
  }

  return (
    <CRow>
      <CCol className="d-flex flex-column gap-3 h-100">
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Write</strong>
            <CButton color="primary" onClick={handleSubmit}>
              Save
            </CButton>
          </CCardHeader>
        </CCard>
        <CCard className="flex-grow-1">
          <CCardBody>
            <CFormInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-3"
              required
              placeholder="Title here"
              type="text"
            />
            <CFormTextarea
              required
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Write here"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></CFormTextarea>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WriteArticle
