'use strict';

const searchInput = document.querySelector('.js-search_input');
const searchBtn = document.querySelector('.js-search_btn');
const resetBtn = document.querySelector('.js-reset_btn');
const searchList = document.querySelector('.js-search_list');
const favList = document.querySelector('.js-fav_list');

let searchSeries = [];
let favSeries = [];

function handleSearch(ev) {
  ev.preventDefault();
  const inputValue = searchInput.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((info) => {
      searchSeries = info.data;
      renderSeries(searchSeries, searchList);
    });
};

searchBtn.addEventListener('click', handleSearch);

function renderSeries(series, list) {
  list.innerHTML = '';
  for (const serie of series) {
    const li = document.createElement('li');
    li.setAttribute('id', serie.mal_id);
    li.setAttribute('class', 'js-li');
    list.appendChild(li);
    const image = document.createElement('img');
    const h3 = document.createElement('h3');
    const textH3 = document.createTextNode(serie.title);
    h3.appendChild(textH3);
    li.append(image, h3);
    if (serie.images.webp.image_url === `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`) {
      image.setAttribute('src', 'https://placehold.co/210x295/ffffff/666666/png');
    } else {
      image.setAttribute('src', serie.images.webp.image_url);
    }
   const findFavSerie = favSeries.find((favSerie) => favSerie.mal_id === serie.mal_id)
   if(findFavSerie){
      li.setAttribute('class', 'favorite');
   }
    }
    listenerSeries();
   
  };
  

function handleClickFav(event) {
  const liClicked = parseInt(event.currentTarget.id);
  const serieSelected = searchSeries.find((eachSerie) => eachSerie.mal_id === liClicked);
  const indexFavSelected = favSeries.findIndex((searchSerie) => searchSerie.mal_id === liClicked);
  if (indexFavSelected === -1) {
    favSeries.push(serieSelected);};
    localStorage.setItem('favAnimeSeries', JSON.stringify(favSeries));
    renderSeries(favSeries, favList);
  };

  const listenerSeries = () => {
    const allSeriesLi = document.querySelectorAll('.js-li');
    for (const li of allSeriesLi) {
      li.addEventListener('click', handleClickFav);
    }
  };


const favAnimeSerieLS = localStorage.getItem('favAnimeSeries');
  if (favAnimeSerieLS) {
      favSeries = JSON.parse(favAnimeSerieLS);
    }
    renderSeries(favSeries,favList);

function handleReset(){
  localStorage.removeItem('favAnimeSeries');
  
}

resetBtn.addEventListener('click', handleReset);