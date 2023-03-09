import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilDescription, cilSpeedometer, cilStar } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavGroup,
    name: 'Restaurants',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All',
        to: '/restaurants/',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/restaurants/add',
      },
      // {
      //   component: CNavItem,
      //   name: 'Modal',
      //   to: '/restaurants/modals',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Toasts',
      //   to: '/restaurants/toasts',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Tutorials',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All',
        to: '/tutorials/',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/tutorials/add',
      },
      // {
      //   component: CNavItem,
      //   name: 'Modal',
      //   to: '/tutorials/modals',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Toasts',
      //   to: '/tutorials/toasts',
      // },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
