const countryURL = 'https://restcountries.com/v3.1/all';

async function getCountries() {
    try {
        const responnse = await fetch(countryURL);
        const data = await responnse.json();
        createInitialCard(data);
        countriesList(data);
        showCountry(data);
        search(data);
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`);
    }
};

getCountries();

const form = document.querySelector("form");
const inputSearch = document.getElementById('countrySearch');

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

function search(data) {
    form.addEventListener('submit', () => {
        if (inputSearch.value.toLowerCase().trim() != "") {
            let country = data.find(element => element.name.common.toLowerCase() == inputSearch.value.toLowerCase().trim());
            createCard(country);
        }
    })
};


function createCard(country) {
    let card = document.querySelector('#cardContainer');
    // console.log(Object.keys(country).length);
    let languages = "";
    if (typeof country.languages === 'object') {
        let langValues = Object.values(country.languages);
        for (let element of langValues) {
            languages += element + " ";
        }
    };
    let capital = "";
    if (typeof country.capital === 'undefined') {
        capital = "-"
    } else {
        capital = country.capital;
    }

    card.innerHTML = 
        `
        <div class="flagHeader">
            <img class="flag" src="${country.flags.svg}">
        </div>
        <div class="content">
            <div class="data">
                <h1>${country.name.common}</h1>
                <p>Official Name: ${country.name.official}</p>
                <p>Capital: ${capital}</p>
                <p>Languages: ${languages}</p>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.subregion}</p>
            </div>
            <div class="coat">
                <img class="coatOfArms" src="${country.coatOfArms.svg}" alt="Coat of Arms">
            </div>
        </div>
        `
};

function createItem(info) {
    let html = `<button class="buttonPill" id=${info.name.common} >${info.flag} ${info.name.common}</button>`
    return html
}

const countriesContainer = document.getElementById('countries');

function countriesList (data) {
    let htmlCountries = "";
    data.sort(function(a, b){
        if(a.name.common < b.name.common) { return -1; }
        if(a.name.common > b.name.common) { return 1; }
        return 0}).forEach(element => htmlCountries += createItem(element))
    countriesContainer.innerHTML = htmlCountries;

}

function showCountry (data) {
    const buttonCountry = document.querySelectorAll('.buttonPill');
    buttonCountry.forEach(element => element.addEventListener('click', () => {
        // console.log(element.innerHTML)
        let countryFind = data.find(item => element.innerHTML.includes(item.name.common));
        createCard(countryFind);
        
    }));
}

function createInitialCard(data) {
    let card = document.querySelector('#cardContainer');
    let country = data.find(element => element.name.common == "Argentina");
    // console.log(Object.keys(country).length);
    let languages = "";
    let langValues = Object.values(country.languages);
    for (let element of langValues) {
        languages += element + " ";
    }

    card.innerHTML = 
        `
        <div class="flagHeader">
            <img class="flag" src="${country.flags.svg}">
        </div>
        <div class="content">
            <div class="data">
                <h1>${country.name.common}</h1>
                <p>Official Name: ${country.name.official}</p>
                <p>Capital: ${country.capital}</p>
                <p>Languages: ${languages}</p>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.subregion}</p>
            </div>
            <div class="coat">
                <img class="coatOfArms" src="${country.coatOfArms.svg}">
            </div>
        </div>
        `
};