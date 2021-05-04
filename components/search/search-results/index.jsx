import GoButton from '../../global/go-button';
import SubTitle from '../../global/sub-title';
import SearchItem from '../search-item';
import PageBar from '../../global/page-bar';
import {
  orderOffers,
  getTravelItems,
  getDurations,
} from '../../../utils/travel-parser';
import {
  container,
  resultWrapper,
  footer,
  goBackBtn,
} from './search-results.module.scss';
import { formatToEuros } from '../../../utils/price-formatter';

export default function SearchResults({ pages, results, page, onChangePage }) {
  const LocalSearchItem = ({ travel }) => {
    const durations = getDurations(travel.travels);
    const price = formatToEuros(
      orderOffers(getTravelItems(travel.travels))[0].price_value
    );

    return (
      <SearchItem
        imageUrl={travel.small_picto}
        title={travel.name}
        description={travel.catch_phrase}
        linkUrl={'/travel/' + travel.interne_to}
        price={price}
        dayNumber={durations[durations.length - 1]}
        withDelivery={travel.with_delivery}
      />
    );
  };

  return (
    <section className={container} id="results">
      <SubTitle title="Résultats" />
      <div className={resultWrapper}>
        {results.length === 0 && <p>Aucun aucun résultat disponible</p>}
        {results.map((item, index) => (
          <LocalSearchItem key={index} travel={item} />
        ))}
      </div>
      <footer className={footer}>
        <PageBar values={pages} currentValue={page} onClick={onChangePage} />
        <GoButton
          to="#search-header"
          theme="orange"
          dir={1}
          className={goBackBtn}
        />
      </footer>
    </section>
  );
}
