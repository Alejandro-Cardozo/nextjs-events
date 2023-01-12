
export async function getFeaturedEvents() {
  const events = await fetchData();
  return events.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
  const events = await fetchData();
  return events;
}

export async function getFilteredEvents(dateFilter) {
  const events = await fetchData();
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const events = await fetchData();
  return events.find((event) => event.id === id);
}

const fetchData = async () => {
  const data = await fetch(`${process.env.API_URL}/events.json`);
  const events = await data.json();
  const transformedEvents = [];
  for (const key in events) {
    transformedEvents.push({
      id: key,
      ...events[key]
    });
  }
  return transformedEvents;
}

/* 
  This is just an example project, thus I retrieve all objects 
  from the DB and then apply filters using JS.
  For a real project you should write a different query for each
  function so you just retrieve the necessary data from your DB
*/