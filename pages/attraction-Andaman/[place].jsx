import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import style from '@/styles/packageName.module.css'
import { Divider } from 'antd'
import { db } from '@/firebase'
import SHome from '@/components/skeleton/SHome'
import String2Html from '@/components/master/String2Html'

const Menu = dynamic(() => import("@/components/master/header"), {ssr:false})
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), {ssr:false})


export default function Place({data}) {
    const { query } = useRouter()
   
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
                            {name}
                        </h1>

                    </div>
                </a>
            </div>
        )
    }


    
    if(data==undefined)return <SHome/>
    return (

        <main>
            
            <div>
                <Menu />
                <HeadImage image={data.headerImage} title={data.title} />

                <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem" }}>
                    {/* <h1>This is {query.place} Page</h1> */}
                    <h1>Popular Attractions</h1>
                    <Divider/>
                    <div style={{ display: "flex", justifyContent: 'center', width: "100%", marginTop: '2rem' }}>
                        <div className={style.packageRow}>
                            {data.popularAttData.map((item, index) => (
                                <Tile key={index} thumbnail={item.thumbnail} name={item.title} slug={item.slug} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </main>


    )
}

export const getStaticPaths = async () => {
    
    const entriesBali = await db.collection("attractionAndaman").get()
    
    const pathsBali = entriesBali.docs.map(entry => ({
        params: {
            place: entry.data().slug
        }
    }));
    
     return {
         paths:pathsBali,
         fallback: true
     }
   }
   
   export const getStaticProps = async (context) => {
     const {place } = context.params;
     const res = await db.collection(`attractionAndaman`).where("slug", "==", `/attraction-Andaman/${place}`).get()

   
     const entry = res.docs.map((entry) => {
       return ({ id: entry.id, ...entry.data() })
     });

     if (entry.length == 0) {
        return {
          notFound: true
        };
      }
 
     const popularAtt = await db.doc(`attractionAndaman/${entry[0].id}`).collection('popularAttraction').get()
     const popularAttData = popularAtt.docs.map((popularAtt) => {
         return ({ id: popularAtt.id, ...popularAtt.data() })
       });
   
     
   
     return {
       props: {
         data: {popularAttData, ...entry[0]},
       },
       revalidate: 60,
   
     }
   
   }