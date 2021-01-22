import Head from "next/head";
import { Provider } from "react-redux";
import store from "redux/store";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lottery</title>
      </Head>
      <Provider store={store}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
