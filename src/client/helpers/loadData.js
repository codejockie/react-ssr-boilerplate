import 'isomorphic-fetch';

export default resourceType => {
  return fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(res =>res.json())
    .then(data => {
      // only keep  first 10 results
      return data.filter((_, idx) => idx < 10);
    });
};