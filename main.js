// fetch refactor
const SearchButton = document.querySelector('.tombol-cari');
SearchButton.addEventListener('click', async function() {

    const inputKey = document.querySelector('.input-key')
    const movies = await getMovies(inputKey.value)
    // console.log(movies);
    updateUI(movies)
});


//event binding
document.addEventListener('click', async function(e) {
    if ( e.target.classList.contains('modal-detail-button') ) {
        // console.log('OK');
        const imdbid = e.target.dataset.imdbid;
        const filmDetail = await getFilmDetail(imdbid);
        updateUiDetail(filmDetail);

    }
    // console.log(e.target);
})

function getFilmDetail(imdbid) {
   return fetch('http://www.omdbapi.com/?apikey=196b90c2&i=' + imdbid)
        .then(respon => respon.json())
        .then(m => m)
}

function updateUiDetail(m) {
        const filmDetail = showDetail(m);
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = filmDetail;
}

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=196b90c2&s=' + keyword)
        .then(respon => respon.json())
        .then(respon => respon.Search); 
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showFilm(m));
    const movieContainer = document.querySelector('.film-container'); 
    movieContainer.innerHTML = cards
}


function showFilm(m) {
    return ` <div class="col-md-4 my-4">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#filmDetailModal" data-imdbid="${m.imdbID}">show details</a>
                    </div>
                </div>
            </div>`;
}


function showDetail(m) {
    return ` <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title}</h4>${m.Year} </li>
                        <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                        <li class="list-group-item"><strong>plot: </strong> <br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}