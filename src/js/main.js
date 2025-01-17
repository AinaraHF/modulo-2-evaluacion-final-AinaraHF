'use strict';

const searchInput = document.querySelector('.js-search_input');
const searchBtn = document.querySelector('.js-search_btn');
const resetBtn = document.querySelector('.js-reset_btn');
const deleteBtn = document.querySelector('.js-delete_btn');
const logBtn = document.querySelector('.js-log_btn');
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
      listenerSeries();
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
    const paragraph = document.createElement('p');
    const textP = document.createTextNode(serie.episodes);
    paragraph.appendChild(textP);
    li.append(image, h3, paragraph);
    if (serie.images.webp.image_url === `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`) {
      image.setAttribute('src', 'https://placehold.co/210x295/ffffff/666666/png');
    } else {
      image.setAttribute('src', serie.images.webp.image_url);
    }
   const findFavSerie = favSeries.find((favSerie) => favSerie.mal_id === serie.mal_id)
   if(findFavSerie){
      li.setAttribute('class', 'favorite');
      const x = document.createElement('button');
      x.setAttribute('class', 'js-remove');
      const xText = document.createTextNode('X');
      x.appendChild(xText);
      li.appendChild(x);
      };
    };
  };

function handleClickFav(event) {
  const liClicked = parseInt(event.currentTarget.id);
  const serieSelected = searchSeries.find((eachSerie) => eachSerie.mal_id === liClicked);
  const indexFavSelected = favSeries.findIndex((searchSerie) => searchSerie.mal_id === liClicked);
  if (indexFavSelected === -1) {
    favSeries.push(serieSelected);};
    localStorage.setItem('favAnimeSeries', JSON.stringify(favSeries));
    renderSeries(favSeries, favList);
    listenerX();
    renderSeries(searchSeries, searchList);
    listenerSeries();
  };

const listenerSeries = () => {
  const allSeriesLi = document.querySelectorAll('.js-li');
  for (const li of allSeriesLi) {
    li.addEventListener('click', handleClickFav);
  }
};

function handleReset(){
  localStorage.removeItem('favAnimeSeries');  
};

resetBtn.addEventListener('click', handleReset);

function handleDeleteAllFavs(){
  localStorage.removeItem('favAnimeSeries');
  favSeries = [];
  favList.innerHTML = '';
  renderSeries(searchSeries, searchList);
  listenerSeries();
};

deleteBtn.addEventListener('click', handleDeleteAllFavs);


function handleDeleteFav(ev){
  const xClicked = parseInt(ev.target.parentElement.id);
  const indexFavSelected = favSeries.findIndex((searchSerie) => searchSerie.mal_id === xClicked);
  favSeries.splice(indexFavSelected,1);
  localStorage.setItem('favAnimeSeries', JSON.stringify(favSeries));
  renderSeries(favSeries, favList);
  listenerX();
  renderSeries(searchSeries, searchList);
  listenerSeries();
};

const listenerX = () => {
  const allX = document.querySelectorAll('.js-remove');
  for (const x of allX) {
    x.addEventListener('click', handleDeleteFav);
  }
};

const favAnimeSerieLS = localStorage.getItem('favAnimeSeries');
  if (favAnimeSerieLS) {
      favSeries = JSON.parse(favAnimeSerieLS);
    }
    renderSeries(favSeries,favList);
    listenerX();

logBtn.addEventListener('click', (ev) =>{
  ev.preventDefault();
  for (const serie of searchSeries) {
    console.log(serie.title);
  }
})