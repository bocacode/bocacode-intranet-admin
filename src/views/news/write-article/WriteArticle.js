import React, { useState, useEffect } from 'react'
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
import {
  FirestoreGetOneNews,
  FirestorePostNews,
  FirestoreUpdateOneNews,
} from 'src/utils/firebaseUtils'
import { useSearchParams } from 'react-router-dom'
import { RichTextEditor } from 'src/components/news/richtexteditor'

const WriteArticle = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [news, setNews] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const [content, setContent] = useState({})

  const handleSubmit = () => {
    if (!isUpdating) {
      FirestorePostNews({ body: news.body, title: news.title }).then((docId) => {
        console.log('docId', docId)
        setNews(null)
      })
    } else {
      FirestoreUpdateOneNews(news).then(() => {
        setNews(null)
        setSearchParams({ id: '' })
      })
    }
  }

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setNews(null)
      FirestoreGetOneNews(id)
        .then((value) => {
          if (value) {
            setIsUpdating(true)
            setNews(value)
          } else {
            setIsUpdating(false)
          }
        })
        .catch((err) => {
          console.error(err)
          setIsUpdating(false)
        })
    } else {
      setIsUpdating(false)
    }
  }, [searchParams])

  return (
    <CRow>
      <CCol className="d-flex flex-column gap-3 h-100">
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Write</strong>
            <CButton color="primary" onClick={handleSubmit}>
              {isUpdating ? 'Update' : 'Save'}
            </CButton>
          </CCardHeader>
        </CCard>
        <RichTextEditor setContent={setContent} />
        <CCard className="flex-grow-1">
          <CCardBody>
            <CFormInput
              value={news?.title}
              onChange={(e) => setNews({ ...news, title: e.target.value })}
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
              value={news?.body}
              onChange={(e) => setNews({ ...news, body: e.target.value })}
            ></CFormTextarea>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WriteArticle
