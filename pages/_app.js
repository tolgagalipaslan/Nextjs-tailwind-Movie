import Layout from "@/components/Layout/Layout";
import Loading from "@/components/Layout/Loading";
import "@/styles/globals.css";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";

//Page loading animation
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa ilk yüklendiğinde loading ekranını gizle
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
      {!loading ? null : <Loading />}
    </Layout>
  );
}
