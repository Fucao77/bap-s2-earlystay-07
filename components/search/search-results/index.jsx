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

const data = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1618675962429-3f82741be252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Pérou - Lima',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    linkUrl: '/',
    price: 1300,
    dayNumber: 7,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1618675962429-3f82741be252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Pérou - Lima',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    linkUrl: '/',
    price: 1300,
    dayNumber: 7,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1618675962429-3f82741be252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Pérou - Lima',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    linkUrl: '/',
    price: 1300,
    dayNumber: 7,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1618675962429-3f82741be252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Pérou - Lima',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    linkUrl: '/',
    price: 1300,
    dayNumber: 7,
  },
];

export default function SearchResults({ pages }) {
  return (
    <section className={container}>
      <SubTitle title="Résultats" />
      <div className={resultWrapper}>
        {data.map((item, index) => (
          <SearchItem
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            linkUrl={item.linkUrl}
            price={item.price}
            dayNumber={item.dayNumber}
          />
        ))}
      </div>
      <footer className={footer}>
        <SearchPageBar values={pages} />
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
