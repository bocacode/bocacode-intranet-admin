import React, { useState, useEffect } from 'react'
import { CCol, CRow, CCard, CButton, CCardHeader, CForm } from '@coreui/react'
import {
  FirestoreGetOneNews,
  FirestorePostNews,
  FirestoreUpdateOneNews,
} from 'src/utils/firebaseUtils'
import { useSearchParams } from 'react-router-dom'

const WriteArticle = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [news, setNews] = useState()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSubmit = (e) => {
    console.log(news)
    e.preventDefault()
    if (!news.title) {
      return false
    }

    if (!isUpdating) {
      FirestorePostNews(news).then((docId) => {
        console.log('docId', docId)
        setNews(null)
      })
    } else {
      FirestoreUpdateOneNews(news).then(() => {
        setSearchParams({ id: '' })
      })
    }
  }

  const handleTitleChange = (title) => {
    setNews({ ...news, title: title })
  }

  const handleContentChange = (content) => {
    const preview = content.blocks.filter((block) => {
      return block.type === 'unstyled' && block.text.length !== 0
    })

    const thumbnailPreview = (preview[0]?.text + ' ' + preview[1]?.text).substring(0, 250) + '...'

    setNews({ ...news, body: thumbnailPreview, data: content })
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
      <CCol>
        <CForm onSubmit={handleSubmit} className="d-flex flex-column gap-3 h-100">
          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Write</strong>
              <CButton type="submit" style={{ pointerEvents: 'auto' }} color="primary">
                {isUpdating ? 'Update' : 'Save'}
              </CButton>
            </CCardHeader>
          </CCard>
          {/* <CCard className="flex-grow-1">
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
          </CCard> */}
        </CForm>
      </CCol>
    </CRow>
  )
}

export default WriteArticle
