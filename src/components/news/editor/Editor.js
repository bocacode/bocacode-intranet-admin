import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import PropTypes from 'prop-types'
import 'react-quill/dist/quill.snow.css'
import './style.scss'

const Editor = ({ setDelta, getDelta }) => {
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

  return (
    <div className="editor-parent container-fluid p-0 flex-grow-1">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Tell your story..."
        onChange={(_, delta, src, editor) => getDelta(editor.getContents())}
      />
    </div>
  )
}

Editor.propTypes = {
  setDelta: PropTypes.object,
  getDelta: PropTypes.func,
}

export default Editor
