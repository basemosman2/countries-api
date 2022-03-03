const regionsBox = document.querySelector('.region-box');
const regionsList = document.querySelector('.continents');

const moodStatus = document.querySelector('.moodBox');
const statusText = document.querySelector('.moodBox p');
const statusDarkIcon = document.querySelector('.moodBox fa-moon');
const statusLightIcon = document.querySelector('.moodBox fa-sun');
const bodyElement = document.querySelector('body');

// show list of regions
regionsBox.addEventListener('click', ()=>{
    regionsList.classList.toggle('active');
});

// change mood status
moodStatus.addEventListener('click',()=>{
    moodStatus.classList.toggle('active');
    changeMoodStatus();
});

function changeMoodStatus(){
    if (moodStatus.classList.contains('active')) {
        statusText.innerHTML = 'Light Mood';
        bodyElement.classList.add('darkMood');

    }else{
        statusText.innerHTML = 'Dark Mood';
        bodyElement.classList.remove('darkMood');
    }
}
