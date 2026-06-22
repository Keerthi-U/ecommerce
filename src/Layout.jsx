import React from 'react'
import Navbar from './Component/Navbar'

const Layout = ({children}) => {
  return (
 <div>
      <Navbar />  {/* Navbar will be included on all pages */}
      <main>{children}</main> {/* This renders the specific page content */}
    </div>
  )
}

export default Layout