import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
const Menu = dynamic(() => import("@/components/master/header"))
import style from '@/styles/packageName.module.css'

const HeadImage = dynamic(() => import("@/components/master/HeadImage"))


export default function PackageName() {
    const { query } = useRouter()
    const headerImage = `https://picsum.photos/seed/sdf${Math.random(0, 100)}/1280/500`

    const tileData = [
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
        { image: `https://picsum.photos/seed/sdf${Math.random(0, 100)}/250/350`, slug:`/package/${query.packageName}/abctest` },
    ]

    function Tile({ thumbnail, name, slug }) {
        return (
            <div className={style.tile} style={{ height: 350, width: 250, position: 'relative', borderRadius: 40, overflow:'hidden' }}>
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
                    bottom:20,
                    textAlign:'center',
                    position: 'absolute',
                    width:'100% '
                }}
                >
                    {name}
                </h1>
            </div>
        )
    }
    return (
        <div>
            <main>


                <div>
                    <Menu />
                    <HeadImage image={headerImage} title={query.packageName!=undefined?query.packageName+" Package":null}/>

                    <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
                        <h1>The best tour packages are waiting for you</h1>
                        <p>Indonesia is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p>

                        <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop:'2rem' }}>
                            <div className={style.packageRow}>
                                {tileData.map((item, index) => (
                                    <Tile key={index} thumbnail={item.image} name={"Place Name"} slug={item.slug}/>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}
