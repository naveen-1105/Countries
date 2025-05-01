const cardContainer = document.querySelector('.cardContainer');
const search = document.querySelector('.search');
const filter = document.querySelector('.filter');
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


function rendor(country){
    const card = document.createElement('a');
        card.href = `https://naveen-1105.github.io/Countries/country.html?name=${country.name.common}`
        card.classList.add('card');
        card.innerHTML = `
        <img src="${country.flags.svg}" alt="">
        <div class="details">
        <h3 class="title">${country.name.common}</h3>
        <p><b>Population :</b>${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region :</b>${country.region}</p>
        <p><b>Capital :</b>${country.capital}</p>
    </div>
`
cardContainer.append(card)
}
let allCountryData = []
fetch('https://restcountries.com/v3.1/all').then((res) => res.json())
.then((data) => {
    
    data.forEach((country) =>{
        rendor(country)
        allCountryData = data
    })
})
filter.addEventListener('change',(e) =>{
    fetch(`https://restcountries.com/v3.1/region/${filter.value}`).then((res) => res.json())
    .then((data) => {
        cardContainer.innerHTML=''
        data.forEach((country) =>{
            allCountryData = data
            rendor(country)
        })
    })
})
search.addEventListener('input',(e) =>{
    
    // cardContainer.innerHTML='' 
    const filteredCountry = allCountryData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase())) 
    cardContainer.innerHTML = ''; 
    filteredCountry.forEach((country) => rendor(country));
})




