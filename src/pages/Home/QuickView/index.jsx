import {faMinusCircle, faPlusCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input } from 'reactstrap';
import './QuickViewStyle.scss'
function QuickView(props) {
    const [value, setValue] = useState(1)
    const {modal,toggle} = props
    const handleToggle =()=>{
        toggle()
    }
    const handleIncrement = () => {
        setValue(prevValue => prevValue + 1);
      };
    
      const handleDecrement = () => {
        setValue(prevValue => {
            if(prevValue < 2) return 1
            return prevValue - 1
        });
      };
  return (
    <div>
        <Modal size='lg' keyboard isOpen={modal.isOpen} toggle={handleToggle} centered >
            <ModalHeader toggle={handleToggle}></ModalHeader>
            <ModalBody>
            <Row>
                <Col xs='12' md='5'>
                    <img src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/12.jpg" alt="img" className='img-fluid' />
                </Col>
                <Col xs='12' md='7'>
                    <h2>Hat bitToKetCho II</h2>
                    <p className='py-3'>22.00 $</p>
                    <div className="rating">
                        <span><FontAwesomeIcon icon={faStar} /></span>
                        <span><FontAwesomeIcon icon={faStar} /></span>
                        <span><FontAwesomeIcon icon={faStar} /></span>
                        <span><FontAwesomeIcon icon={faStar} /></span>
                        <span><FontAwesomeIcon icon={faStar} /></span>

                    </div>
                    <div className="description text-muted py-3">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis cupiditate laborum odio? Fugit dolorem iste ipsum ipsam obcaecati nihil sint autem sit, numquam et dolores? Odio totam quidem obcaecati corporis.
                    </div>
                    <hr className='text-muted'/>
                    <div className="quantity d-flex align-items-center">
                        <div className="quantityBtn d-flex align-items-center justify-content-center ">
                            <FontAwesomeIcon icon={faMinusCircle} onClick={handleDecrement}/>
                            <Input  type='text' value={value} className='border-0 bg-transparent' disabled></Input>
                            <FontAwesomeIcon icon={faPlusCircle} onClick={handleIncrement}/>
                        </div>  
                        <div className="cartBtn">
                            <Button className="btn-dark rounded-0 py-2 px-3">
                                <span className="redirectShop">ADD TO CART</span>
                            </Button>    
                        </div>  
                    </div>
                </Col>
            </Row>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={handleToggle}>
                Cancel
            </Button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

export default QuickView