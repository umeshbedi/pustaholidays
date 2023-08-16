import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const headerImage = `https://picsum.photos/seed/sdf${Math.random(0, 100)}/1280/500`

export default function HeadImage({image=headerImage, title}) {
    
    const [scale, setScale] = useState(1.5)

    useEffect(()=>{
        
    },[])
    
    return (
        <div style={{ width: "100%", height: 550, position: 'relative', overflow:'hidden' }}>
            <Image
                src={image}
                fill
                loading='lazy'
                style={{ objectFit: 'cover', transform:`scale(${scale})`, transition:'transform 10s ease' }}
                placeholder='blur'
                blurDataURL={image + '?blur'}
                onLoad={()=>setScale(1)}
            />
            <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <h1 style={{ color: 'white' }}>{title}</h1>
            </div>
        </div>
    )
}
