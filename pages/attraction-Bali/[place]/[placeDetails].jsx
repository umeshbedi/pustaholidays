import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/packageName.module.css'
import { mobile } from '@/components/utils/variables'
import { Divider } from 'antd'
import { db } from '@/firebase'
import SHome from '@/components/skeleton/SHome'
import String2Html from '@/components/master/String2Html'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function PlaceDetails({ data, dataParent }) {

  const { query } = useRouter()
  

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  const tileData = [
   


  ]


  function Tile({ thumbnail, name, slug }) {
    return (
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="2000"
        className={style.tile} style={{ height: 350, width: 250, position: 'relative', borderRadius: 40, overflow: 'hidden', marginBottom: '2rem' }}>
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

  if (data == undefined) return <SHome />
  return (
    <div>
      <main>


        <div>
          <Menu />
          <HeadImage image={data.headerImage} title={data.title} />

          <div
            className='backCurve5'
            style={{ display: 'flex', justifyContent: 'center', }} id='packageContainer'>
            <div style={{ width: '90%', display: isMobile ? "block" : "flex", gap: '4%', marginTop: '3%' }}>

              <div
                style={{ width: isMobile ? '100%' : "70%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
                <h1>About {data.title}</h1>

                <Divider style={{ margin: "0", backgroundColor: style.lightGrey, height: 1 }} />
                <String2Html id={'aboutPopularAttraction'} string={data.about} />

              </div>

              <div style={{ width: isMobile ? '100%' : '30%', background: 'white', padding: '3%', height: 'fit-content', flexDirection: 'column', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <h2 style={{ textAlign: 'center' }}>Visit Other Places of {dataParent.title}</h2>
                <Divider style={{ backgroundColor: style.lightGrey, height: 1 }} />
                {tileData.map((item, i) => (
                  <Tile key={i} thumbnail={item.image} name={"Place Name"} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

export async function getStaticPaths() {
  let allpaths = []
  db.collection("attractionBali").get().then((snap) => {
    snap.forEach((sndata) => {
      db.doc(`attractionBali/${sndata.id}`).collection("popularAttraction").get().then(data => {
        data.forEach((path) => {
          allpaths.push(path.data().slug)
        })
      })
    })
  })

  return {
    paths: allpaths.map((path) => (
      { params: { placeDetails: path } }
    )),
    fallback: true
  }

  
}

export async function getStaticProps(context) {
  const {place, placeDetails } = context.params
  // console.log(context.params)
  const res = await db.collection(`attractionBali`).where("slug", "==", `/attraction-Bali/${place}`).get()
  const entry = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  const getData = await db.doc(`attractionBali/${entry[0].id}`).collection("popularAttraction").where("slug", "==", `/attraction-Bali/${place}/${placeDetails}`).get()
  const data = getData.docs.map((d) => (d.data()))

  
  if (data.length == 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: data[0],
      dataParent: entry[0]
    },
    revalidate: 10,
  }
}
