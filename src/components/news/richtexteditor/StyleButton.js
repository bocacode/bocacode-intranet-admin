import React from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import {
  cilBold,
  cilCode,
  cilDoubleQuoteSansLeft,
  cilList,
  cilListNumbered,
  cilText,
  cilTextSize,
} from '@coreui/icons'

const StyleButton = ({ active, style, label, onToggle }) => {
  const ICON = {
    'header-two': cilText,
    'header-three': cilTextSize,
    blockquote: cilDoubleQuoteSansLeft,
    'unordered-list-item': cilList,
    'ordered-list-item': cilListNumbered,
    'code-block': cilCode,
  }

  const _onToggle = (e) => {
    e.preventDefault()
    onToggle(style)
  }

  const className = 'RichEditor-styleButton'

  return (
    <button
      className={className + `${active ? ' RichEditor-activeButton' : ''}`}
      onClick={_onToggle}
    >
      <CIcon icon={ICON[style]} size="lg" />
    </button>
  )
}

StyleButton.propTypes = {
  active: PropTypes.bool,
  style: PropTypes.string,
  label: PropTypes.string,
  onToggle: PropTypes.func,
}

export default React.memo(StyleButton)
