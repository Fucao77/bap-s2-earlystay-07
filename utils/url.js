export function generateQueryUrl(data) {
  let queryUrl = '';
  for (const field in data) {
    if (data[field]) {
      queryUrl += `${queryUrl ? '&' : ''}${field}=${data[field]}`;
    }
  }

  return queryUrl;
}
