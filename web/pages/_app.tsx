import type { AppProps /* , AppContext */ } from "next/app";

import "bootstrap/dist/css/bootstrap.css";

function Root({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Root;
