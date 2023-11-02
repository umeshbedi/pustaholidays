import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/packageName.module.css'
import { db } from '@/firebase'
import SHome from '@/components/skeleton/SHome'
import String2Html from '@/components/master/String2Html'
import { mobile } from '@/components/utils/variables'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function Pages({ data }) {
  const { query } = useRouter()
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

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
                style={{ width: '100%', background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
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
  const entries = await db.collection("pages").get()
  const paths = entries.docs.map(entry => ({
    params: {
      page: `/${entry.id}`
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { page } = context.params;
  const res = await db.collection("pages").doc(`${page}`).get()

  // console.log(res.data())

  if (res.data() == undefined) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: res.data(),
    },
    revalidate: 60,

  }

}