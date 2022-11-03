import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import PropTypes from 'prop-types'
import 'react-quill/dist/quill.snow.css'
import './style.scss'

const Editor = ({ setDelta, getDelta }) => {
  const [value, setValue] = useState({})

  useEffect(() => {
    setValue(setDelta)
  }, [setDelta])

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
  ]

  const handleDataChange = (editor) => {
    getDelta(editor.getContents())
    setValue(editor.getContents())
  }

  return (
    <div className="editor-parent container-fluid p-0 flex-grow-1">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Tell your story..."
        onChange={(_, delta, src, editor) => handleDataChange(editor)}
        value={value}
      />
    </div>
  )
}

Editor.propTypes = {
  setDelta: PropTypes.object,
  getDelta: PropTypes.func,
}

export default Editor
