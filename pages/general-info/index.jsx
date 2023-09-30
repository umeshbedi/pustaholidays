import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/packageName.module.css'
import { Divider } from 'antd'
import { db } from '@/firebase'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function Destination() {
  const { query } = useRouter()
  const headerImage = `https://picsum.photos/seed/sdfwewe222/1280/500`

 

  const [dataInfo, setdataInfo] = useState([])
  
  useEffect(() => {
    db.collection('generalInfo').get().then((snap) => {
      const tempdataInfo = []
      snap.forEach((data) => {
        if (data != undefined) {
          tempdataInfo.push({ id: data.id, ...data.data() })
        }
      })
      setdataInfo(tempdataInfo)
    })
        
  }, [])

  function Tile({ thumbnail, name, slug }) {
    return (
      <div className={style.tile} style={{ height: 350, width: 250, position: 'relative', borderRadius: 40, overflow: 'hidden' }}>
        <a href={slug}>

          <Image
            src={thumbnail}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            loading='lazy'
            placeholder='blur'
            blurDataURL={thumbnail + '?blur'}
          />
        </a>
        <h1 style={{
          color: 'white',
          fontWeight: 700,
          fontSize: "1.5rem",
          bottom: 20,
          textAlign: 'center',
          position: 'absolute',
          width: '100% '
        }}
        >
          {name}
        </h1>
      </div>
    )
  }

  
  return (
    <div>
      <main>


        <div>
          <Menu />
          <HeadImage image={headerImage} title={"General Information"} />

          <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <h1>General Information</h1>
            {/* <p>Andman and Nicobar Island is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p> */}

            <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
              <div className={style.packageRow}>
                {dataInfo.map((item, index) => (
                  <Tile key={index} thumbnail={item.thumbnail} name={item.title} slug={item.slug} />
                ))}
              </div>
            </div>
          </div>


         
        </div>
      </main>

    </div>
  )
}
