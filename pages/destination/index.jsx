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
            <h1>Andaman and Nicobar Islands (India)</h1>
            <p>Experience the Andaman Islands like never before with Pusta Holidays! We are your ultimate gateway to the pristine beauty and adventure that this tropical paradise has to offer. With our unwavering commitment to excellence, we ensure that you explore all the destinations in the Andaman Islands with a perfect and unforgettable experience.</p>
            <p>Pusta Holidays takes you on a journey through the lush emerald jungles, untouched beaches, and crystal-clear waters of this exotic archipelago. From the bustling streets of Port Blair to the serene shores of Havelock, we leave no stone unturned in curating the ideal itinerary for your dream vacation.</p>

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
            <h1>Bali (Indonesia)</h1>
            <p>Welcome to Pusta Holidays, your gateway to an unforgettable Bali experience! At Pusta Holidays, we pride ourselves on being your ultimate guide to exploring every enchanting corner of this tropical paradise. With us, you can be sure of experiencing Bali like never before, all wrapped in perfection.</p>
            <p>Our commitment to providing the perfect Bali experience extends to every corner of this captivating island. From the tranquil beaches of Seminyak to the vibrant cultural heart of Ubud, we leave no stone unturned in ensuring you have a remarkable journey. We understand that Bali is a diverse tapestry of natural beauty, cultural richness, and thrilling adventures, and we tailor our offerings to encompass all these facets</p>

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