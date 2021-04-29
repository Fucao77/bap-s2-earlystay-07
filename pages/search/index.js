import Nav from '../../components/nav';
import SearchHeader from '../../components/home/search-header';
import { useRouter } from 'next/router';
import SearchResults from '../../components/search/search-results';
import TrustBanner from '../../components/global/trust-banner';
import Footer from '../../components/footer';
import { searchTravels } from '../../services/travel-service';
import { generateArrayOfValue } from '../../utils/array';

export default function Search({ travelResults }) {
  const { query } = useRouter();

  console.log(travelResults);

  return (
    <div>
      <Nav />
      <SearchHeader defaultData={query} displaySeeMore={false} />
      <SearchResults
        results={travelResults.results}
        pages={generateArrayOfValue({ min: 0, max: travelResults.pageNumber })}
      />
      <TrustBanner />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;

  const travelResults = await searchTravels({
    searchValue: query.search,
    departureDate: query.date,
    duration: query.duration,
  });

  return {
    props: {
      travelResults,
    },
  };
}
