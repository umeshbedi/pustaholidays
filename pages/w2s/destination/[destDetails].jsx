import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/packageName.module.css'
import { mobile } from '@/components/utils/variables'
import { Divider } from 'antd'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function DestDetails() {
  const { query } = useRouter()
  const headerImage = `https://picsum.photos/seed/sdf${Math.random(0, 100)}/1280/500`

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  const tileData = [
    { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
    { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
    { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
    { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },

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

  // console.log(query)
  return (
    <div>
      <main>


        <div>
          <Menu />
          <HeadImage image={headerImage} title={query.page != undefined ? query.page : null} />

          <div
            className='backCurve5'
            style={{ display: 'flex', justifyContent: 'center', }} id='packageContainer'>
            <div style={{ width: '90%', display: isMobile ? "block" : "flex", gap: '4%', marginTop: '3%' }}>

              <div
                style={{ width: isMobile ? '100%' : "70%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
                <h1>About {query.destDetails}</h1>

                <Divider style={{ margin: "0", backgroundColor: style.lightGrey, height: 1 }} />
                {/* <String2Html id={'aboutIsland'} string={islandItem.about} /> */}
                <p>
                  {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                  Why do we use it?
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


                  Where does it come from?
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                  The standard chunk of Lorem Ipsum used since the 150`}
                </p>

              </div>

              <div style={{ width: isMobile ? '100%' : '30%', background: 'white', padding: '3%', height: 'fit-content', flexDirection: 'column', display: 'flex', alignItems: 'center', overflow:'hidden' }}>
                <h2 style={{ textAlign: 'center' }}>Visit Other Places of {query.destDetails}</h2>
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
