import Layout from "@/components/Layout/Layout";
import Loading from "@/components/Layout/Loading";
import "@/styles/globals.css";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";

//Page loading animation
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps, session }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa ilk yüklendiğinde loading ekranını gizle
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div
          className={`${
            loading ? "overflow-hidden h-screen max-h-screen" : ""
          }`}
        >
          <Layout>
            <Component {...pageProps} />
            <Loading loading={loading} />
          </Layout>
        </div>
      </Provider>
    </SessionProvider>
  );
}
