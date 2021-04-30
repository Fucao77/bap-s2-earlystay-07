import TravelHeader from '../../components/travel/travel-header';
import Nav from '../../components/global/nav';
import { getTravelById } from '../../services/travel-service';
import { getDurations, getMealPlans } from '../../utils/travel-parser';
import OfferForm from '../../components/travel/offer-form';
import TabView from '../../components/global/tab-view';
import TrustBanner from '../../components/global/trust-banner';
import Footer from '../../components/global/footer';
import HtmlParser from 'react-html-parser';

import {
  descriptionBlock,
  descriptionBlockTitle,
  imageBlock,
  imageBlockItem,
} from '../../styles/pages/travel.module.scss';

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
        <TabView.TabItem title="Informations">
          {travel.options.map(
            (option, index) =>
              option.text && (
                <article key={index} className={descriptionBlock}>
                  <h3 className={descriptionBlockTitle}>{option.title}</h3>
                  <div>{HtmlParser(option.text)}</div>
                </article>
              )
          )}
        </TabView.TabItem>
        {travel.options[0].images.length > 0 && (
          <TabView.TabItem title="Images">
            <div className={imageBlock}>
              {travel.options[0].images.map((img, index) => (
                <img
                  src={img.big}
                  alt=""
                  key={index}
                  className={imageBlockItem}
                />
              ))}
            </div>
          </TabView.TabItem>
        )}
      </TabView>
      <TrustBanner />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const travel = await getTravelById(context.params.id);

  if (travel.travels.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      travel,
    },
  };
}
