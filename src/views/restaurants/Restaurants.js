import * as React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Tables = () => {
  const [restaurants, setRestaurants] = React.useState([])

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/restaurants`)
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Restaurants</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p>
            <DocsExample href="components/table">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created by</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {restaurants?.map((item) => {
                    return (
                      <CTableRow key={item.uid}>
                        <CTableHeaderCell scope="row">{item.uid}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.address}</CTableDataCell>
                        <CTableDataCell>{item.created_by}</CTableDataCell>
                        <CTableDataCell>
                          <img src={item.photo_url} alt="" srcSet="" style={{ width: '200px' }} />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
