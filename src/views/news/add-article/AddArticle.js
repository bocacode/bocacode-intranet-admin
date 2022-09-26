import React from 'react'
import { CCard, CCol, CRow, CButton } from '@coreui/react'
import NewsCard from 'src/components/news/NewsCard'

const AddArticle = () => {
  return (
    <>
      <CRow>
        <CCol xs={12} className="d-flex justify-content-end mb-4">
          <CButton color="primary">Write a story</CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} className="d-flex flex-column gap-3">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </CCol>
      </CRow>
    </>
  )
}

export default AddArticle
