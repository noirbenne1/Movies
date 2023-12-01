/*
 * AU CHARGEMENT DE LA PAGE ON AFFICHE LA LISTE DES FILMS DEPUIS Le ARRAY movies (dans js/data.js)
 */

// Selection de la liste des films
const displayMovies = document.querySelector('.displayMovies');
// console.log(displayMovies);

// On cache la section detailsMovies au chargement de la page
const detailsMovies = document.querySelector('.detailsMovies');
detailsMovies.classList.add('hidden');

// On cache la section modal au chargement de la page
const modalTrailer = document.querySelector('#modal');
modalTrailer.classList.add('hidden');
// console.log(modalTrailer);

// On affiche le nombre de films
const nbreFilms = document.querySelector('.nbreFilms');
nbreFilms.textContent = movies.length;

// On génère les items des films dans la section displayMovies

movies.forEach((movie, index) => {
    displayMovies.innerHTML += `
        <article data-index="${index}" class="card">
            <div class="card-img">
                <img src="${movie.image}" alt="${movie.title}">
            </div>
            <div class="card-content">
                <h3>${movie.title}</h3>
                <h4>${movie.director}</h4>
            </div>
        </article>`;
});


/*
 * fonction showDetails
 * role : afficher le detail d'un film
 */
const showDetails = (event) => {
    // console.log(event.target);
    console.log(event.currentTarget);
    // console.log(event.target.lastElementChild);

    // On récupère l'index du film qui a été cliqué
    const index = event.currentTarget.getAttribute('data-index');
    console.log(index);

    // On cache la liste des movies
    document.querySelector('.mainContent').classList.add('hidden');

    // On affiche le panneau de détail
    detailsMovies.classList.remove('hidden');

    // On affiche les données du film qui a été cliqué
    const imageElt = document.querySelector('.detailsImg img');
    imageElt.src = movies[index].image;
    imageElt.alt = movies[index].title;

    const titleElt = document.querySelector('.title');
    titleElt.textContent = movies[index].title;

    const directorElt = document.querySelector('.director');
    directorElt.textContent = movies[index].director;

    const actorsElt = document.querySelector('.actors');
    actorsElt.textContent = movies[index].actors.join(', ');

    const genreElt = document.querySelector('.genre');
    genreElt.textContent = movies[index].genre.join(' - ');

    const durationElt = document.querySelector('.duration');
    durationElt.textContent = movies[index].duration;

    const dateElt = document.querySelector('.date');
    dateElt.textContent = movies[index].date;

    const resumeElt = document.querySelector('.resume');
    resumeElt.textContent = movies[index].resume;

    // Video
    const video = document.querySelector('iframe');
    video.setAttribute('src', 'https://www.youtube.com/embed/' + movies[index].traileryt + '?enablejsapi=1&version=3&playerapiid=ytplayer');
}



// Ecouteur d'evt pour afficher les détails
const cardMovies = document.querySelectorAll('.card');
for (let cardMovie of cardMovies) {
    cardMovie.addEventListener('click', showDetails);
}

// Ecouteur d'evt pour revenir sur la liste des films
const btnBack = document.querySelector('.back button');
btnBack.addEventListener('click', () => {
    // On affiche la liste des movies
    document.querySelector('.mainContent').classList.remove('hidden');
    // on cache les détails
    detailsMovies.classList.add('hidden');
});

// Ecouteur d'evt pour affiche la modale
const btnBa = document.querySelector('.btn');
btnBa.addEventListener('click', () => {
    modalTrailer.classList.remove('hidden');

});

// Ecouteur d'evt pour cacher la modal
modalTrailer.addEventListener('click', () => {
    // arreter la video au clic à la fermeture de la modal -> API youtube
    document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    // on cache la modal
    modalTrailer.classList.add('hidden');
});
