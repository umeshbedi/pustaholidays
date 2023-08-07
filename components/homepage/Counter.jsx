import React, { useEffect, useRef, useState } from 'react'
import style from './Counter.module.css'
import MyButton from '../utils/MyButton'
import CountUp from 'react-countup'
import { useIsVisible } from '../utils/onVisible'
import { FaPlus } from 'react-icons/fa'
import { mobile } from '../utils/variables'

export default function Counter() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    const ref = useRef();
    const isVisible = useIsVisible(ref)

    function Timer({time, upText, lowText}) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 102, }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CountUp style={{ fontSize: "2.5rem", fontWeight: 800 }} duration={5} start={isVisible ? 100 : null} end={isVisible ? time : null} />
                    <FaPlus style={{ marginLeft: 3, marginTop: -10 }} />
                </div>
                <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>{upText}</p>
                <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>{lowText}</p>
            </div>
        )
    }

    const timerVal = [
        {time:500, upText:"Tours", lowText:"Completed"},
        {time:650, upText:"Satisfied", lowText:"Clients"},
        {time:800, upText:"Rooms", lowText:"Booked"},
        {time:999, upText:"Activities", lowText:"Booked"},
    ]

    return (
        <div
            className={style.counterDiv}
            style={{
                position: 'relative',
                padding: isMobile?"2.5rem 0 2rem 0":'90px 0 116px',
                marginBottom:!isMobile?320:null
            }}
        >
            <div style={{ marginLeft: isMobile ? "5%" : '50%', paddingRight: "5%", zIndex:2 }}>
                <h1 style={{ fontWeight: 600, fontSize: "2.5rem" }}>Discover with the leader of andaman tourism. We are
                    <span style={{ fontWeight: 900, color: "var(--primaryColor)" }}><br />Pusta Holidays</span>
                </h1>
                <br />
                <p style={{ fontSize: "1.2rem", fontWeight: 400, fontStyle: 'italic' }}>Explore Andaman tour & travel packages at best prices on pustaholidays. Find all tourist places in Andaman with best deals and offers. Get custom-designed Andaman holiday packages with us. Book Now!</p>
                <br />
                <div style={{ width: 'fit-content' }}><MyButton name={"Know More"} slug={"/about-us"} /></div>
                <br />
                {!isMobile&&<br />}

                <div ref={ref} style={{display:'flex', flexWrap:'wrap', gap:"2.5rem", justifyContent:isMobile?'center':"left"}}>
                    {timerVal.map((item, index)=>(
                        <Timer key={index} time={item.time} lowText={item.lowText} upText={item.upText}/>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}
