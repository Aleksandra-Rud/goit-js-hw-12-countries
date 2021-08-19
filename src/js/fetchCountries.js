const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(response => response.ok ? response.json() : Promise.reject(`Error status ` + response.status));
        
}

export default { fetchCountries };