import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Users = React.lazy(() => import('./views/users/Users.js'))
const AddUser = React.lazy(() => import('./views/users/AddUser.js'))
const SingleUser = React.lazy(() => import('./views/users/SingleUser.js'))

const Restaurants = React.lazy(() => import('./views/restaurants/Restaurants'))
const AddRestaurant = React.lazy(() => import('./views/restaurants/AddRestaurant'))

// Tutorials
const Tutorials = React.lazy(() => import('./views/tutorials/Tutorials'))
const AddTutorial = React.lazy(() => import('./views/tutorials/AddTutorial'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/users', name: 'Users', element: Users },
  { path: '/users/add', name: 'Users', element: AddUser },
  { path: '/users/user:id', name: 'Single User', element: SingleUser },

  { path: '/restaurants', name: 'Restaurants', element: Restaurants },
  { path: '/restaurants/add', name: 'Restaurant', element: AddRestaurant },

  { path: '/tutorials', name: 'Tutorials', element: Tutorials },
  { path: '/tutorials/add', name: 'Add Tutorials', element: AddTutorial },
]

export default routes
