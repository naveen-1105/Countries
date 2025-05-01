const countryName = new URLSearchParams(location.search).get('name')
const container = document.querySelector('.container')
const back = document.querySelector('.back');
const flagimg = document.querySelector('.flagimg')
const title = document.querySelector('.title')
const nativeName = document.querySelector('.nativeName');
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subregion = document.querySelector('.subregion')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currency = document.querySelector('.currency')
const symbol = document.querySelector('.symbol')
const language = document.querySelector('.language')
const nativeCountries = document.querySelector('.nativeCountries')

const theme = document.querySelector('.theme');
const body = document.querySelector('body');

// On page load, set the theme and icon based on localStorage
if (localStorage.getItem('mode') === 'dark') {
    body.classList.add('dark');
    theme.innerHTML = '<i class="fa-regular fa-sun"></i> Light Mode';
} else {
    theme.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode';
}

// Toggle theme on click
theme.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
        theme.innerHTML = '<i class="fa-regular fa-sun"></i> Light Mode';
    } else {
        localStorage.setItem('mode', 'light');
        theme.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode';
    }
});
back.addEventListener('click',() =>{
    history.back()
})
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json())
.then(([data]) =>{
    // console.log(data.borders);
    flagimg.src = data.flags.svg
    title.innerText = data.name.common
    if(data.name.nativeName){
        nativeName.innerText = Object.values(data.name.nativeName)[0].common
    }
    else{
        nativeName.innerText = data.name.common
    }
    population.innerText = data.population.toLocaleString('en-IN')
    region.innerText = data.region
    subregion.innerText = data.subregion
    capital.innerText = data.capital
    domain.innerText = data.tld[0]
    if(data.currencies){
        currency.innerText = Object.values(data.currencies).map((currency) => currency.name).join(', ')
        symbol.innerText = Object.values(data.currencies)[0].symbol
    }
    else{
        currency.innerText = "no currency"
    }
    
    language.innerText = Object.values(data.languages)
    if(data.borders){
        data.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                nativeCountries.append(borderCountryTag)
                borderCountryTag.href = `http://127.0.0.1:5500/country.html?name=${borderCountry.name.common}`
            })
        })
    }
})
