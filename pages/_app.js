import Footer from '@/components/master/Footer';
import '@/styles/globals.css'
import { ConfigProvider } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

          }
        }}
      >

        <Component {...pageProps} />

        {path !== '/admin' &&
          <Footer />
        }

      </ConfigProvider>
    </>
  )
}
