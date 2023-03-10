// Next imports
import Head from 'next/head';
import { useRouter } from 'next/router';

// Utils imports
import { useEffect, useState } from 'react';
//import { getFilteredEvents } from '../../utils/data-fetching';
import useSWR from 'swr';

// Components imports
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';

// UI Components imports
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/events.json`,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content='A list of filtered events.' />
    </Head>
  );

  // if there is not events
  if (!loadedEvents || !filterData) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    );
  }

  // extract query params
  const year = +filterData[0];
  const month = +filterData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid date. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // update the head data if the params are valid
  pageHeadData = (
    <Head>
      <title>Events in {humanReadableDate}</title>
      <meta
        name='description'
        content={`All events for ${humanReadableDate}`}
      />
    </Head>
  );

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  // Handling not found events
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
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
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   // extract query params
//   const year = +filterData[0];
//   const month = +filterData[1];

//   // handling invalid query params
//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       // REDIRECT, 404 OR MANAGE ERROR
//       // redirect: {
//       //   destination: '/error'
//       // },
//       // notFound: true,
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year,
//     month,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year,
//         month,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
