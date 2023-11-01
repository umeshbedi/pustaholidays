import React, { useEffect, useState } from 'react'

import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { mobile } from '@/components/utils/variables';
import ContactForm from '@/components/master/ContactForm';

import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'
import SHome from '@/components/skeleton/SHome'
import Location from '@/components/master/Location';

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false, loading: () => <SHeader /> })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false, loading: () => <SHome /> })


export default function ContactUsPage() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    function Address({Address, Email, Contact}) {
        return (
            <div style={{ background: "black", padding: '3%', flexDirection: 'column', display: 'flex', gap:"1.5rem" }}>
                <div style={{ display: 'flex', color: 'white', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <h2 style={{ color: "var(--primaryColor)",alignItems:'center', display:'flex', gap:5 }}><FiMapPin style={{ fontSize: 25 }} />Address</h2>
                    <p style={{ textAlign: 'center', lineHeight: '140%' }}>
                        Sardar Bhagwan Singh Shopping Complex, Dollygunj, Port Blair, Andaman and Nicobar Islands 744103
                    </p>
                    <hr style={{ width: '80%' }} />
                </div>
                <div style={{ display: 'flex', color: 'white', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    
                    <h2 style={{ color: "var(--primaryColor)", alignItems:'center', display:'flex', gap:5 }}><FiMail style={{ fontSize: 25 }} />Email</h2>
                    <p style={{ textAlign: 'center', lineHeight: '140%' }}>pustaholidays@gmail.com</p>
                    <hr style={{ width: '80%' }} />
                </div>
                <div style={{ display: 'flex', color: 'white', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <h2 style={{ color: "var(--primaryColor)",alignItems:'center', display:'flex', gap:5 }}><FiPhone style={{ fontSize: 25 }} />Contact No.</h2>
                    <p style={{ textAlign: 'center', lineHeight: '140%' }}>+919999999999, +918888888888</p>

                </div>
                <div>
                    <Location location={"11.624503412464316, 92.7231522616873"}/>
                </div>
            </div>
        )
    }

    return (
        <main>
            <Menu />
            <HeadImage image='/contact us page.jpg' title={"Contact Us"} />
            <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--lightBackground)' }}>
                <div style={{ width: '90%', margin: "3rem 0" }}>
                    <h1 style={{ color: "grey" }}><span style={{ color: "var(--primaryColor)" }}>Connect</span> With Us</h1><br />
                    <p>We would love to respond to your queries and help you succeed.</p>
                    <p>Feel free to get in touch with us.</p>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: isMobile ? "column" : "row",background: 'white' }}>
                        <Address/>
                        <div style={{ padding: '3%', height: 'fit-content', width:'90%' }}>
                            <ContactForm
                                packageName={"Contact Us"}
                                packageDetail={"Message from Contact Us Page"}
                            />
                        </div>
                        <Address/>


                    </div>

                </div>
            </div>
        </main>
    )
}
