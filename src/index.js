// import './sass/main.scss';

import cardCountry from './templates/country-card.hbs';
import getRefs from './js/get-refs';
import API from '../src/js/fetchCountries';

import { debounce } from 'lodash';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.value;
    refs.cardContainer.innerHTML = '';

    API.fetchCountries(searchQuery)
        .then(searchCountry)
        .catch(onFetchError);
};

function searchCountry(countries) {
    if (countries.length < 1 && searchQuery === ' ') {
        return;
    };
    if (countries.length === 1) {
        refs.cardContainer.innerHTML = cardCountry(...countries)
    };
    if (countries.length >= 2 && countries.length <= 10) {
        refs.cardContainer.innerHTML = previewCardCountry(...countries)
    };
    if (countries.length > 10) {
        error({
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 2000
        });
    };
}

function onFetchError(error) {
    alert({
        delay: 2000, text: 'There is no such country. Please try again!'
    });
}