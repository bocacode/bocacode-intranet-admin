import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw } from 'draft-js'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'

import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

import 'draft-js/dist/Draft.css'
import './RichEditor.css'

const RichTextEditor = ({ setContent }) => {
  const editorRef = useRef(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  }

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote'
      default:
        return ''
    }
  }

  const onChange = (state) => {
    setEditorState(state)
    setContent(convertToRaw(editorState.getCurrentContent()))
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */)
      if (newEditorState !== editorState) {
        onChange(newEditorState)
      }
      return null
    }
    return getDefaultKeyBinding(e)
  }

  const handleKeyCommand = (command, editorState, eventTimeStamp) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  return (
    <CCard>
      <CCardHeader>
        <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
      </CCardHeader>
      <Editor
        ref={editorRef}
        editorState={editorState}
        placeholder="Tell a story..."
        customStyleMap={styleMap}
        blockStyleFn={(block) => getBlockStyle(block)}
        keyBindingFn={(e) => mapKeyToEditorCommand(e)}
        onChange={onChange}
        spellCheck={true}
        handleKeyCommand={handleKeyCommand}
      />
    </CCard>
  )
}

RichTextEditor.propTypes = {
  setContent: PropTypes.any,
}

export default RichTextEditor
