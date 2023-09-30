
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/Home.module.css'
import { Col, Row } from 'antd'
import Image from 'next/image'
import { FaMap, FaUser } from 'react-icons/fa'
import { CarFilled } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'
import { boxShadow, mobile } from '@/components/utils/variables'
import SHome from '@/components/skeleton/SHome'
import { db } from '@/firebase'

const HeadImage = dynamic(import('@/components/master/HeadImage'), { ssr: false, loading: () => <SHome /> })
const Header = dynamic(import("@/components/master/header"), { ssr: false, loading: () => <SHeader /> })
// const Footer = dynamic(() => import('@/components/Footer'))


export default function Cab({data}) {

    console.log(data)

    const [isMobile, setIsMobile] = useState(false)
    const [height, setHeight] = useState(null)

    const query = useRouter().query

    
    const [size, setSize] = useState(115)

    

    useEffect(() => {
        setIsMobile(mobile())
        const heightMobile = document.documentElement.clientWidth
        const heightDesktop = document.documentElement.clientHeight - 80
        setHeight(isMobile ? heightMobile : heightDesktop)
    }, [isMobile])



   
    function SingleCab({thumbnail, title, price, distance}) {
        return (
            <div
                data-aos-anchor-placement="top-bottom"
                data-aos="fade-up"
                data-aos-duration="2000"
                style={{ backgroundColor: 'white', borderRadius: 30, boxShadow: boxShadow, margin:"0 20px 20px 20px"}}>
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
                            <h1 style={{fontSize:'2rem'}}>₹{price}</h1>
                        </div>
                        <div style={{ height: "3rem", width: '100%', background: "var(--primaryColor)", marginTop: "1.5rem", display: 'flex', alignItems: "center", justifyContent: 'center', cursor: 'pointer', borderRadius: isMobile ? 50 : null }}>
                            <p style={{ fontSize: "1.2rem", color: "white" }}>Enquire Now</p>
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

    const cabArr = [1, 1, 1, 1]
if (data==undefined) return <SHome/>
    return (
        <div>

            <Header />

            <HeadImage image={data.headerImage}/>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "3rem" }}>
                <div style={{ width: '90%', display: isMobile ? "block" : "flex", gap: '3%', marginTop: '3%' }}>
                    <div style={{ width: isMobile ? "100%" : "65%", display: 'flex', flexDirection: 'column', gap: "2rem",  overflow:'hidden' }}>
                        <h1 style={{ fontWeight: 900, fontSize: isMobile ? "2rem" : "2.5rem" }}>{data.title}</h1>

                        {data.cabData.map((item, index) => (
                            <SingleCab thumbnail={item.thumbnail} price={item.price} title={item.title} distance={item.distance} key={index} />
                        ))}
                    </div>

                    <div style={{ width: isMobile ? "100%" : '35%', height: 'fit-content', marginTop: isMobile ? "4.5rem" : null }} id='ticketCollapse'>
                        <h2 style={{ marginBottom: '5%', textAlign: 'center' }}>Popular Cruises</h2>
                    </div>

                </div>
            </div>
            
            
            {/* <Footer /> */}



        </div>
    )
}

export const getStaticPaths = async () => {
   const entriesBali = await db.collection("rentalAndaman").get()
   const pathsBali = entriesBali.docs.map(entry => ({
        params: {
            cabName: entry.data().slug
        }
    }));
    
    return {
        paths:pathsBali,
        fallback: true
    }
  }
  
  export const getStaticProps = async (context) => {
    const { cabName } = context.params;
    const res = await db.collection("rentalAndaman").where("slug", "==", `/cabs/Andaman/${cabName}`).get()
    console.log(cabName)
  
    const entry = res.docs.map((entry) => {
      return ({ id: entry.id, ...entry.data() })
    });

    const cab = await db.doc(`rentalAndaman/${entry[0].id}`).collection('cabs').get()
    const cabData = cab.docs.map((cab) => {
        return ({ id: cab.id, ...cab.data() })
      });
  
    if (entry.length == 0) {
      return {
        notFound: true
      };
    }
  
    return {
      props: {
        data: {cabData, ...entry[0]},
      },
      revalidate: 60,
  
    }
  
  }