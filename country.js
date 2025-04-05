const main = document.querySelector('main')
const backBtn = document.querySelector('.back-btn')
const flagImg = document.querySelector('.flag img')
const countryNameTag = document.querySelector('.country-name')
const nativeNameTag = document.querySelector('.native-name span')
const population = document.querySelector('.population span')
const region = document.querySelector('.region span')
const subRegion = document.querySelector('.sub-region span')
const capital = document.querySelector('.capital span')
const domain = document.querySelector('.domain span')
const currencies = document.querySelector('.currencies span')
const languages = document.querySelector('.languages span')
const borderCountries = document.querySelector('.border-countries')

const countryName = new URLSearchParams(location.search).get('name')
// console.log(countryName);
fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
.then(res => res.json())
.then((country) => {
    flagImg.src = country[0].flags.svg
    countryNameTag.textContent = country[0].name.common
    let currency = []
    let nativeName, languagesVal= [], i = 0, subregionVal = '', capitalVal = '' 
    
    if (country[0].name.nativeName) {
        nativeName = Object.values(country[0].name.nativeName)[0].common
    } else {
        nativeName = country[0].name.common
    }
    if(country[0].subregion){
        subregionVal = country[0].subregion
    }
    if(country[0].capital){
        capitalVal = country[0].capital
    }
    if (country[0].currencies) {
        currency = Object.values(country[0].currencies).map((currency) => currency.name)
    }
    if (country[0].languages) {
        languagesVal = Object.values(country[0].languages)            
    }
    
    nativeNameTag.textContent = nativeName
    population.textContent = (country[0].population).toLocaleString('en-US')
    region.textContent = country[0].region
    subRegion.textContent = subregionVal
    capital.textContent = capitalVal
    domain.textContent = country[0].tld.join(', ')
    currencies.textContent = currency.join(', ')
    languages.textContent = languagesVal.join(', ')
    
    country[0].borders?.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(res => res.json())
        .then((bdrCountry) => {
            const anchorTag = document.createElement('a')
            anchorTag.textContent = bdrCountry[0].name.common
            anchorTag.classList.add('neighbor')
            anchorTag.href = `country.html?name=${bdrCountry[0].name.common}`
            borderCountries.append(anchorTag)
            
        })
    });

})
.catch((err) => {
    main.textContent = `API is not working try again`;
})

const body = document.querySelector('body')
const changeTheme = document.querySelector('.change-theme')

backBtn.addEventListener("click", () => {
    history.back()
})

// debugger
import { themeFunctionality } from "./themechanger.js"
themeFunctionality(body, changeTheme)
