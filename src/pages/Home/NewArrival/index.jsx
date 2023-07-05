import React,{useState} from 'react'
import "./NewArrivalStyle.scss"
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";

import {  Pagination } from 'swiper';
import { Container,Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import QuickView from '../QuickView';

function NewArrival() {
  const [modal, setModal] = useState({
    isOpen: false,
    data: null
  });
  const toggle = (id = null) => {
    setModal(prev=> ({isOpen: !prev.isOpen, data: id}))
  };
  return (
    <Container>
        <div className='my-5'>
        <h2 className='title position-relative d-inline-block pb-3 mb-3'>New Arrival</h2>
        <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odit fugiat iste, nam mollitia rerum inventore!</p>
        </div>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        // pagination={{ clickable: true }}
        modules={[ Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className='position-relative'>
        <img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/9.jpg" alt="" />
        <div className='position-absolute badges'><span className='d-block mainColor'>New</span></div>
        <div className='product-actions__mid position-absolute d-flex align-items-center justify-content-around'>
            <Button color='dark'><FontAwesomeIcon icon={faShoppingCart}/></Button>
            <Button color='dark' onClick={() => toggle('2')}><FontAwesomeIcon icon={faEye}/></Button>
            <Button color='dark'><FontAwesomeIcon icon={faHeart}/></Button>
        </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/10.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide><img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/11.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/12.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/9.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/10.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/11.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='img-fluid' src="https://flone.jamstacktemplates.dev/assets/img/product/accessories/12.jpg" alt="" /></SwiperSlide>
      </Swiper>
      <QuickView modal={modal} toggle={toggle}/>
    </Container>
  )
}

export default NewArrival