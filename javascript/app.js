const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const movies = document.querySelector('.movies');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results)
}

function showMovies(data){
movies.innerHTML = '';
// const { title, poster_path, vote_average, overview } = data;

data.forEach(item => {
    const movie = document.createElement('div')
    movie.className = 'movie'
    movie.innerHTML = `
    <div class="movie">
    <img src="${IMG_PATH + item.poster_path}" alt="${item.title}">
    <div class="movie-info">
    <h2>${item.title}</h2>
    <p class="${classColor(item.vote_average)}">${item.vote_average}</p>
    </div>
    <div class="summary">
    <h3>Overview</h3>
    <p>${item.overview}<p>
    <div>
    </div>`
    movies.appendChild(movie)
});

}

getMovies(API_URL)

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let val = search.value
    if(val !== '' && val){
        getMovies(SEARCH_API + val)
    }
    else{
        getMovies(API_URL)
    }
})

function classColor(num){
    if(num >= 8){
        return 'green'
    }
    else if(num >= 5){
        return 'orange'
    }
    else{
        return 'red'
    }
}