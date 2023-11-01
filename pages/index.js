import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import { mobile } from '@/components/utils/variables'
import { useEffect, useState } from 'react'
import SHome from '@/components/skeleton/SHome'
import { db } from '@/firebase'
import { FloatButton } from 'antd'
import { FaWhatsapp } from 'react-icons/fa'


const inter = Inter({ subsets: ['latin'] })


const DivCarousel2 = dynamic(() => import('@/components/homepage/DivCarousel2'), { ssr: false, loading: () => <SHome /> })
const Menu = dynamic(() => import("@/components/master/header"), { ssr: false, loading: () => <SHome /> })
const Slider = dynamic(() => import("@/components/homepage/Slider"), { ssr: false, loading: () => <SHome /> })
const Journey = dynamic(() => import('@/components/homepage/Journey'), { ssr: false, loading: () => <SHome /> })
const Counter = dynamic(() => import('@/components/homepage/Counter'), { ssr: false, loading: () => <SHome /> })
const Testimonials = dynamic(() => import('@/components/homepage/Testimonials'), { ssr: false, loading: () => <SHome /> })
const DivCarousel = dynamic(() => import("@/components/homepage/DivCarousel"), { ssr: false, loading: () => <SHome /> })
const Authorities = dynamic(() => import("@/components/homepage/Authorities"), { ssr: false, loading: () => <SHome /> })
const WhatTheySay = dynamic(() => import("@/components/homepage/WhatSay"), { ssr: false, loading: () => <SHome /> })


export default function Home({
  data,
  testimonials,
  tarvelJourney,
  InsightBanner,
  ferryData,
  desEntryAndaman,
  desEntryBali,
  activityDataAndaman,
  activityDataBali
}) {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])


  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={data.metaTag}></meta>
      </Head>
      <main>
        <Menu />

        <div >
          <Slider sliderData={data.banner} />

          <div style={{ marginTop: "3rem" }}>
            {isMobile ? (<></>
              // <Package
              //   lightHead={"Destination "}
              //   darkHead={"in Bali"}
              //   button={{ name: "All Destination", slug: "/destination" }}

              // />
            ) : (
              <DivCarousel
                lightHead={"Handpicked Destination "}
                darkHead={"in Bali"}
                button={{ name: "All Destination", slug: "/destination" }}
                backgroundImage={InsightBanner.HomeBaliInsight}
                category={'destination'}
                sliderContent={desEntryBali}
              />

            )}


            {isMobile ? (
              <></>
              // <Package
              //   lightHead={"Destination "}
              //   darkHead={"in Andaman"}
              //   button={{ name: "All Destination", slug: "/destination" }}

              // />
            ) : (
              <DivCarousel
                lightHead={"Destination "}
                darkHead={"in Andaman (India)"}
                button={{ name: "All Destination", slug: "/destination" }}
                backgroundImage={InsightBanner.HomeAndamanInsight}
                category={'destination'}
                sliderContent={desEntryAndaman}
              />

            )}


            {isMobile ? (
              <></>
              // <Package
              //   lightHead={"Cruises "}
              //   darkHead={"in Andaman"}
              //   button={{ name: "All Hotels", slug: "/destination" }}

              // />
            ) : (
              <DivCarousel
                lightHead={"Luxury Cruises"}
                darkHead={" In Andaman (India)"}
                button={{ name: "All Cruises", slug: "/cruises" }}
                backgroundImage={InsightBanner.HomeCruizeInsight}
                sliderContent={ferryData}
                category={'cruise'}
              />

            )}

            <DivCarousel2 title={"Activities in Bali"} sliderContent={activityDataBali}/>
            <DivCarousel2 title={"Activities in Andaman (India)"} sliderContent={activityDataAndaman}/>

          </div>
          <Journey youtube={tarvelJourney} />

          <Counter />
          <Testimonials testimonialsData={testimonials} />
          <WhatTheySay />
          <Authorities />
          
        </div>
      </main>
    </>
  )
}


export const getStaticProps = async () => {
  const res = await db.doc(`pages/homepage`).get();
  const InsightBanner = await db.doc(`pages/allPageBanner`).get();

  const desAndaman = await db.collection('destinationAndaman').get()
  const desEntryAndaman = desAndaman.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });
  const desBali = await db.collection('destinationBali').get()
  const desEntryBali = desBali.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  //Getting Activity
  const actvtyAndaman = await db.collection("activityAndaman").get();
  const activityDataAndaman = actvtyAndaman.docs.map((act) => {
    const data = act.data()
    return { name: data.name, thumbnail: data.thumbnail, slug: data.slug }
  })

  const actvtyBali = await db.collection("activityBali").get();
  const activityDataBali = actvtyBali.docs.map((act) => {
    const data = act.data()
    return { name: data.name, thumbnail: data.thumbnail, slug: data.slug }
  })

  //Getting Ferry
  const ferry = await db.collection("ferry").get();
  const ferryData = ferry.docs.map((fer) => {
    const data = fer.data()
    return { name: data.name, thumbnail: data.image, slug: data.slug }
  })

  //Getting Testimonials
  const testimonials = await db.doc(`pages/testimonials`).get()

  //Getting Travel Journey
  const tarvelJourney = await db.doc(`pages/travelJourney`).get()

  // console.log(activityDataBali)

  return {
    props: {
      data: res.data(),
      desEntryBali,
      desEntryAndaman,
      activityDataAndaman,
      activityDataBali,
      ferryData,
      // offerItems,
      InsightBanner: InsightBanner.data(),
      tarvelJourney: tarvelJourney.data(),
      testimonials: testimonials.data().testimonials
    },
    revalidate: 60,

  }

}