import TravelHeader from '../../components/travel/travel-header';
import Nav from '../../components/nav';
import { getTravelById } from '../../services/travel-service';
import {
  getDurations,
  getMealPlans,
  getOffers,
} from '../../utils/travel-parser';
import OfferForm from '../../components/travel/offer-form';

export default function TravelDescription({ travel }) {
  const durations = getDurations(travel.air_types);
  const mealPlans = getMealPlans(travel.air_types);
  console.log(travel);
  return (
    <div>
      <Nav />
      <TravelHeader
        title={travel.name}
        accomodationName={travel.options[0].accomodation_name}
        description={travel.commercial_infos[0].catch_phrase}
        imageUrl={travel.options[0].option_descriptions[0].big_picto}
        duration={
          durations[0] +
          (durations.length > 1
            ? ' à ' + durations[durations.length - 1]
            : '') +
          ' jours'
        }
        option={
          mealPlans.length > 1
            ? mealPlans.map((meal) => meal.text).join(' ou ')
            : mealPlans[0].text
        }
      />
      <OfferForm offers={getOffers(travel.air_types)} />
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
