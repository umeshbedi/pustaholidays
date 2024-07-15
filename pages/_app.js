import FloatingButton from '@/components/master/FloatingButton';
import Footer from '@/components/master/Footer';
import '@/styles/globals.css'
import { Button, ConfigProvider, FloatButton, Tooltip } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Suspended from '@/components/utils/Suspended';

export default function App({ Component, pageProps }) {

  const [path, setPath] = useState('/')
  const [isSuspended, setIsSuspended] = useState(true)

  useEffect(() => {
    setPath(window.location.pathname)
    AOS.init();
  }, [])

  if(isSuspended)return <Suspended/>

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#15aee8',
            borderRadius: 20,
          },
          components: {
            Segmented: {
              itemSelectedBg: '#15aee8',
              itemSelectedColor: "white",

            },
          },
        }}
      >
        <Head>
          <meta name="author" content="Umesh Bedi, Linkedin: https://www.linkedin.com/in/umeshkumarbedi/"></meta>
          <link rel="icon" href="/Pustaholidays Icons500.png" />
        </Head>
        <Component {...pageProps} />
        <FloatingButton link={'https://api.whatsapp.com/send?phone=919434282120'} icon={<FaWhatsapp style={{ color: 'white' }} />} left='10px' bottom='95px' label={"Andaman"}/>
        <FloatingButton link={'https://api.whatsapp.com/send?phone=6287750233546'} icon={<FaWhatsapp style={{ color: 'white' }} />} left='10px' bottom='50px' label={"Bali"}/>
        {path !== '/admin' &&
          <Footer />
        }

      </ConfigProvider>
    </>
  )
}
