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
import Quill from 'quill'
import {
  FirestoreGetOneNews,
  FirestorePostNews,
  FirestoreUpdateOneNews,
} from 'src/utils/firebaseUtils'
import { useSearchParams } from 'react-router-dom'
import Editor from 'src/components/news/editor/Editor'

const WriteArticle = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [news, setNews] = useState({ title: '', data: [] })
  const [searchParams, setSearchParams] = useSearchParams()
  const [defaultDelta, setDefaultDelta] = useState({})

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

  const generateBody = (arr) => {
    const textArr = arr.map((obj) => {
      const text = obj.insert.replace(/\n/g, ' ')
      return text
    })
    return textArr.join('').trim()
  }

  const handleTitleChange = (title) => {
    setNews({ ...news, title: title })
  }

  const handleDataChange = (data) => {
    const body = generateBody(data.ops)
    setNews({ ...news, data: data.ops, body })
  }

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setNews(null)
      FirestoreGetOneNews(id)
        .then((value) => {
          if (value) {
            setIsUpdating(true)
            // Change here
            const Delta = Quill.import('delta')
            const newDelta = new Delta(value.data)
            setDefaultDelta(newDelta)
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

  return news ? (
    <CRow className="editor-page">
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
          <CCard className="flex-grow-1">
            <CCardBody className="d-flex flex-column">
              <CFormInput
                value={news.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="mb-3 rounded-0 fs-2 fw-bold"
                required
                placeholder="Title here"
                type="text"
              />
              <Editor setDelta={defaultDelta} getDelta={handleDataChange} />
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  ) : (
    <div>Loading...</div>
  )
}

export default WriteArticle
