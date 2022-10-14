import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardHeader, CCardBody, CCardText, CButton } from '@coreui/react'
import { FirestoreChangeNewsStatus } from 'src/utils/firebaseUtils'
import { Link } from 'react-router-dom'

const NewsCard = (props) => {
  const { news } = props
  const text = news.body.substr(0, 400) + '...'

  const handleStatus = () => {
    const status = !news.published
    FirestoreChangeNewsStatus(news.id, status).then(() => console.log('done'))
  }
  return (
    <CCard style={{ minWidth: '18rem', height: '100%' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>{news.title}</strong>
        <div>
          <CButton onClick={handleStatus} color="link">
            {news.published ? 'Disable' : 'Enable'}
          </CButton>
          <Link to={'/news/write?id=' + news.id}>
            <CButton color="link">Edit</CButton>
          </Link>
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
