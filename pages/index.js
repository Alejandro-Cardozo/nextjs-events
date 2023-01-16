// Next imports
import Head from 'next/head';

// Data imports
import { getFeaturedEvents } from '../utils/data-fetching';

// Components imports
import EventList from '../components/events/event-list';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find the most exciting events that will take place in your city' />
      </Head>
      <EventList items={props.events} />
    </>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
    revalidate: 900,
  };
}

export default HomePage;
