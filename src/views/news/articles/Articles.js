import React, { useEffect, useState } from 'react'
import { CCol, CRow, CButton, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import NewsCard from 'src/components/news/NewsCard'
import { firestore } from 'src/firebaseConfig'
import { onSnapshot, query, collection } from 'firebase/firestore'

const Articles = () => {
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'news')), (snapshot) => {
      const data = []
      snapshot.forEach((doc) => {
        const id = doc.id
        return data.push({ ...doc.data(), id })
      })
      setNewsList(data)
    })
    return () => unsubscribe()
  }, [])
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
      <CRow className="d-flex flex-column gap-3">
        {newsList &&
          newsList.map((news) => (
            <CCol key={news.id}>
              <NewsCard news={news} />
            </CCol>
          ))}
      </CRow>
    </>
  )
}

export default Articles
