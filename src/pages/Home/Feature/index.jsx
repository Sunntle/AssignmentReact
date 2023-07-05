import React from 'react'
import { Row,Col } from 'reactstrap'
import "./FeatureStyle.scss"
function Feature() {
  return (
    <div className='container pt-5 pb-4'>
        <Row className='pt-5 pb-4'>
            <Col xs='12' md='4'>
                <div className='support position-relative'>
                    <img src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-1.png" alt="Shipping" />
                    <h5 className='my-3 caption'>Free Shipping</h5>
                    <p className='text-muted mx-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
            </Col>
            <Col xs='12' md='4'>
                <div className='support position-relative'>
                    <img src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-2.png" alt="Shipping" />
                    <h5 className='my-3 caption'>Support 24/7</h5>
                    <p className='text-muted mx-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
            </Col>
            <Col xs='12' md='4'>
                <div className='support position-relative'>
                    <img src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-3.png" alt="Shipping" />
                    <h5 className='my-3 caption'>Money Return</h5>
                    <p className='text-muted mx-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Feature