// Next imports
import Head from 'next/head';
import { useRouter } from 'next/router';

// Data imports
import { getAllEvents } from '../../utils/data-fetching';

// Components imports
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import NewsletterRegistration from '../../components/input/newsletter-registration';

const AllEventsPage = ({ events }) => {

  const router = useRouter();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name='description' content='See all the events that will take place near to you' />
      </Head>
      <NewsletterRegistration />
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps(context) {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60
  };
}

export default AllEventsPage;
