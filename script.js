const body = document.querySelector('body')
const changeTheme = document.querySelector('.change-theme')
const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region select')
const searchInput = document.querySelector('.search input')

let allCountries
fetch('https://restcounatries.com/v3.1/all ')
.then(res => res.json())
.then((data) => { 
    console.log(data);
    allCountries = data
    renderCards(data)    
}).catch((err) => {
     body.innerText = `Error! Cannot fetch api`
     body.style.margin = '15rem 30rem'
     body.style.color = 'red'
     body.style.fontSize = '3rem'

})

filterByRegion.addEventListener('change', (e) => {
   console.log(e.target.value);
   fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
   .then(res => res.json())
   .then(renderCards)   
})

function renderCards(data) {
    countriesContainer.innerHTML = ''        
    data.forEach((country) => {        
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `./country.html?name=${country.name.common}`
        countryCard.innerHTML = `
                    <img src="${country.flags.svg}" alt="flag">
                    <div class="country-content">
                    <h2>${country.name.common}</h2>
                    <p><b>Population: </b>${country.population.toLocaleString('en-US')}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital}</p>
                    </div>
                `
        countriesContainer.append(countryCard)
    });
}

searchInput.addEventListener('input', (e) => {
    let filterCountries = allCountries.filter((country) => {
       return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderCards(filterCountries)
})

import { themeFunctionality } from "./themechanger.js"
themeFunctionality(body, changeTheme)