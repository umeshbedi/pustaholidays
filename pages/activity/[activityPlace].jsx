import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import style from '@/styles/packageName.module.css'
import { Divider } from 'antd'
import { db } from '@/firebase'
import SHome from '@/components/skeleton/SHome'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false })


export default function Activity({ data }) {

    const { query } = useRouter()
    const headerImage = `https://picsum.photos/seed/sdf55/1280/500`


    if (data == undefined) return <SHome />

    function Tile({ thumbnail, name, slug }) {
        return (
            <div className={style.tile} style={{ height: 350, width: 250, position: 'relative', borderRadius: 40, overflow: 'hidden' }}>
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
                    width: '100% ',
                    padding: "0 10px",
                    textShadow: "2px 2px 4px #000000"
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
                    <HeadImage image={headerImage} title={"Activities"} />

                    <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
                        <h1>Activities in {query.activityPlace}</h1>
                        <p>Andman and Nicobar Island is a huge nation comprised of hundreds of cultures derived from local regions, making it one of the most diverse countries in the world. Explore the unique culture and heritage of each region in Indonesia!</p>

                        <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
                            <div className={style.packageRow}>
                                {data.map((item, index) => (
                                    <Tile key={index} thumbnail={item.thumbnail} name={item.name} slug={item.slug} />
                                ))}
                            </div>
                        </div>
                    </div>




                </div>
            </main>

        </div>
    )
}

export const getStaticPaths = async () => {
    const entriesAndaman = await db.collection("activityAndaman").get()
    const entriesBali = await db.collection("activityBali").get()
    const pathsAndaman = entriesAndaman.docs.map(entry => {
        
        return ({
            params: {
                activityPlace: entry.data().slug
            }
        })
    }
    );
    const pathsBali = entriesBali.docs.map(entry => ({
        params: {
            activityPlace: entry.data().slug
        }
    }));
    const allPaths = [...pathsAndaman, ...pathsBali]

    return {
        paths: allPaths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const { activityPlace } = context.params;

    const res = await db.collection(`${activityPlace == "Andaman" ? "activityAndaman" : "activityBali"}`).get()
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
            data: entry,
        },
        revalidate: 60,

    }

}


