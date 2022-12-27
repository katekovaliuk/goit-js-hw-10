import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const inputBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');
console.log(inputBox);
console.log(countryList);

inputBox.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
    event.preventDefault();
    const countryName = event.target.value.trim();
    console.log(countryName);

    if (countryName ==='') {
        countryList.innerHTML = '';
        countryCard.innerHTML = '';
        return;
    }
    fetchCountries(countryName)
        .then(renderCountryCard)
        .catch(error => { Notify.failure('Oops, there is no country with that name') });
}


function renderCountryCard(countryName) {
    if (countryName.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = '';
    }

    const markup = countryName
        .map(({ name, capital, population, flags, languages }) => {
            return `<div class = "country"><img src = ${flags.svg} alt = 'flag ${name.official}' width = '60px'>
            <h1> ${name.official}</h1></div>
           <p><span>Capital:</span> ${capital}</p>
           <p><span>Population:</span> ${population}</p>
           <p><span>Languages:</span> ${Object.values(languages)}</p>`;
        })
        .join('');
    countryCard.innerHTML = markup;

    if (countryName.length > 1) {
        countryCard.innerHTML = '';
    }

    renderCountryList(countryName);
}

function renderCountryList(countryName) {
    if (countryName.length >= 2 && countryName.length <= 10) {
        const markup = countryName
        .map(({ name, flags, }) => {
            return ` <li>
            <img src = ${flags.svg} alt = 'flag ${name.official}' width = '30px'>
            <h2> ${name.official}</h2>
            </li>`;
        })
        .join('');
        countryList.innerHTML = markup;
               
    }

    if (countryName.length === 1) {
       countryList.innerHTML = ''; 
    }
    
}
    