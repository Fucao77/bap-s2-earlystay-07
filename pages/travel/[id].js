import TravelHeader from '../../components/travel/travel-header';
import Nav from '../../components/nav';
import { getTravelById } from '../../services/travel-service';
import { displayDuration } from '../../utils/travel-parser';

export default function TravelDescription({ travel }) {
  console.log(travel);
  return (
    <div>
      <Nav />
      <TravelHeader
        title={travel.name}
        accomodationName={travel.options[0].accomodation_name}
        description={travel.commercial_infos[0].catch_phrase}
        imageUrl={travel.options[0].option_descriptions[0].big_picto}
        duration={displayDuration()}
        option={'DEMI-PENSION'}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const travel = await getTravelById('AQ3CR');

  return {
    props: {
      travel,
    },
  };
}
