import Nav from '../../components/global/nav';
import SearchHeader from '../../components/home/search-header';
import { useRouter } from 'next/router';
import SearchResults from '../../components/search/search-results';
import TrustBanner from '../../components/global/trust-banner';
import Footer from '../../components/global/footer';
import { searchTravels } from '../../services/travel-service';
import { generateArrayOfValue } from '../../utils/array';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { generateQueryUrl } from '../../utils/url';

export default function Search({ travelResults }) {
  const { query } = useRouter();
  const [results, setResults] = useState(travelResults.results);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(query.page);
  }, [query.page]);

  console.log(travelResults);

  const onChangePage = (page) => {
    setCurrentPage(page);
    axios({
      method: 'GET',
      url: `/api/search?${generateQueryUrl({
        search: query.search,
        theme: query.value,
        duration: query.value,
        date: query.date,
        page,
      })}#results`,
    })
      .then(({ data }) => {
        setResults(data.results.results);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Nav />
      <SearchHeader defaultData={query} displaySeeMore={false} />
      <SearchResults
        page={currentPage ? currentPage : 0}
        results={results}
        pages={generateArrayOfValue({
          min: 0,
          max: travelResults.pageNumber - 1,
        })}
        onChangePage={onChangePage}
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
    theme: query.theme,
    page: query.page ? query.page : 0,
  });

  return {
    props: {
      travelResults,
    },
  };
}
