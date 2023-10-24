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


export default function Destination({ entryAndaman, entryBali, banner }) {
  

  if (entryAndaman == undefined) return <SHome />

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
          padding: "0 10px",
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
          <HeadImage image={banner} title={"Destination"} />

          <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <h1>Andman and Nicobar Island</h1>
            <p>Andman and Nicobar Island is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p>

            <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
              <div className={style.packageRow}>
                {entryAndaman.map((item, index) => (
                  <Tile key={index} thumbnail={item.thumbnail} name={item.title} slug={item.slug} />
                ))}
              </div>
            </div>
          </div>


          <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <Divider />
            <h1>Bali</h1>
            <p>Andman and Nicobar Island is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p>

            <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
              <div className={style.packageRow}>
                {entryBali.map((item, index) => (
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

export const getStaticProps = async () => {
  const resAndaman = await db.collection('destinationAndaman').get()
  const entryAndaman = resAndaman.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });
  const resBali = await db.collection('destinationBali').get()
  const entryBali = resBali.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  const banner = (await db.doc(`pages/allPageBanner`).get()).data().DestinationPage;

  return {
    props: {
      entryAndaman,
      entryBali,
      banner
    },
    revalidate: 60,

  }
}