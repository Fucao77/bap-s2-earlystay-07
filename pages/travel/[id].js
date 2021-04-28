import TravelHeader from '../../components/travel/travel-header';
import Nav from '../../components/nav';
import { getTravelById } from '../../services/travel-service';
import { getDurations, getMealPlans } from '../../utils/travel-parser';
import OfferForm from '../../components/travel/offer-form';

export default function TravelDescription({ travel }) {
  const durations = getDurations(travel.travels);
  const mealPlans = getMealPlans(travel.travels);

  return (
    <div>
      <Nav />
      <TravelHeader
        title={travel.name}
        accomodationName={travel.accomodation_name}
        description={travel.catch_phrase}
        imageUrl={travel.big_picto}
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
      <OfferForm offers={travel.travels} />
    </div>
  );
}

export async function getServerSideProps() {
  const travel = await getTravelById('AQ4CR');

  return {
    props: {
      travel,
    },
  };
}
