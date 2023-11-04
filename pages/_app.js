import Footer from '@/components/master/Footer';
import '@/styles/globals.css'
import { ConfigProvider, FloatButton } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function App({ Component, pageProps }) {

  const [path, setPath] = useState('/')

  useEffect(() => {
    setPath(window.location.pathname)
    AOS.init();
  }, [])
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
        <div id='WhatsAppButton'>
              <FloatButton.Group style={{ left: 10}}>
            <FloatButton href='https://api.whatsapp.com/send?phone=6287750233546' target='blank' tooltip="WhatsApp for Bali" icon={<FaWhatsapp style={{color:'white'}}/>} style={{ color:'red' }} />
            <FloatButton href='https://api.whatsapp.com/send?phone=919434282120' target='blank' tooltip="WhatsApp for Andaman (India)" icon={<FaWhatsapp style={{color:'white'}}/>} />
          </FloatButton.Group>
          </div>
        {path !== '/admin' &&
          <Footer />
        }

      </ConfigProvider>
    </>
  )
}
