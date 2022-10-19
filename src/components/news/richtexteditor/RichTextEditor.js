import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
} from 'draft-js'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor'
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar'
import { CCard, CCardHeader, CCardBody, CFormInput } from '@coreui/react'

import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

import './RichEditor.css'
import '@draft-js-plugins/inline-toolbar/lib/plugin.css'

const RichTextEditor = ({
  getContent,
  getTitle,
  dataFromFirestore,
  titleFromFirestore,
  isUpdating,
}) => {
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin()
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar]
  }, [])

  const editorRef = useRef(null)
  const [editorState, setEditorState] = useState(createEditorStateWithText(''))
  const [isReady, setIsReady] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (isUpdating && !isReady && dataFromFirestore) {
      setEditorState(EditorState.createWithContent(convertFromRaw(dataFromFirestore)))
      setTitle(titleFromFirestore)
      setIsReady(true)
    }
  }, [dataFromFirestore, isUpdating, isReady, titleFromFirestore])

  const handleTitle = (e) => {
    getTitle(e.target.value)
    setTitle(e.target.value)
  }

  // const styleMap = {
  //   CODE: {
  //     backgroundColor: 'rgba(0, 0, 0, 0.05)',
  //     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
  //     fontSize: 16,
  //     padding: 2,
  //   },
  // }

  // const getBlockStyle = (block) => {
  //   switch (block.getType()) {
  //     case 'blockquote':
  //       return 'RichEditor-blockquote'
  //     default:
  //       return ''
  //   }
  // }

  const onChange = (state) => {
    setEditorState(state)
    getContent(convertToRaw(editorState.getCurrentContent()))
  }

  // const mapKeyToEditorCommand = (e) => {
  //   if (e.keyCode === 9 /* TAB */) {
  //     const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */)
  //     if (newEditorState !== editorState) {
  //       onChange(newEditorState)
  //     }
  //     return null
  //   }
  //   return getDefaultKeyBinding(e)
  // }

  // const handleKeyCommand = (command, editorState, eventTimeStamp) => {
  //   const newState = RichUtils.handleKeyCommand(editorState, command)
  //   if (newState) {
  //     onChange(newState)
  //     return 'handled'
  //   }
  //   return 'not-handled'
  // }

  // const toggleBlockType = (blockType) => {
  //   onChange(RichUtils.toggleBlockType(editorState, blockType))
  // }

  // const toggleInlineStyle = (inlineStyle) => {
  //   onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  // }

  const handleTitleDoneEdit = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
      editorRef.current.focus()
    }
  }

  return (
    <CCard>
      {/* <CCardHeader>
        <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
      </CCardHeader> */}
      <CCardBody>
        <CFormInput
          onKeyUp={handleTitleDoneEdit}
          onChange={handleTitle}
          value={title}
          className="RichEditor-title"
          type="text"
          size="lg"
          placeholder="Title"
          required
        />
        <Editor
          ref={(element) => (editorRef.current = element)}
          editorState={editorState}
          placeholder="Tell your story..."
          // customStyleMap={styleMap}
          // blockStyleFn={(block) => getBlockStyle(block)}
          // keyBindingFn={(e) => mapKeyToEditorCommand(e)}
          onChange={onChange}
          spellCheck={true}
          plugins={plugins}
          // handleKeyCommand={handleKeyCommand}
        />
        {/* <InlineToolbar /> */}
      </CCardBody>
    </CCard>
  )
}

RichTextEditor.propTypes = {
  getContent: PropTypes.any,
  getTitle: PropTypes.func,
  dataFromFirestore: PropTypes.object,
  isUpdating: PropTypes.bool,
  titleFromFirestore: PropTypes.string,
}

export default RichTextEditor
