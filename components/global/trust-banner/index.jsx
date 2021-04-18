import {
  container,
  imgWrapper,
  img,
  trustItem,
} from './trust-banner.module.scss';

const trustData = [
  {
    img: '/img/clock.png',
    label: 'Première minute',
  },
  {
    img: '/img/files.png',
    label: 'Frais de dossier offert',
  },
  {
    img: '/img/security.png',
    label: 'Paiement sécurisé',
  },
  {
    img: '/img/flex.png',
    label: 'Flexibilité',
  },
];

export default function TrustBanner() {
  return (
    <section className={container}>
      {trustData.map((item, index) => (
        <article key={index} className={trustItem}>
          <div className={imgWrapper}>
            <img className={img} src={item.img} alt={item.label} />
          </div>
          <p>{item.label}</p>
        </article>
      ))}
    </section>
  );
}
