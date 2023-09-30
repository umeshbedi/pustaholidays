import React from 'react'
import Title from '../master/Title'
import style from './WhatSay.module.css'
import { testimonials } from '../utils/localdb'
import Image from 'next/image'


export default function WhatSay() {
    return (
        <div>
            <Title title='What they Say' />

            <div className={style.SayContainer}>

                <div className={style.SayImage}>
                    <Image src={`https://picsum.photos/seed/sdf09eedd/1000/500`} fill style={{ objectFit: 'cover' }} />
                </div>

                <div className={style.SayBox}>
                    <div className={style.arrowBox}/>
                    <h2>The Quiet Atmoshphere of given Place</h2>
                    <p>{testimonials[0].content.slice(0, 300)}</p>
                    <div className={style.SayAuthor}>
                        <div style={{ width: 80, height: 80, position: 'relative', borderRadius: 100, overflow: 'hidden' }}>
                            <Image src={`https://picsum.photos/seed/sdfsdfjjlkl34/150/150`} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>by Name Kumar</p>
                            <p >Influencer</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
