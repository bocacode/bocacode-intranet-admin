import React from 'react'
import { CCol, CRow, CCard, CButton, CCardHeader, CCardBody, CFormTextarea } from '@coreui/react'

const WriteArticle = () => {
  return (
    <CRow>
      <CCol className="d-flex flex-column gap-3 h-100">
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Write</strong>
            <CButton color="primary">Save</CButton>
          </CCardHeader>
        </CCard>
        <CCard className="flex-grow-1">
          <CCardBody>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Write here"
            ></CFormTextarea>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WriteArticle
