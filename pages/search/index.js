import Nav from '../../components/nav';
import SearchHeader from '../../components/home/search-header';
import { useRouter } from 'next/router';
import SearchResults from '../../components/search/search-results';
import TrustBanner from '../../components/global/trust-banner';
import Footer from '../../components/footer';

export default function Search() {
  const { query } = useRouter();
  const pages = [1, 2, 3, 4];

  return (
    <div>
      <Nav />
      <SearchHeader searchValue={query.search} displaySeeMore={false} />
      <SearchResults pages={pages} />
      <TrustBanner />
      <Footer />
    </div>
  );
}
