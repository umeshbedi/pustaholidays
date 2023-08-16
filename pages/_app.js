import Footer from '@/components/master/Footer';
import '@/styles/globals.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}
