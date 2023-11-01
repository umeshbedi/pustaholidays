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
import Tile from '@/components/master/SingleTile'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function DestDetails({ data, sortedData }) {
  console.log(data)
  const { query } = useRouter()
  const headerImage = `https://picsum.photos/seed/sdf${Math.random(0, 100)}/1280/500`

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  const tileData = [
    { image: `https://picsum.photos/seed/sdf234/250/350`, slug: `/package/${query.packageName}/abctest` },
    { image: `https://picsum.photos/seed/sdf4365/250/350`, slug: `/package/${query.packageName}/abctest` },
  ]


  if (data == undefined) return <SHome />
  return (
    <div>
      <main>


        <div>
          <Menu />
          <HeadImage image={data.headerImage} />

          <div
            className='backCurve5'
            style={{ display: 'flex', justifyContent: 'center', }} id='packageContainer'>
            <div style={{ width: '90%', display: isMobile ? "block" : "flex", gap: '4%', marginTop: '3%' }}>

              <div
                style={{ width: isMobile ? '100%' : "70%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
                <h1>{data.title}</h1>

                <Divider style={{ margin: "0", backgroundColor: style.lightGrey, height: 1 }} />
                {/* <String2Html id={'aboutIsland'} string={islandItem.about} /> */}
                <String2Html string={data.about} id={"destonationDetail"} />

              </div>

              <div style={{ width: isMobile ? '100%' : '30%', background: 'white', padding: '3%', height: 'fit-content', flexDirection: 'column', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <h2 style={{ textAlign: 'center' }}>Visit Other Destinations of Andaman</h2>
                <Divider style={{ backgroundColor: style.lightGrey, height: 1 }} />
                {sortedData.map((item, i) => {
                  if (item.id !== data.id) {
                    return (
                      <Tile key={i} name={item.title} slug={item.slug} thumbnail={item.thumbnail} />
                    )
                  }
                })}
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

export const getStaticPaths = async () => {
  const entriesBali = await db.collection("destinationAndaman").get()
  const pathsBali = entriesBali.docs.map(entry => ({
    params: {
      destDetails: entry.data().slug
    }
  }));

  return {
    paths: pathsBali,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { destDetails } = context.params;
  const res = await db.collection("destinationAndaman").where("slug", "==", `/destination/Andaman/${destDetails}`).get()

  const entry = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });


  const resAndaman = await db.collection("destinationAndaman").get()
  const entryAndaman = resAndaman.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  let sortedData = []

  function GetRand(num) {
    var ran = Math.floor(Math.random() * num)
    if (num > 4 && num - ran >= 4) {
      for (let index = 0; index < 4; index++) {
        sortedData.push(entryAndaman[ran])
        ran += 1

      }
    }
    else if (num <= 4) {
      for (let index = 0; index < num; index++) {
        sortedData.push(entryAndaman[index])
      }
    }
    else { GetRand(num) }
  }

  GetRand(entryAndaman.length)


  if (entry.length == 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: entry[0],
      sortedData
    },
    revalidate: 60,

  }

}
