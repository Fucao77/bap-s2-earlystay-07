import GoButton from '../../global/go-button';
import SubTitle from '../../global/sub-title';
import SearchItem from '../search-item';
import SearchPageBar from '../search-page-bar';

import {
  container,
  resultWrapper,
  footer,
  goBackBtn,
} from './search-results.module.scss';

export default function SearchResults({ pages, results, page, onChangePage }) {
  return (
    <section className={container} id="results">
      <SubTitle title="Résultats" />
      <div className={resultWrapper}>
        {results.length === 0 && <p>Aucun aucun résultat disponible</p>}
        {results.map((item, index) => (
          <SearchItem
            key={index}
            imageUrl={item.small_picto}
            title={item.name}
            description={item.catch_phrase}
            linkUrl={'/travel/' + item.interne_to}
            price={500}
            dayNumber={7}
          />
        ))}
      </div>
      <footer className={footer}>
        <SearchPageBar
          values={pages}
          currentValue={page}
          onClick={onChangePage}
        />
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
