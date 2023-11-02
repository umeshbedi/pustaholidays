import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import style from '@/styles/packageName.module.css'

import React, { useEffect, useState } from 'react'
import SHeader from '@/components/skeleton/SHeader'
import SHome from '@/components/skeleton/SHome'
import { db } from '@/firebase'
import { Segmented } from 'antd'
import Tile from '@/components/master/SingleTile'
const Menu = dynamic(() => import("@/components/master/header"), { ssr: false, loading: () => <SHeader /> })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false, loading: () => <SHome /> })


export default function PackageName({ data, allData, banner }) {

    const { query } = useRouter()


    const [packageData, setPackageData] = useState([])
    const [tabName, setTabName] = useState([])


    function fetchData(id) {
        const getID = data.find(f => f.name == id)
        const parentID = allData.find(f => f.parentID == getID.id)
        setPackageData(parentID.childData)
    }

    useEffect(() => {
        if (data != undefined && allData != undefined) {
            fetchData(data[0].name)
        }
    }, [data])

    if (data == undefined) return <SHome />
    let tabTemp = []
    data.map((item, index) => {
        tabTemp.push(item.name)
    })

    return (
        <div>
            <main>


                <div>
                    <Menu />
                    <HeadImage image={banner} title={query.packageName != undefined ? query.packageName + " Package" : null} />

                    <div style={{ padding: "5% 3rem", width: "100%", display: 'flex', flexDirection: 'column', gap: "1rem", background:'var(--lightGreyColor)' }}>
                        {query.packageName == "Bali" ?
                            (<div>
                                <h1>The Best Curated Bali Packages</h1>
                                <p>Discover the ultimate Bali experience with Pusta Holidays, where your dream vacation becomes a reality. Our expertly crafted Bali Packages are designed to immerse you in the enchanting beauty and vibrant culture of Bali, all while ensuring your convenience and comfort.</p>
                                <p>{`At Pusta Holidays, we leave no stone unturned to provide you with the best Bali has to offer. Our comprehensive Bali Packages cover all the island's hidden gems and iconic destinations, creating an unforgettable journey filled with breathtaking landscapes, pristine beaches, lush rice terraces, and rich cultural encounters.`}</p>
                            </div>)
                            :
                            (<div>
                                <h1>The Best Curated Andaman Islands Packages</h1>
                                <p>{`Discover paradise with Pusta Holidays! Our exceptional Andaman Holiday Packages offer an unforgettable journey through the pristine islands of the Andaman archipelago. When you choose Pusta Holidays, you're choosing the very best in Andaman travel experiences. Our meticulously crafted packages provide comprehensive coverage of all that the Andaman Islands have to offer.`}</p>
                                
                            </div>)
                        }

                        <div style={{ marginTop: '2rem', overflowX:'scroll' }} className='segmented'>
                            <Segmented options={tabTemp} size='large' onChange={fetchData} style={{ boxShadow: "0px 0px 20px rgba(0,0,0,.2)" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center', width: "100%", }}>
                            <div className={style.packageRow}>
                                {packageData.map((item, index) => (
                                    <Tile key={index} thumbnail={item.thumbnail} name={item.title} slug={item.slug} />
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
    const entriesAndaman = await db.collection("packageAndaman").get()
    const entriesBali = await db.collection("packageBali").get()
    const pathsAndaman = entriesAndaman.docs.map(entry => {

        return ({
            params: {
                packageName: entry.data().slug
            }
        })
    }
    );
    const pathsBali = entriesBali.docs.map(entry => ({
        params: {
            packageName: entry.data().slug
        }
    }));
    const allPaths = [...pathsAndaman, ...pathsBali]

    return {
        paths: allPaths,
        fallback: true
    }
}


export const getStaticProps = async (context) => {
    const { packageName } = context.params;
    console.log(context)
    const packagegroup = `${packageName == "Andaman" ? "packageAndaman" : packageName == "Bali" ? "packageBali" : null}`
    const res = await db.collection(`${packagegroup}`).get()
    // console.log(res)

    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });
    let allData = []
    for (let i = 0; i < entry.length; i++) {
        const getData = await db.doc(`${packagegroup}/${entry[i].id}`).collection("singlePackage").where("status", "==", "published").get()
        const data = getData.docs.map((d) => ({ id: d.id, ...d.data() }))
        allData.push({ parentID: entry[i].id, childData: data })
    }

    const bannerAndaman = (await db.doc(`pages/allPageBanner`).get()).data().PackageAndamanPage;
    const bannerBali = (await db.doc(`pages/allPageBanner`).get()).data().PackageBaliPage;

    if (entry.length == 0) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: entry,
            allData,
            banner: packageName == "Andaman" ? bannerAndaman : packageName == "Bali" ? bannerBali : null
        },
        revalidate: 60,

    }

}