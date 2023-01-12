// Utils imports
import { getFilteredEvents } from '../../dummy-data';
import { useRouter } from 'next/router';

// Components imports
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';

// UI Components imports
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = () => {
  const router = useRouter();

  // if there is not parameters provided
  if (!router.query.slug) {
    return <p className='center'>Loading...</p>;
  }

  // extract query params
  const year = +router.query.slug[0];
  const month = +router.query.slug[1];

  const date = new Date(year, month - 1);

  // handling invalid query params
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid date. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year,
    month,
  });

  // Handling not found events
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found. Try a different date!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  // Happy path
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
