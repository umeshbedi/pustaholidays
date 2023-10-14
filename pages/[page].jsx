import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import style from '@/styles/packageName.module.css'
import { db } from '@/firebase'
import SHome from '@/components/skeleton/SHome'
import String2Html from '@/components/master/String2Html'

const Menu = dynamic(() => import("@/components/master/header"), {ssr:false})
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), {ssr:false})


export default function Pages({data}) {
    const { query } = useRouter()
    const headerImage = `https://picsum.photos/seed/sdf${Math.random(0, 100)}/1280/500`

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
    if(data==undefined)return <SHome/>
    return (
        <div>
            <main>


                <div>
                    <Menu />
                    <HeadImage image={data.headerImage} title={data.title}/>

                    <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
                        <h1>{data.title}</h1>
                        <String2Html id={"pageContent"} string={data.about}/>
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