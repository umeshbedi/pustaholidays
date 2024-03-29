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


export default function InfoDetails({ data }) {
  const { query } = useRouter()
  // console.log(data)
  

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

const datache = "<p style='font-weight:bold'>Lorem Lorem</p> Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem "

  
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
            <div style={{ width: '90%', display: isMobile ? "block" : "flex", marginTop: '3%' }}>

            <div
                style={{ width: '100%', background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15, }}>
                <h1>{data.title}</h1>
                <String2Html id={"pageContent"} string={data.about} />
              </div>


            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

export const getStaticPaths = async () => {
  const entries = await db.collection("generalInfo").get()
  const paths = entries.docs.map(entry => ({
    params: {
      infoDetails: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { infoDetails } = context.params;
  const res = await db.collection("generalInfo").where("slug", "==", `/general-info/${infoDetails}`).get()
  // console.log(res)

  const entry = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  if (entry.length == 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: entry[0],
    },
    revalidate: 60,

  }

}