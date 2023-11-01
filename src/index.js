import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedType = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const catInformation = document.querySelector('.cat-info');
const load = document.querySelector('.loader');


function getPetsList(breed) {
  breedType.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

error.classList.add('is-hidden');
function FetchBreeds() {
  fetchBreeds()
    .then(result => {
      getPetsList(result);
    })
    .then(() => new SlimSelect({ select: `.breed-select` }))
    .catch(() => {
      // Notiflix.Notify.
      failure(
        'Oops! Something went wrong! Try reloading the page!',
      );
    })
    .finally(() => {
      load.classList.add('is-hidden');
    });
}
breedType.addEventListener('change', onSelect);

function onSelect(evt) {
  const selectBreedId = evt.currentTarget.value;
  catInformation.classList.add('is-hidden');
   load.classList.remove('is-hidden')

  fetchCatByBreed(selectBreedId)
    .then(data => {
      markup(data);
       load.classList.add('is-hidden')
      catInformation.classList.remove('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`,
        { timeout: 4000, userIcon: false }
      );
    })
    .finally(() => {
      load.classList.add('is-hidden');
    });
}
function markup(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catList = `<img src="${url}" alt="${name}" width=500>
    <div>
  <h2 class="cat-title">${name}</h2>
  <p class="cat-text">${description}</p>
  <p class="cat-text"><span class="cat-text span-text">Temperament:</span>  ${ temperament}</p>
  </div>`;
  catInformation.innerHTML = catList;
}

FetchBreeds();