import React from 'react'
import { Link } from 'react-router-dom'
import { BreadcrumbItem, Breadcrumb, Container } from 'reactstrap'
import './BreadcrumbStyle.scss'
function BreadcrumbComponent(props) {
  const url = window.location.pathname
  return (
    <div className='wrap py-5'>
      <Container>
          <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/' className='text-uppercase'>
              Home
            </Link>
          </BreadcrumbItem>
          {[url].map((data,index)=>{
            return (
              <BreadcrumbItem active key={index}> 
              {data.slice(1).toUpperCase()}
              </BreadcrumbItem> 
            )
          })}
          
        </Breadcrumb>
      </Container>
    </div>
  )
}

export default BreadcrumbComponent