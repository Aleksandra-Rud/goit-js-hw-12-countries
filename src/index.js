import './sass/main.scss';

import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import cardCountry from './templates/country-card.hbs';

import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));


function onSearch(e) {

    const searchQuery = e.target.value;
    refs.cardContainer.innerHTML = '';

    API.fetchCountries(searchQuery)
        .then(data => {
            console.log(data)
            return searchCountry(data)
        })
        .catch(() => {
            error({ delay: 2500, text: 'There is no such country in the list. Please try again' })
        })
}

function searchCountry(countries) {
    if (countries.length >= 2 && countries.length <= 10) {
        displayCountryList(countries)
    }

    if (countries.length === 1) {
        refs.cardContainer.innerHTML = cardCountry(...countries);
    }

    if (countries.length > 10) {
        error({
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 2000
        });
    }
}

function displaySelectedCountry(event, countriesData) {
  countriesData.forEach(countryData => {
    if (countryData.name === event.target.textContent) {
      refs.searchForm.value = event.target.textContent;
      refs.cardContainer.innerHTML = cardCountry(countryData);
      refs.ulList.innerHTML = '';
    }
  });
}

function displayCountryList(countriesData) {
  refs.ulList.innerHTML = countriesData.map(country => `<li class="country">${country.name}</li>`)
    .join('');
  refs.ulList.addEventListener('click', event => {
    displaySelectedCountry(event, countriesData);
  });
}

refs.clearBtn.addEventListener('click', () => {
  refs.ulList.innerHTML = '';
  refs.cardContainer.innerHTML = '';
  refs.searchForm.value = '';
});