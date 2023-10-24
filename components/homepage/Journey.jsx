import React, { useEffect, useState } from 'react'
import style from './Journey.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Title from '../master/Title';

export default function Journey({youtube}) {

    const [video, setVideo] = useState("")
    const [size, setSize] = useState(null)
    const [frameVisible, setFrameVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(1)

    useEffect(() => {
        // const boxVideo = document.getElementsByClassName("boxVideo")
        // document.getElementsByClassName("ytp-play-button ytp-button")[0].click()

    }, [video])

    const content = [
        { image: `https://picsum.photos/seed/sdf564ddd65/1000/450`, video: "rxw2Kc-uRjk?" },
        { image: `https://picsum.photos/seed/sdfsdfsd56465/1000/450`, video: "0Cq35oWlni8" },
        { image: `https://picsum.photos/seed/sdfsdf564sdf65/1000/450`, video: "iKPwDhMk2BI" },
        { image: `https://picsum.photos/seed/sdfsdf5646sdf5/1000/450`, video: "OKjOSzKUIqk" },
        { image: `https://picsum.photos/seed/sdf564ddd65/1000/450`, video: "rxw2Kc-uRjk?" },
        { image: `https://picsum.photos/seed/sdfsdfsd56465/1000/450`, video: "0Cq35oWlni8" },
        { image: `https://picsum.photos/seed/sdfsdf564sdf65/1000/450`, video: "iKPwDhMk2BI" },
        { image: `https://picsum.photos/seed/sdfsdf5646sdf5/1000/450`, video: "OKjOSzKUIqk" },
    ]

    function playButton() {
        setFrameVisible(true)
        setVideo("&autoplay=1")
    }

    function removePlay() {
        setFrameVisible(false)
    }





    return (
        <div>
            <Title title={"Journey In Moving Frames"} />
            <Swiper
                spaceBetween={30}
                // centeredSlides={true}
                style={{ padding: "0 20%" }}
                initialSlide={1}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                rewind
                onSlideChange={(e) => {
                    setActiveIndex(e.activeIndex)
                }}
                onNavigationNext={() => {

                }}
            >
                {
                    youtube.TravelJourney.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div>
                                <div
                                    // onMouseEnter={() => activeIndex == index ? playButton() : null}
                                    // onMouseOut={() => activeIndex == index ? removePlay() : null}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: 450,
                                        position: 'relative',

                                    }}>

                                    {/* {frameVisible && activeIndex == index ?
                                        (
                                            <div style={{ borderRadius: 30, overflow: 'hidden', width: '100%' }}>
                                                <iframe
                                                    width="100%"
                                                    height="450px"
                                                    src={`https://www.youtube.com/embed/${item.video}?rel=0&amp;showinfo=0${video}`}
                                                    frameborder="0"
                                                    allowfullscreen="allowfullscreen"
                                                >
                                                </iframe>
                                            </div>)
                                        : (<Image
                                            src={item.image}
                                            fill
                                            loading='lazy'
                                            style={{ objectFit: 'cover', borderRadius: 20, transform: size }}
                                            placeholder='blur'
                                            blurDataURL={item.image}
                                        />)
                                    } */}
                                     <div style={{ borderRadius: 30, overflow: 'hidden', width: '100%' }}>
                                                <iframe
                                                    width="100%"
                                                    height="450px"
                                                    src={`https://www.youtube.com/embed/${item.YoutubeLink.split("v=")[1]}?rel=0&amp;showinfo=0`}
                                                    frameborder="0"
                                                    allowfullscreen="allowfullscreen"
                                                >
                                                </iframe>
                                            </div>

                                    {activeIndex != index &&
                                        <div style={{
                                            height: 450,
                                            background: "rgba(255,255,255,.6)",
                                            position: 'absolute',
                                            width: '100%',

                                        }}
                                        />
                                    }


                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }




            </Swiper>
        </div>
    )
}
