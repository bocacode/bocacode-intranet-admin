import React from 'react'
import { CCol, CRow, CButton } from '@coreui/react'
import NewsCard from 'src/components/news/NewsCard'
import { Link } from 'react-router-dom'

const Articles = () => {
  return (
    <>
      <CRow>
        <CCol xs={12} className="d-flex justify-content-end mb-4">
          <Link to="/news/write">
            <CButton color="primary">Write a story</CButton>
          </Link>
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

export default Articles
