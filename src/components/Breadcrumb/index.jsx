import React from 'react'
import styles from './BreadcrumbStyle.module.scss'
import { Link } from 'react-router-dom'
import { BreadcrumbItem, Breadcrumb, Container } from 'reactstrap'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);

function BreadcrumbComponent(props) {
  const url = window.location.pathname
  return (
    <div className={cx('wrap','py-5')}>
      <Container>
          <Breadcrumb>
          <BreadcrumbItem className={cx('breadcrumb-item')}>
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