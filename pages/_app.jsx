import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Layout from '../layout/Layout'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import store from '../redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function Loading() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplate = (url) => (url === router.asPath) && setTimeout(() =>{setLoading(false)},1500);

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplate)
    router.events.on("routeChangeError", handleComplate)

    return () => {
    router.events.off("routeChangeStart", handleStart)
    router.events.off("routeChangeComplete", handleComplate)
    router.events.off("routeChangeError", handleComplate)
    }
  })
  return loading && (
    <div className="w-screen h-screen fixed bg-primary z-50 flex items-center justify-center"><PacmanLoader className='mx-auto' color='#fff'/></div>
  )
}

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return(
    <SessionProvider session={session}>
      <Provider store={store}>
      <Loading />
      <Layout>
      <ToastContainer />
        <Component {...pageProps} />
      </Layout>
      </Provider>
    </SessionProvider>
    )
}
