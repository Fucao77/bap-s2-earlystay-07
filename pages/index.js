import TrustBanner from '../components/global/trust-banner';
import FlashSalesSection from '../components/home/flash-sales-section';
import SearchHeader from '../components/home/search-header';
import Nav from '../components/global/nav';
import WorldSection from '../components/home/world-section';
import Footer from '../components/global/footer';

const fakeOffers = {
  'north-america': [
    {
      id: 1,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 2,
      continent: 'Amerique du Nord',
      country: 'Etats-Unis',
      price: 750,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 3,
      continent: 'Amerique du Nord',
      country: 'Mexique',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 4,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1618605585170-df650edeeb46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    },
  ],
  'south-america': [
    {
      id: 1,
      continent: 'Amerique du Sud',
      country: 'Brésil',
      price: 450,
      img:
        'https://images.mondialtourisme.fr/elements/packages/AQ3CR/1.640_480.jpg',
    },
    {
      id: 2,
      continent: 'Amerique du Sud',
      country: 'Brésil',
      price: 750,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 3,
      continent: 'Amerique du Sud',
      country: 'Mexique',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 4,
      continent: 'Amerique du Sud',
      country: 'Argentine',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1618605585170-df650edeeb46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    },
  ],
  europa: [
    {
      id: 1,
      continent: 'Europe',
      country: 'Italie',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1592426530660-7790958fdeb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    },
    {
      id: 2,
      continent: 'Europe',
      country: 'Portugal',
      price: 750,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 3,
      continent: 'Europe',
      country: 'Italie',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1603033498286-273f08ed9043?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      id: 4,
      continent: 'Europe',
      country: 'Belgique',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1597269009978-6577a9dc3ce4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1375&q=80',
    },
  ],
  asia: [
    {
      id: 1,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 2,
      continent: 'Amerique du Nord',
      country: 'Etats-Unis',
      price: 750,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 3,
      continent: 'Amerique du Nord',
      country: 'Mexique',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 4,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1618605585170-df650edeeb46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    },
  ],
  africa: [
    {
      id: 1,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 2,
      continent: 'Amerique du Nord',
      country: 'Etats-Unis',
      price: 750,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 3,
      continent: 'Amerique du Nord',
      country: 'Mexique',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 4,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1618605585170-df650edeeb46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    },
  ],
  oceania: [
    {
      id: 1,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 2,
      continent: 'Amerique du Nord',
      country: 'Etats-Unis',
      price: 750,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 3,
      continent: 'Amerique du Nord',
      country: 'Mexique',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    },
    {
      id: 4,
      continent: 'Amerique du Nord',
      country: 'Canada',
      price: 450,
      img:
        'https://images.unsplash.com/photo-1618605585170-df650edeeb46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    },
  ],
};

export default function Home() {
  return (
    <div>
      <Nav />
      <SearchHeader />
      <WorldSection offers={fakeOffers} />
      <FlashSalesSection />
      <TrustBanner />
      <Footer />
    </div>
  );
}
