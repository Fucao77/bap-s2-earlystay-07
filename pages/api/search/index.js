import { searchTravels } from '../../../services/travel-service';

export default function search(req, res) {
  if (req.method !== 'GET') {
    return res.status(404);
  }
  const query = req.query;

  return searchTravels({
    searchValue: query.search,
    departureDate: query.date,
    duration: query.duration,
    theme: query.theme,
    page: query.page,
  })
    .then((results) => {
      res.status(200).json({ results });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: e });
    });
}
