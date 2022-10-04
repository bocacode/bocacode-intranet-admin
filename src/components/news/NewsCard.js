import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardHeader, CCardBody, CCardText, CButton } from '@coreui/react'

const NewsCard = (props) => {
  const { news } = props
  const text = news.body.substr(0, 400) + '...'
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>{news.title}</strong>
        <div>
          <CButton color="link">Disable</CButton>
          <CButton color="link">Edit</CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CCardText>{text}</CCardText>
      </CCardBody>
    </CCard>
  )
}

NewsCard.propTypes = {
  news: PropTypes.object,
}

export default NewsCard
