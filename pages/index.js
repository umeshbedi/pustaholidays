import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'


const inter = Inter({ subsets: ['latin'] })

const Menu = dynamic(() => import("@/components/master/header"))
const Slider = dynamic(() => import("@/components/homepage/Slider"))
const Journey = dynamic(()=>import('@/components/homepage/Journey'))
const Counter = dynamic(()=>import('@/components/homepage/Counter'))
const Testimonials = dynamic(()=>import('@/components/homepage/Testimonials'))


export default function Home() {
  return (
    <>
      <Head>
        <title>Pusta Holidays App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu />

        <div >
          <Slider />
          <Journey />
          <Counter/>
          <Testimonials/>
        </div>
      </main>
    </>
  )
}
