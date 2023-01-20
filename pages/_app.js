// Next imports
import Head from 'next/head';

// Styles imports
import '../styles/globals.css';

// Components imports
import Layout from '../components/layout/layout';
import Notification from '../components/ui/notification';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta
          name='description'
          content='Find the EVENT you will attend NEXT time'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
      <Notification title='Test' message='This is a test.' status='error' />
    </Layout>
  );
}
