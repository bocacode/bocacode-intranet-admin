import React, { Suspense, useEffect, useState, createContext } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

export const UserContext = createContext({})

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const bc_admin_user = localStorage.getItem('bc_admin_user')
    if (bc_admin_user) {
      setUser(JSON.parse(bc_admin_user))
    } else {
      localStorage.clear()
      setUser(undefined)
    }
  }, [])

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            {user ? (
              <Route path="*" name="Home" element={<DefaultLayout />} />
            ) : (
              <Route exact path="/" name="Login Page" element={<Login />} />
            )}
          </Routes>

          {/* <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />

          </Routes> */}
        </UserContext.Provider>
      </Suspense>
    </HashRouter>
  )
}

export default App
