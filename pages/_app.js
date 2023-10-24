import Footer from '@/components/master/Footer';
import '@/styles/globals.css'
import { ConfigProvider } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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

        {path !== '/admin' &&
          <Footer />
        }

      </ConfigProvider>
    </>
  )
}
