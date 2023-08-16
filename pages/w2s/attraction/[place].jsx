import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import style from '@/styles/packageName.module.css'
import { Divider } from 'antd'

const Menu = dynamic(() => import("@/components/master/header"), {ssr:false})
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), {ssr:false})


export default function Place() {
    const { query } = useRouter()
    const headerImage = `https://picsum.photos/seed/sdf${Math.random(0, 100)}/1280/500`

    const tileData = [
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug: `/package/${query.packageName}/abctest` },
    ]

    function Tile({ thumbnail, name, slug }) {
        return (
            <div className={style.tile} style={{ height: 350, width: 250, position: 'relative', borderRadius: 40, overflow: 'hidden' }}>
                <a href={slug}>

                    <Image
                        src={thumbnail}
                        alt={name}
                        height={250}
                        width={250}
                        style={{ objectFit: 'cover' }}
                        loading='lazy'
                        placeholder='blur'
                        blurDataURL={thumbnail + '?blur'}
                    />

                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:100, flexDirection:'column'}}>

                        <h1 style={{
                            fontWeight: 700,
                            fontSize: "1.5rem",
                            textAlign: 'center',
                            position: 'absolute',
                            width: '100% ',
                            padding:"0 5%",
                            // background:'yellow'
                        }}
                        >
                            Something Heading
                        </h1>

                    </div>
                </a>
            </div>
        )
    }
    return (

        <main>
            
            <div>
                <Menu />
                <HeadImage image={headerImage} title={query.place != undefined ? query.place : null} />

                <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
                    {/* <h1>This is {query.place} Page</h1> */}
                    <p>{query.place} is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p>
                    <Divider/>
                    <h1>Popular Attractions</h1>
                    <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
                        <div className={style.packageRow}>
                            {tileData.map((item, index) => (
                                <Tile key={index} thumbnail={item.image} name={"Place Name"} slug={"/w2s/attraction/Place Name/Place Details"} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </main>


    )
}
