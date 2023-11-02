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


export default function Destination({data,banner}) {
 
  if (data==undefined) return <SHome/>

  return (
    <div>
      <main>


        <div>
          <Menu />
          <HeadImage image={banner}/>

          <div style={{background:'var(--lightGreyColor)', padding: "5%", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            <h1>General Information</h1>
            {/* <p>Andman and Nicobar Island is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p> */}

            <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
              <div className={style.packageRow}>
                {data.map((item, index) => (
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
  const res = await db.collection('generalInfo').get()
  const entry = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
});

const banner = (await db.doc(`pages/allPageBanner`).get()).data().GeneralInfoPage;

return {
    props: {
      data: entry,
      banner
    },
    revalidate: 60,

  }
}