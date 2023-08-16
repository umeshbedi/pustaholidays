import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import style from '@/styles/Home.module.scss'

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from 'next/image';
import MyButton from '../utils/MyButton';
import { mobile } from '../utils/variables';
import { sliderImages } from '../utils/localdb';




export default function Package({lightHead, darkHead, backgroundImage, sliderContent, button}) {

  const [containerStyle, setContainerStyle] = useState({ width: "90%", borderRadius: "100px 0 0 100px", })
  const [subHeadStyle, setsubHeadStyle] = useState({ display: 'flex' })
  const [sliderStyle, setSliderStyle] = useState({ width: '100%' })
  const [slides, setSlides] = useState(4.5)
  const [center, setcenter] = useState(true)

  const [buttonFocus, setButtonFocus] = useState(false)

  const slideRef = useRef()
  const containerRef = useRef()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
      setIsMobile(mobile())
  }, [isMobile])
  

  return (
    <div
      ref={containerRef}
      style={{
        width:'100%',
        
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: "center bottom",
        backgroundRepeat: 'no-repeat',
        float: 'right',
        position: 'relative',
        marginBottom:isMobile?'2.5rem':"3.5rem"
      }}
    >
        <div
          style={{
            ...subHeadStyle,
            // backgroundColor: 'yellow',
            paddingLeft: isMobile?"2.5rem":'4.5rem',
            alignItems: 'center',
            zIndex: 2,
            paddingTop:"2rem"
          }}
        >

          <div style={{zIndex:2}}>

            <h1 
            data-aos="fade-up"
            data-aos-duration="2000"
            style={{ color: style.primaryColor, fontWeight: 900, fontSize:isMobile?"2.8rem": "3.2rem", lineHeight: 1.1, marginBottom: 20 }}>
              {lightHead} <span style={{ color: 'grey' }}>{darkHead}</span>
            </h1>

            <div 
            data-aos="fade-up"
            data-aos-duration="2000"
            style={{width:'fit-content'}}>
              <MyButton name={button.name} slug={button.slug} />
            </div>
            
          </div>
        </div>

      <div style={{ display: 'flex', width: '100%', position: 'relative' }} >
        

        {/* for carousel */}
        <div
          style={sliderStyle}

        >
          <Swiper
            style={{ padding: `${isMobile?.5:2.5}rem 10px`,  "--swiper-navigation-color": "#fff",transition:'ease-out' }}
            ref={slideRef}
            effect={"coverflow"}
            grabCursor={true}
            navigation={isMobile?false:true}
            modules={[Pagination, Navigation]}
            slidesPerView={"auto"}
            spaceBetween={isMobile?10:30}
            rewind
            speed={1500}
            
          >
            {sliderImages.map((item, index) => (
              <SwiperSlide style={{ width: 250, height: 350 }} key={index} className='singleSwiper'>
                <div style={{ height: 350 }}>
                  <Image src={item.thumbnail} alt={item.name} fill style={{ objectFit: 'cover', borderRadius: isMobile?25:50, position: 'absolute',zIndex:-1 }} />
                  <h1 style={{ 
                    color: 'white', 
                    fontWeight: 700, 
                    fontSize: isMobile?"1.8rem":"2.2rem", 
                    writingMode:'vertical-lr',
                    transform:'rotate(-180deg)',
                    float:'bottom',
                    // background:'yellow',
                    height:'100%',
                    paddingTop:20,
                    marginLeft:10
                  }}
                    >
                    Name
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
