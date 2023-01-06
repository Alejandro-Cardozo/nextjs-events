// Utils imports
import { getFilteredEvents } from '../../dummy-data';
import { useRouter } from 'next/router';

// Components imports
import EventList from '../../components/events/event-list';

const FilteredEventsPage = () => {
  const router = useRouter();

  // if there is not parameters provided
  if (!router.query.slug) {
    return <p className='center'>Loading...</p>;
  }

  // extract query params
  const year = +router.query.slug[0];
  const month = +router.query.slug[1];

  // handling invalid query params
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return <p>Invalid date. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({
    year,
    month,
  });

  // Handling not found events
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found. Try a different date!</p>
  }

  // Happy path
  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
