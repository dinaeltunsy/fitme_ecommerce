import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperImagesList from './SwiperImagesList';
import './swiperslider.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';






const SwiperSlider = () => {
  return (
    <div className='ImgSlider'>
        <div className='SliderContainer'>
            <h1>Welcome to our newly launched collection</h1>
             <Button variant="warning" >Check Our Collection</Button>
        </div>

        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {SwiperImagesList.map(function(Swiperimage){
            return(
                <>
                    <SwiperSlide key={Swiperimage.imgid} >
                        <img className='sliderimg' alt='' src={Swiperimage.imgsrc}/> 
                    </SwiperSlide>   
                </>
            )
        })}

      </Swiper>
    </div>
  )
}

export default SwiperSlider