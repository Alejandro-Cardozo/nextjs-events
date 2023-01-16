// Next imports
import Head from 'next/head';

// Util imports
import { getEventById, getFeaturedEvents } from '../../utils/data-fetching';

// Components imports
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventDetailPage = ({ event }) => {
  return (
    <>
    <Head>
      <title>{event.title}</title>
      <meta name='description' content={event.description} />
    </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const event = await getEventById(context.params.eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      event: event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default EventDetailPage;
