import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_YE59yAJOuoI4Ke2WAyv6CiztkzY850WtzcP0M2aDXk3KuStq6AV5j8uSivTKdxmw";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
}

module.exports = { fetchBreeds, fetchCatByBreed };
