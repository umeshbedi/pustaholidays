import Image from 'next/image'
import React from 'react'

const headerImage = `https://picsum.photos/seed/sdf${Math.random(0, 100)}/1280/500`

export default function HeadImage({image=headerImage, title}) {


    
    return (
        <div style={{ width: "100%", height: 550, position: 'relative' }}>
            <Image
                src={image}
                fill
                loading='lazy'
                style={{ objectFit: 'cover' }}
                placeholder='blur'
                blurDataURL={image + '?blur'}
            />
            <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <h1 style={{ color: 'white' }}>{title}</h1>
            </div>
        </div>
    )
}
