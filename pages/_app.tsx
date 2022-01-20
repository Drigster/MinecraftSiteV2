import Layout from "../components/Layout"
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

export default function App({ Component, session, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}