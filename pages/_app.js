import Footer from '@/components/master/Footer';
import '@/styles/globals.css'
import { ConfigProvider } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
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
        <Footer />
      </ConfigProvider>
    </>
  )
}
