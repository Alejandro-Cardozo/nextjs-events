// Data imports
import { getFeaturedEvents } from '../utils/data-fetching';

// Components imports
import EventList from '../components/events/event-list';

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
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
