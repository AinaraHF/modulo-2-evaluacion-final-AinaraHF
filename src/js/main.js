'use strict';

const searchInput = document.querySelector('.js-search_input');
const searchBtn = document.querySelector('.js-search_btn');
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
      renderSeries(searchSeries);
    });
};

searchBtn.addEventListener('click', handleSearch);

function renderSeries(series) {
  for (const serie of series) {
    const li = document.createElement('li');
    li.setAttribute('id', serie.mal_id);
    li.setAttribute('class', 'js-li');
    searchList.appendChild(li);
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
    /*const findFav = favSeries.find((favSerie) => favSerie.id === serie.id);

    let css = findFav ? 'favorite' : '';

    favList.innerHTML += `
    <li id="${serie.id}" class="js_palette ${css}">
        <img src="${serie.serie.images.webp.image_url}" alt="">
      <h3>${serie.title}</h3>
    </li>`;*/
  }
    listenerSeries();
  };


  function handleClickFav(event) {
    const liClicked = parseInt(event.currentTarget.id);
    const serieSelected = searchSeries.find((eachSerie) => eachSerie.mal_id === liClicked);
    const indexFavSelected = favSeries.findIndex((searchSerie) => searchSerie.id === liClicked);
    if (indexFavSelected === -1) {
      favSeries.push(serieSelected);};
      console.log(favSeries); //no funciona lo de ke no se repitan...
    renderSeries(searchSeries);
}

  const listenerSeries = () => {
    const allSeriesLi = document.querySelectorAll('.js-li');
    for (const li of allSeriesLi) {
      li.addEventListener('click', handleClickFav);
    }
  };




