import "smart/styles/globals.css";
import "smart/styles/react-dyn-tabs.css";
import "smart/styles/react-dyn-tabs-card.css";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        {/* <title>SMART API</title> */}

        {/* <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="description of your project" />
        <meta name="theme-color" content="#000" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
