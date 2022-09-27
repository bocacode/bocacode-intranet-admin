import React from 'react'
import { CCol, CRow, CButton, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import NewsCard from 'src/components/news/NewsCard'

const Articles = () => {
  return (
    <>
      <CRow>
        <CCol xs="auto" className="mb-4 w-100">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <CCol xs="auto">
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput placeholder="Search" />
              </CInputGroup>
            </CCol>
            <CCol xs="auto">
              <Link to="/news/write">
                <CButton color="primary">New article</CButton>
              </Link>
            </CCol>
          </div>
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
