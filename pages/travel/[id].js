import TravelHeader from '../../components/travel/travel-header';
import Nav from '../../components/nav';
import { getTravelById } from '../../services/travel-service';
import { getDurations, getMealPlans } from '../../utils/travel-parser';
import OfferForm from '../../components/travel/offer-form';
import TabView from '../../components/global/tab-view';
import TrustBanner from '../../components/global/trust-banner';
import Footer from '../../components/footer';

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
      <TabView>
        <TabView.TabItem title="Informations">test</TabView.TabItem>
        <TabView.TabItem title="Images">
          {travel.options[0].images.map((img, index) => (
            <img src={img.big} alt="" key={index} />
          ))}
        </TabView.TabItem>
      </TabView>
      <TrustBanner />
      <Footer />
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
