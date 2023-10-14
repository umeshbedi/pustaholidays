import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import { mobile } from '@/components/utils/variables'
import { useEffect, useState } from 'react'
import SHome from '@/components/skeleton/SHome'
import { db } from '@/firebase'


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


export default function Home({data, testimonials}) {

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
        <meta name="author" content="Umesh Bedi, Linkedin: https://www.linkedin.com/in/umeshkumarbedi/"></meta>
        <link rel="icon" href="/Pustaholidays Icons500.png" />
      </Head>
      <main>
        <Menu />

        <div >
          <Slider sliderData={data.banner}/>

          <div style={{ marginTop: "3rem" }}>
            {isMobile ? (<></>
              // <Package
              //   lightHead={"Destination "}
              //   darkHead={"in Bali"}
              //   button={{ name: "All Destination", slug: "/destination" }}

              // />
            ) : (
              <DivCarousel
                lightHead={"Destination "}
                darkHead={"in Bali"}
                button={{ name: "All Destination", slug: "/destination" }}
                backgroundImage={`https://picsum.photos/seed/sdfpo0097/1200/720`}
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
                darkHead={"in Andaman"}
                button={{ name: "All Destination", slug: "/destination" }}
                backgroundImage={`https://picsum.photos/seed/sdf987gguu77/1200/720`}
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
                lightHead={"Cruises "}
                darkHead={"in Andaman"}
                button={{ name: "All Cruises", slug: "/cruises" }}
                backgroundImage={`https://picsum.photos/seed/sdfopi54r43ggkj/1200/720`}
              />

            )}

            <DivCarousel2 />

          </div>
          <Journey />

          <Counter />
          <Testimonials testimonialsData={testimonials}/>
          <WhatTheySay/>
          <Authorities />
        </div>
      </main>
    </>
  )
}


export const getStaticProps = async () => {
  const res = await db.doc(`pages/homepage`).get();
  

  // //Getting Package Data
  // const pkg = await db.collection("package").get();
  // const pkgId = pkg.docs.map((pkg, i) => {
  //   return { id: pkg.id }
  // })

  // let packageList = []
  // let offerItems = []

  // for (let i = 0; i < pkgId.length; i++) {
  //   const pkgd = await db.doc(`package/${pkgId[i].id}`).collection("singlePackage").limit(4).get();
  //   const pkgdata = pkgd.docs.map((d) => {
  //     const data = d.data()
  //     return { title: data.title, thumbnail: data.thumbnail, slug: data.slug }
  //   })
  //   packageList.push(pkgdata)

  //   const offer = await db.doc(`package/${pkgId[i].id}`).collection("singlePackage").where("isOffer","==", true).get();
  //   const offerData = offer.docs.map((d) => {
  //     const data = d.data()
  //     return { title: data.title, thumbnail: data.thumbnail, slug: data.slug }
  //   })
  //   offerItems.push(offerData)
  // }

  // //Getting Island Data
  // const island = await db.collection("island").get();
  // const islandData = island.docs.map((isl) => {
  //   const data = isl.data()
  //   return { name: data.name, slug: data.slug, thumbnail: data.thumbnail }
  // })

  // //Getting Activity
  // const actvty = await db.collection("activity").get();
  // const activityData = actvty.docs.map((act) => {
  //   const data = act.data()
  //   return { name: data.name, thumbnail: data.thumbnail, slug: data.slug }
  // })

  // //Getting Ferry
  // const ferry = await db.collection("ferry").get();
  // const ferryData = ferry.docs.map((fer) => {
  //   const data = fer.data()
  //   return { name: data.name, thumbnail: data.image, slug: data.slug }
  // })

  //Getting Testimonials
  const testimonials = await db.doc(`pages/testimonials`).get()


  // console.log(offerItems)

  return {
    props: {
      data: res.data(),
      // packageList,
      // islandData,
      // activityData,
      // ferryData,
      // offerItems,
      testimonials: testimonials.data().testimonials
    },
    revalidate: 60,

  }

}