
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/Home.module.css'
import { Col, Row, Modal, Divider } from 'antd'
import Image from 'next/image'
import { FaMap, FaUser } from 'react-icons/fa'
import { CarFilled } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'
import { boxShadow, mobile } from '@/components/utils/variables'
import SHome from '@/components/skeleton/SHome'
import { db } from '@/firebase'
import Tile from '@/components/master/SingleTile'
import ContactForm from '@/components/master/ContactForm'

const HeadImage = dynamic(import('@/components/master/HeadImage'), { ssr: false, loading: () => <SHome /> })
const Header = dynamic(import("@/components/master/header"), { ssr: false, loading: () => <SHeader /> })
// const Footer = dynamic(() => import('@/components/Footer'))


export default function Cab({ data, sortedData }) {

    const [isMobile, setIsMobile] = useState(false)
    const [height, setHeight] = useState(null)
    const [cabsList, setCabsList] = useState([])
    const [activityDetails, setActivityDetails] = useState({})
    const [open, setOpen] = useState(false)


    useEffect(() => {
        setIsMobile(mobile())

    }, [isMobile])

    useEffect(() => {
        if (data != undefined) {
            db.doc(`rentalBali/${data.id}`).collection('cabs').get().then((snap) => {
                const dataTemp = []
                snap.forEach(data => {
                    dataTemp.push({ id: data.id, ...data.data() })
                })

                setCabsList(dataTemp)
            })

        }
    }, [data])


    function SingleCab({ thumbnail, title, price, distance }) {
        return (
            <div
                data-aos-anchor-placement="top-bottom"
                data-aos="fade-up"
                data-aos-duration="2000"
                style={{ backgroundColor: 'white', borderRadius: 30, boxShadow: boxShadow, }}>
                <div
                    style={{
                        width: "100%",
                        display: isMobile ? "block" : 'flex',
                        gap: "3%",
                        padding: isMobile ? "20px 20px 0 20px" : "20px 0 0 20px"
                    }}
                >
                    <div style={{ width: isMobile ? "100%" : "15%", display: 'flex', justifyContent: 'center', marginBottom: isMobile ? "1.5rem" : null }}>
                        <div style={{ width: isMobile ? 200 : 100, position: 'relative', height: isMobile ? 200 : 100 }}>
                            <Image src={thumbnail} fill style={{ objectFit: 'cover', borderRadius: 20 }} />
                        </div>

                    </div>

                    <div style={{ width: isMobile ? "100%" : "60%" }}>
                        <h2 style={{ fontWeight: 600, fontSize: "1.3rem", textAlign: isMobile ? "center" : null }}>{title}</h2>

                        <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow', marginTop: "2rem" }}>
                            <div style={{ width: "90%", height: 1, background: '#98a6b3', position: 'absolute' }} />
                            <p style={{ position: 'absolute', alignSelf: 'center', background: 'white', border: "1px solid #98a6b3", borderRadius: 50, padding: "1px 15px", color: 'grey' }}>Distance: {distance} kms</p>
                        </div>
                    </div>

                    <div style={{ width: isMobile ? "100%" : "25%", flexDirection: 'column', display: "flex", justifyContent: 'space-between', borderLeft: isMobile ? null : "1px solid #e2e8ee", marginTop: isMobile ? "2.5rem" : null }}>
                        <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                            <h3>Offer Price:</h3>
                            <h1 style={{ fontSize: '2rem' }}>IDR {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h1>
                        </div>
                        <div style={{ height: "3rem", width: '100%', background: "var(--primaryColor)", marginTop: "1.5rem", display: 'flex', alignItems: "center", justifyContent: 'center', cursor: 'pointer', borderRadius: isMobile ? 50 : null }}
                        onClick={() => {
                            setOpen(true);
                            setActivityDetails({
                                name: title,
                                distance: distance,
                                price: `IDR ${price}`
                            })
                        }}
                        >
                            <p style={{ fontSize: "1.2rem", color: "white" }}>Book Now</p>
                        </div>

                    </div>
                </div>

                <div style={{ width: isMobile ? "100%" : "75%", height: 1, background: '#e2e8ee', margin: "1rem 0" }} />
                <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem", marginLeft: "1rem", }}>
                    <p style={{ background: 'white', border: "1px solid #e2e8ee", borderRadius: 50, padding: "5px 15px", color: 'grey', fontSize: isMobile ? 12 : 16 }}><FaMap /> Pickup/Drop</p>
                    <p style={{ background: 'white', border: "1px solid #e2e8ee", borderRadius: 50, padding: "5px 15px", color: 'grey', fontSize: isMobile ? 12 : 16 }}><CarFilled /> Cab</p>
                    <p style={{ background: 'white', border: "1px solid #e2e8ee", borderRadius: 50, padding: "5px 15px", color: 'grey', fontSize: isMobile ? 12 : 16 }}><FaUser /> Travel Executive</p>
                </div>
            </div>
        )
    }


    if (data == undefined) return <SHome />
    return (
        <div>

            <Header />

            <HeadImage image={data.headerImage} />

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "3rem" }}>
                <div style={{ width: '90%', display: isMobile ? "block" : "flex", gap: '3%', marginTop: '3%' }}>
                    <div style={{ width: isMobile ? "100%" : "65%", display: 'flex', flexDirection: 'column', gap: "2rem", overflow: 'hidden' }}>
                        <h1 style={{ fontWeight: 900, fontSize: isMobile ? "2rem" : "2.5rem" }}>{data.title}</h1>

                        {cabsList.map((item, index) => (
                            <SingleCab thumbnail={item.thumbnail} price={item.price} title={item.title} distance={item.distance} key={index} />
                        ))}
                    </div>

                    <div style={{ width: isMobile ? "100%" : '35%', height: 'fit-content', marginTop: isMobile ? "4.5rem" : null }} id='ticketCollapse'>
                        <div style={{ padding: '5%', marginTop: "2rem", display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <h2 style={{ textAlign: "center", marginBottom: "1rem", padding: '0 10%' }}>Activities of Bali</h2>
                            {sortedData.map((item, i) => {
                                return (<Tile key={i} name={item.name} slug={item.slug} thumbnail={item.thumbnail} />)

                            })
                            }
                        </div>
                    </div>

                </div>
            </div>


            {/* <Footer /> */}
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={[]}
            >
                <h2>Booking:</h2>
                <Divider style={{ margin: '1%' }} />
                <h1 style={{ margin: '1% 0', fontSize: '2rem' }}>{activityDetails.price}</h1>
                <ContactForm
                    to={'activity'}
                    packageName={`Cab | ${data.title}`}
                    packageDetail={`
          <p>Cab Name: ${activityDetails.name}</p>
          <p>Price: ${activityDetails.price}</p>
          <p>Distance: ${activityDetails.distance} kms</p>
        `}
                />
            </Modal>


        </div>
    )
}

export const getStaticPaths = async () => {
    const entriesBali = await db.collection("rentalBali").get()
    const pathsBali = entriesBali.docs.map(entry => ({
        params: {
            baliCabName: entry.data().slug
        }
    }));

    return {
        paths: pathsBali,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const { baliCabName } = context.params;
    const res = await db.collection("rentalBali").where("slug", "==", `/cabs/Bali/${baliCabName}`).get()


    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    const resBali = await db.collection("activityBali").get()
    const entryBali = resBali.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    let sortedData = []

    function GetRand(num) {
        var ran = Math.floor(Math.random() * num)
        if (num > 3 && num - ran >= 3) {
            for (let index = 0; index < 3; index++) {
                sortedData.push(entryBali[ran])
                ran += 1

            }
        }
        else if (num <= 3) {
            for (let index = 0; index < num; index++) {
                sortedData.push(entryBali[index])
            }
        }
        else { GetRand(num) }
    }

    GetRand(entryBali.length)


    if (entry.length == 0) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: entry[0],
            sortedData
        },
        revalidate: 60,

    }

}