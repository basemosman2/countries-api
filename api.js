
const countriesList = document.querySelector('.countriesList');
const continents = document.querySelector('.continents');
const searchInput = document.querySelector('.inputBox input');
const detailsElement = document.querySelector('.details');

const mainCardBox = document.querySelector('.main');

// create country card
const card = (image,name,population,region,capital,code)=>{
    const countryCard = document.createElement('div');
    countryCard.classList.add('countryCard');
    

    const CImg = document.createElement('IMG');
    CImg.setAttribute('src',image);
    CImg.setAttribute('alt','country Flag');

    const info = document.createElement('div');
    info.classList.add('cardInfo');

    const cName = document.createElement('h2');
    cName.setAttribute('data-code',code);
    cName.innerText= name;

    const p1 = document.createElement('p');
    p1.innerText='Population:';
    const p2 = document.createElement('p');
    p2.innerText='Region:';
    const p3 = document.createElement('p');
    p3.innerText ='Capital:';
    
    const span1 = document.createElement('span');
    span1.innerText = population;
    const span2 = document.createElement('span');
    span2.innerText = region;
    const span3 = document.createElement('span');
    span3.innerText = capital;

    p1.append(span1);
    p2.append(span2);
    p3.append(span3);

    info.append(cName,p1,p2,p3)
    countryCard.append(CImg,info);

    return countryCard;

}

// create loading country card holders
const placeHoderCards = ()=>{
    countriesList.innerHTML = '';
    let imageHolder = 'img/placeholder-image.jpeg';
    let countryCard;
    for (let i = 0; i < 12; i++) {
        countryCard = card(imageHolder);
        countryCard.classList.add('loading');
        countriesList.append(countryCard);
    }
}

// get all Countries data
const allCountriesData = async ()=>{
    try{
        placeHoderCards();
        const res =  await fetch('https://restcountries.com/v2/all');
        const data = await res.json();
        displayCountriesData(data);
    }
    catch(e){
        alert(`Something Went Wrong, ${e}`);
    }
}

allCountriesData();

// get countries data by region
const countriesRegion = async (region)=>{
    try{
        placeHoderCards();
        const res =  await fetch(`https://restcountries.com/v2/region/${region}`);
        const data = await res.json();
        displayCountriesData(data);
    }
    catch(e){
        alert(`Something Went Wrong, ${e}`);
    }
}

// get a specific country data by name
const Country = async (name)=>{
    try{
        placeHoderCards();
        const res =  await fetch(`https://restcountries.com/v2/name/${name}`);
        const data = await res.json();
        displayCountriesData(data);
    }
    catch(e){
        console.log(`Something Went Wrong, ${e}`);
    }
}

// get a specific country data by alpha code 
const countryDetails = async (code)=>{
    try{
        const res =  await fetch(`https://restcountries.com/v2/alpha/${code}`);
        const data = await res.json();
        displayCountryDetails(data);
    }
    catch(e){
        console.log(`Something Went Wrong, ${e}`);
    }
}


// display countries card in countries list element 
async function displayCountriesData(data){
    try{
        let img,name,population,region,capital,code;
        countriesList.innerHTML = '';

        data.forEach(country => {
            img = country.flag;
            name = country.name;
            population = country.population;
            region = country.region;
            capital = country.capital;
            code = country.alpha3Code;

            let countryCard =  card(img,name,population,region,capital,code);
            countriesList.append(countryCard);
        });
    }catch(e){
        console.log(`Something Went Wrong, ${e}`);
    }
}

const displayCountryDetails = (data)=>{
    mainCardBox.classList.add('hidden');
    let btn = document.createElement('button');
    btn.classList.add('back');
    btn.innerHTML=`
        <i class="fa-solid fa-arrow-left"></i>
        <span>Back</span>
    `;

    let img = document.createElement('img');
    img.setAttribute('src',data.flags.png);

    let dBox = document.createElement('div');
    dBox.classList.add('infoBox');

    let subDetails = document.createElement('div');
    subDetails.classList.add('subDetails');

    subDetails.innerHTML=`
            <h1>${data.name}</h1>
            <ul>
                <li>Native Name: <span>${data.nativeName}</span></li>
                <li>Population: <span>${data.population}</span></li>
                <li>Region: <span>${data.region}</span></li>
                <li>Sub Region: <span>${data.subregion}</span></li>
                <li>Capital: <span>${data.capital}</span></li>
            </ul>
            <ul>
                <li>Top Level Domain: <span>${data.topLevelDomain[0]}</span></li>
                <li>Currencies: <span>${data.currencies[0].name}</span></li>
                <li>Languages: <span>${data.languages.map((language)=>(language.name).toString())}</span></li>
            </ul>
    `;
    subDetails.append(countryBorders(data));
    dBox.append(img,subDetails);
    detailsElement.append(btn,dBox);
}

const countryBorders = (data)=>{
    let borders = document.createElement('div');
    borders.classList.add('borders');
    let title = document.createElement('h3');
    title.innerText = 'Border Countries: ';
    let lis = document.createElement('ul');
    lis.innerText = 'No Borders';

    let countryBorders = data.borders;

    if(countryBorders){
        lis.innerHTML='';
        data.borders.forEach((border)=>{
            let li = document.createElement('li');
            li.innerText = border;
            li.setAttribute('data-border',border);
            lis.append(li);
        });
        borders.append(title,lis);
        return borders;
    }
    borders.append(title,lis);
    return borders;
}

// display region country when selected from filter region
continents.addEventListener('click',(e)=>{
    let region = e.target.dataset.region;
    continents.classList.remove('active');
    region === 'all' ? allCountriesData() : countriesRegion(region);
});

// search for specific country
searchInput.addEventListener('keydown',(e)=>{
    let value = searchInput.value;
    if(e.code =='Enter') {
        searchInput.value ='';
        Country(value);
    }
});

//selected country to show Details
countriesList.addEventListener('click',(e)=>{
    if(e.target.tagName =='H2'){
        let code = e.target.dataset.code;
        countryDetails(code);
    }
});

// back button clicked
detailsElement.addEventListener('click',(e)=>{
    let target = e.target.classList.contains('back');
    if(target){
        mainCardBox.classList.remove('hidden');
        detailsElement.innerHTML='';
    }

    let hasBorder = e.target.dataset.border;

    if(hasBorder){
        detailsElement.innerHTML = '';
        countryDetails(hasBorder);
    }
});
