import SubTitle from '../../global/sub-title';

import { container, blockWrapper, title } from './offer-form.module.scss';

export default function OfferForm() {
  return (
    <section className={container}>
      <SubTitle title="Choisir votre offre" color="white" />
      <article className={blockWrapper}>
        <h3 className={title}>Séjour</h3>
        <p>A partir de</p>
      </article>
    </section>
  );
}
