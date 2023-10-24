import React, { useEffect, useState } from 'react'

import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { mobile } from '@/components/utils/variables';
import ContactForm from '@/components/master/ContactForm';

import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'
import SHome from '@/components/skeleton/SHome'

const Menu = dynamic(() => import("@/components/master/header"), { ssr: false, loading: () => <SHeader /> })
const HeadImage = dynamic(() => import("@/components/master/HeadImage"), { ssr: false, loading: () => <SHome /> })


export default function ContactUsPage() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    const dataSource = [
        {
            key: 'Email',
            value: '10 Downing Street',
        },
        {
            key: 'John',
            value: '10 Downing Street',
        },
    ];

    return (
        <main>
            <Menu/>
            <HeadImage image='/contact us page.jpg' title={"Contact Us"}/>
            <div style={{display:'flex', justifyContent:'center', background:'var(--lightBackground)'}}>
                <div style={{ width: '80%', margin:"3rem 0" }}>
                    <h1 style={{ color: "grey" }}><span style={{ color: "var(--primaryColor)" }}>Connect</span> With Us</h1><br />
                    <p>We would love to respond to your queries and help you succeed.</p>
                    <p>Feel free to get in touch with us.</p>
                    <br />
                    <br />
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? "auto" : "60% 40%" }}>
                        <div style={{ background: 'white', padding: '5%', height: 'fit-content' }}>
                            <ContactForm
                                packageName={"Contact Us"}
                                packageDetail={"Message from Contact Us Page"}
                            />
                        </div>
                        <div style={{ background: "black", padding: '5%', flexDirection: 'column', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', color: 'white', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                                <FiMapPin style={{ fontSize: 35 }} />
                                <h2 style={{ color: "var(--primaryColor)" }}>Address</h2>
                                <p style={{ textAlign: 'center', lineHeight: '140%' }}>
                                    Sardar Bhagwan Singh Shopping Complex, Dollygunj, Port Blair, Andaman and Nicobar Islands 744103
                                </p>
                                <hr style={{ width: '80%' }} />
                            </div>
                            <div style={{ display: 'flex', color: 'white', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                                <FiMail style={{ fontSize: 35 }} />
                                <h2 style={{ color: "var(--primaryColor)" }}>Email</h2>
                                <p style={{ textAlign: 'center', lineHeight: '140%' }}>pustaholidays@gmail.com</p>
                                <hr style={{ width: '80%' }} />
                            </div>
                            <div style={{ display: 'flex', color: 'white', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                                <FiPhone style={{ fontSize: 35 }} />
                                <h2 style={{ color: "var(--primaryColor)" }}>Contact No.</h2>
                                <p style={{ textAlign: 'center', lineHeight: '140%' }}>+91 9999999999, +91 8888888888</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    )
}
