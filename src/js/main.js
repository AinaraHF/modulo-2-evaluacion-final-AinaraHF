'use strict';

const searchInput = document.querySelector('.js-search_input');
const searchBtn = document.querySelector('.js-search_btn');
const searchList = document.querySelector('.js-search_list');

/*<li>
        <img src="" alt=""/>
        <p></p>
  </li>
const li = document.createElement('li');
li.append(image,h3);
searchList.appendChild(li);
const image = document.createElement('img');
image.setAttribute("src", item.img); //cambiar item.img por el info.data.img
const h3 = document.createElement('h3');
const textH3 = document.createTextNode(info.data.title); //cambiar item.img por el info.data.img
h3.appendChild(textH3);

  */

let searchSeries = [];

function handleSearch(ev){
    ev.preventDefault();
    const inputValue = searchInput.value;
    fetch(`https://api.jikan.moe/v4/anime? q=${inputValue}`)
    .then((response) => response.json())
    .then((info) => {
      searchSeries = info.data;
      renderSeries(searchSeries);
    });
};

searchBtn.addEventListener('click', handleSearch);

function renderSeries(series){
  for (const serie of series) {
  const li = document.createElement('li');
  searchList.appendChild(li);
  const image = document.createElement('img');
  image.setAttribute("src", serie.images.jpg.image_url); 
  const h3 = document.createElement('h3');
  const textH3 = document.createTextNode(serie.title); 
  h3.appendChild(textH3);
  li.append(image,h3);
  }
};





