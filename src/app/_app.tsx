// app/_app.tsx

import { AppProps } from 'next/app';
import '../styles/globals.css'; // Global CSS styles

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
