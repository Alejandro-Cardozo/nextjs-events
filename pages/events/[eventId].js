import { getEventById } from '../../utils/data-fetching';

// Components imports
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

// UI Components import
import ErrorAlert from '../../components/ui/error-alert';

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
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
  return {
    props: {
      event: event,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { eventId: 'e1' } },
      { params: { eventId: 'e2' } },
      { params: { eventId: 'e3' } },
    ],
    fallback: false,
  };
}

export default EventDetailPage;
