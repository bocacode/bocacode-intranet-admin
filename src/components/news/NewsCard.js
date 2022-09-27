import React from 'react'
import { CCard, CCardHeader, CCardBody, CCardText, CButton } from '@coreui/react'

const NewsCard = () => {
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Story one</strong>
        <div>
          <CButton color="link">Disable</CButton>
          <CButton color="link">Edit</CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          Some quick example text to build on the card title and make up the bulk of the card&apos;s
          content. Some quick example text to build on the card title and make up the bulk of the
          card&apos;s content. Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </CCardText>
      </CCardBody>
    </CCard>
  )
}

export default NewsCard
