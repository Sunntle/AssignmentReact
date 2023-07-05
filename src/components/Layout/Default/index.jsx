import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import './DefaultLayout.scss'
function DefaultLayout({children}) {
  return (
    <div className='wrapper position-relative'>
    <header><Header/></header>
    <div className='content'>
    {children}
    </div>
 
   <footer> <Footer/></footer>
    </div>
  )
}

export default DefaultLayout