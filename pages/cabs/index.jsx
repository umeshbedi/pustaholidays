import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/packageName.module.css'
import { Divider } from 'antd'
import { db } from '@/firebase'
import SHome from '@/components/skeleton/SHome'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function Rentals() {
  const { query } = useRouter()

  const [dataAndaman, setDataAndaman] = useState([])
  const [dataBali, setDataBali] = useState([])

  useEffect(() => {
    db.collection('rentalAndaman').get().then((snap) => {
      const tempDataAndaman = []
      snap.forEach((data) => {
        if (data != undefined) {
          tempDataAndaman.push({ id: data.id, ...data.data() })
        }
      })
      setDataAndaman(tempDataAndaman)
    })
    db.collection('rentalBali').get().then((snap) => {
      const tempDataBali = []
      snap.forEach((data) => {
        if (data != undefined) {
          tempDataBali.push({ id: data.id, ...data.data() })
        }
      })
      setDataBali(tempDataBali)
    })

    
  }, [])

  const tileData = [
    { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest`, title: "Cabs in Place" },
    { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest`, title: "Cabs in Place" },
    { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest`, title: "Cabs in Place" },

  ]


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
          width: '100% ',
          padding:"0 10px",
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
          <HeadImage title={"Rentals"} />

          <div style={{ padding: "3rem 5%", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <h1>Cabs in Andman and Nicobar Island</h1>
            <p>Andman and Nicobar Island is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p>

            <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
              <div className={style.packageRow}>
                {dataAndaman.map((item, index) => (
                  <Tile key={index} thumbnail={item.thumbnail} name={item.title} slug={item.slug} />
                ))}
              </div>
            </div>
          </div>


          <div style={{ padding: "0 5% 3rem 5%", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <Divider />
            <h1>Cabs in Bali</h1>
            <p>Bali is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p>

            <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
              <div className={style.packageRow}>
              {tileData.map((item, index) => (
                  <Tile key={index} thumbnail={item.image} name={"Place Name"} slug={'/w2s/attraction/Place Name'} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}


