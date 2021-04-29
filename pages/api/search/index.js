import { searchTravels } from '../../../services/travel-service';

export function search(req, res) {
  if (req.method !== 'GET') {
    return res.status(404);
  }
  const query = req.query;

  searchTravels({
    searchValue: query.search,
    departureDate: query.date,
    duration: query.duration,
    theme: query.theme,
    page: query.page,
  })
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((e) => {
      res.status(500).json({ error: e });
    });
}
