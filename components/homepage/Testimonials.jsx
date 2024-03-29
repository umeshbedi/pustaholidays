import React, { useEffect, useState } from 'react'
// import "react-multi-carousel/lib/styles.css";



import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { FaQuoteLeft } from 'react-icons/fa';

// import style from '@/styles/Home.module.css'
import { mobile } from '../utils/variables';
import Title from '../master/Title';
import { testimonials } from '../utils/localdb';


export default function Testimonials({ testimonialsData }) {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])




    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#252d35', padding: '4.5rem 0' }}>
            <img src="/images/Google-Reviews.png" alt="Google Reviews" style={{ height: 70 }} />
            <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                <Title
                    title={"Pusta Holidays"}
                    isdark
                    center
                    margin={"2rem"}
                    extra={
                        <div>
                            <p style={{ textAlign: 'center', color: 'white', padding: "0 10px" }}>You can review us for our services ➡ <span>
                                <a href='#'
                                    target='blank'
                                    style={{ color: "var(--primaryColor)" }}>Click Here
                                </a>
                            </span></p>
                        </div>
                    } />
            </div>
            <div style={{ width: isMobile ? "90%" : "84%", marginTop: 20 }}>
                <Swiper
                    effect={"coverflow"}
                    spaceBetween={30}
                    grabCursor={true}
                    modules={[Pagination, EffectCoverflow]}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        // slideShadows: true,
                    }}
                    pagination={true}

                    className="mySwiper"

                >
                    {testimonialsData.map((item, i) => (
                        <SwiperSlide
                            key={i}
                            style={{ width: 350 }}
                        >

                            <div
                                style={{
                                    background: 'white',
                                    borderRadius: "30px 30px 0 0",
                                    padding: "40px 30px 10px 35px"
                                }}
                            >
                                <FaQuoteLeft style={{ fontSize: 35, color: 'var(--primaryColor)' }} />
                                <div>
                                    <p>{item.content}</p>
                                </div>
                                
                            </div>
                            <div style={{background:'white', borderRadius:'0 0 100px 0', width:'100%', marginTop:-2}}>
                                    <p style={{background:"var(--primaryColor)", borderRadius:'100px 0 100px 0', color: 'white', textAlign:'center', padding:30, fontStyle:'italic', fontWeight:800 }}>— {item.name}</p>
                                </div>

                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    )
}
