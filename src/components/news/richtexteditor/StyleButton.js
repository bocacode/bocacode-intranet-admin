import React from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import {
  cilBold,
  cilCode,
  cilDoubleQuoteSansLeft,
  cilItalic,
  cilList,
  cilListNumbered,
  cilText,
  cilTextSize,
  cilUnderline,
} from '@coreui/icons'
import { CTooltip } from '@coreui/react'

const StyleButton = ({ active, style, label, onToggle }) => {
  const ICON = {
    'header-two': cilText,
    'header-three': cilTextSize,
    blockquote: cilDoubleQuoteSansLeft,
    'unordered-list-item': cilList,
    'ordered-list-item': cilListNumbered,
    'code-block': cilCode,
    BOLD: cilBold,
    ITALIC: cilItalic,
    UNDERLINE: cilUnderline,
    CODE: cilCode,
  }

  const _onToggle = (e) => {
    e.preventDefault()
    onToggle(style)
  }

  const className = 'RichEditor-styleButton'

  return (
    <CTooltip content={label}>
      <button
        className={className + `${active ? ' RichEditor-activeButton' : ''}`}
        onClick={_onToggle}
      >
        <CIcon icon={ICON[style]} size="lg" />
      </button>
    </CTooltip>
  )
}

StyleButton.propTypes = {
  active: PropTypes.bool,
  style: PropTypes.string,
  label: PropTypes.string,
  onToggle: PropTypes.func,
}

export default React.memo(StyleButton)
