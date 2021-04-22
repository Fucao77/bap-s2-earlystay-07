import TravelHeader from '../../components/travel/travel-header';
import Nav from '../../components/nav';

const data = {
  title: 'Combiné circuit Cappadoce + Séjour Waterside',
  description:
    '<p></p><div>-&nbsp;Annulation sans frais&nbsp;jusqu’à 15 jours du départ pour toutes nouvelles réservations*<br>- Visite de Pamukkale<br>- Antalya et sariviera<br>- Nombreuses visites incluses</div>',
  imageUrl:
    'https://images.mondialtourisme.fr/elements/packages/AQ3CR/1.640_480.jpg',
};

export default function TravelDescription() {
  return (
    <div>
      <Nav />
      <TravelHeader
        title={data.title}
        description={data.description}
        imageUrl={data.imageUrl}
      />
    </div>
  );
}
