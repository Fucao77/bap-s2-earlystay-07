import SubTitle from '../../global/sub-title';
import Link from 'next/link';
import { container } from './flash-sales-section.module.scss';

const data = {
  country: 'Italy',
  city: 'Rome',
  price: 250,
  img:
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1393&q=80',
};

export default function FlashSalesSection() {
  return (
    <section className={container}>
      <header>
        <SubTitle title="Nos ventes flashs" />
      </header>
      <div>
        <article>
          <div>
            <img src={data.img} alt={data.city + ' image'} />
            <h3>
              {data.country} - {data.city}
            </h3>
            <p>{data.price}€ Jour/Personne</p>
          </div>
          <Link href="/">
            <a>Découvrir l'offre</a>
          </Link>
        </article>
      </div>
    </section>
  );
}
