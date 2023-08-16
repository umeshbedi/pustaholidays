import React, { useEffect, useState } from 'react'
import style from './header.module.css'
import { FaAngleDown } from 'react-icons/fa'
import { menu } from '../utils/localdb'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/firebase'

export default function Header() {

    const [menuStyle, setMenuStyle] = useState({ padding: "1.5rem 5%", background: "none" })
    const [ferryList, setFerryList] = useState([])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setMenuStyle({ padding: ".5rem 5%", background: "rgba(0,0,0,.3)" })
            }
            else {
                setMenuStyle({ padding: "1.5rem 5%", background: "none" })
            }
        })
    }, [])

    useEffect(() => {
        db.collection('ferry').onSnapshot((snap) => {
          const tempFerry = []
          snap.forEach((sndata) => {
            tempFerry.push({ name: sndata.data().name, slug: sndata.data().slug })
          })
          setFerryList(tempFerry)
        })
      }, [])
      

    function Dropdown({ heading = "", content = [{ name: null, slug: null }] }) {
        return (
            <li>
                <Link href="javascript:void(0)">{heading} ▾</Link>
                <ul className={style.dropdown}>
                    {content.map((item, index) => (
                        <li key={index}><Link target='blank' href={item.slug}>{item.name}</Link></li>

                    ))}
                </ul>
            </li>
        )
    }

    return (
        <div className={style.menuContainer} style={menuStyle}>

            <div>
                {/* <h1 style={{ color: "white", fontSize:"1.5rem" }}>Logo Here</h1> */}
                <div style={{ height: '100%', width: 250, position: 'relative', background: 'inherit' }}>
                    <Image fill src={"/Pustaholidays white Horizontal Logo_100 .png"} alt='Pustaholidays white Horizontal Logo' style={{ objectFit: "contain" }} />
                </div>
            </div>

            <div className={style.menu}>
                <ul >
                    <li><Link href="/">Home</Link></li>
                    <Dropdown heading='Know' content={menu.know} />
                    <Dropdown heading='What to see' content={menu.what2see} />
                    <li><Link href="/cabs">Rentals</Link></li>
                    <Dropdown heading='Packages' content={menu.packages} />
                    <Dropdown heading='Activities' content={[{name:"Andaman", slug:"/activity/Andaman"}, {name:"Bali", slug:"/activity/Bali"},]} />
                    <Dropdown heading='Cruises' content={ferryList} />
                    <li><Link href="/contact-us">Contact Us</Link></li>
                </ul>
            </div>
        </div>
    )
}
