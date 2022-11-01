import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CButton,
  CCardHeader,
  CForm,
  CCardBody,
  CFormInput,
} from '@coreui/react'
import {
  FirestoreGetOneNews,
  FirestorePostNews,
  FirestoreUpdateOneNews,
} from 'src/utils/firebaseUtils'
import { useSearchParams } from 'react-router-dom'
import Editor from 'src/components/news/editor/Editor'

const WriteArticle = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [news, setNews] = useState()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const body = document.querySelector('.body')
    const container = document.querySelector('.editor-page')
    const editor = document.querySelector('.ql-container')
    const editorParent = document.querySelector('.editor-parent')
    const toolbar = document.querySelector('.ql-toolbar')
    container.style.minHeight = body.clientHeight + 'px'
    editor.style.minHeight = editorParent.clientHeight - toolbar.clientHeight + 'px'
    window.addEventListener('resize', () => {
      container.style.minHeight = body.clientHeight + 'px'
      editor.style.minHeight = editorParent.clientHeight - toolbar.clientHeight + 'px'
    })
  }, [])

  // const handleSubmit = (e) => {
  //   console.log(news)
  //   e.preventDefault()
  //   if (!news.title) {
  //     return false
  //   }

  //   if (!isUpdating) {
  //     FirestorePostNews(news).then((docId) => {
  //       console.log('docId', docId)
  //       setNews(null)
  //     })
  //   } else {
  //     FirestoreUpdateOneNews(news).then(() => {
  //       setSearchParams({ id: '' })
  //     })
  //   }
  // }

  const handleTitleChange = (title) => {
    setNews({ ...news, title: title })
  }

  // useEffect(() => {
  //   const id = searchParams.get('id')
  //   if (id) {
  //     setNews(null)
  //     FirestoreGetOneNews(id)
  //       .then((value) => {
  //         if (value) {
  //           setIsUpdating(true)
  //           setNews(value)
  //         } else {
  //           setIsUpdating(false)
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err)
  //         setIsUpdating(false)
  //       })
  //   } else {
  //     setIsUpdating(false)
  //   }
  // }, [searchParams])

  return (
    <CRow className="editor-page">
      <CCol>
        <CForm className="d-flex flex-column gap-3 h-100">
          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Write</strong>
              <CButton type="submit" style={{ pointerEvents: 'auto' }} color="primary">
                {isUpdating ? 'Update' : 'Save'}
              </CButton>
            </CCardHeader>
          </CCard>
          <CCard className="flex-grow-1">
            <CCardBody className="d-flex flex-column">
              <CFormInput
                value={news?.title}
                onChange={(e) => setNews({ ...news, title: e.target.value })}
                className="mb-3 rounded-0 fs-2 fw-bold"
                required
                placeholder="Title here"
                type="text"
              />
              <Editor />
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default WriteArticle
