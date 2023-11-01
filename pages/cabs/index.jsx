import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/packageName.module.css'
import { Divider } from 'antd'
import { db } from '@/firebase'
import SHome from '@/components/skeleton/SHome'
import Tile from '@/components/master/SingleTile'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function Rentals({ entryAndaman, entryBali, banner }) {
  
  if (entryAndaman == undefined) return <SHome />

  return (
    <div>
      <main>


        <div>
          <Menu />
          <HeadImage image={banner} title={"Rentals"} />

          <div style={{ padding: "3rem 5%", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <h1>Cabs in Andman (India)</h1>
            <p>{`Discover the tropical paradise of Andaman like never before with Pusta Holidays, your ultimate gateway to the best cab facility on the islands. At Pusta Holidays, we take pride in offering an all-encompassing cab service that ensures you experience the breathtaking beauty of Andaman to the fullest.`}</p>

            <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
              <div className={style.packageRow}>
                {entryAndaman.map((item, index) => (
                  <Tile key={index} thumbnail={item.thumbnail} name={item.title} slug={item.slug} />
                ))}
              </div>
            </div>
          </div>


          <div style={{ padding: "0 5% 3rem 5%", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <Divider />
            <h1>Cabs in Bali</h1>
            <p>{`Experience the pinnacle of convenience and comfort with Pusta Holidays' exclusive Cab Facility in Bali. We take pride in offering the finest transportation services that cover the entirety of this enchanting island. When you choose Pusta Holidays, you're choosing the best way to explore Bali, with a fleet of well-maintained vehicles and expert drivers at your disposal.`}</p>

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
  const resAndaman = await db.collection('rentalAndaman').get()
  const entryAndaman = resAndaman.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });
  const resBali = await db.collection('rentalBali').get()
  const entryBali = resBali.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  const banner = (await db.doc(`pages/allPageBanner`).get()).data().RentalPage;

  return {
    props: {
      entryAndaman,
      entryBali,
      banner
    },
    revalidate: 60,

  }
}
