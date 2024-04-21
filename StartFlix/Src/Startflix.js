const moviesContainer = document.getElementById('movies');
let currentPage = 1;
const limit = 10;
const API_URL = 'https://www.episodate.com/api';

function getMovies(page, searchTerm = '') {
  moviesContainer.innerHTML = ''; // Limpiar el contenedor de películas

  if (searchTerm === '') {
    // Llamada a la API para obtener las películas más populares
    const popularUrl = `${API_URL}/most-popular?page=${page}`;
    fetch(popularUrl)
      .then(response => response.json())
      .then(data => {
        displayMovies(data.tv_shows);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  } else {
    // Llamada a la API para realizar la búsqueda
    const searchUrl = `${API_URL}/search?q=${searchTerm}&page=${page}`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        displayMovies(data.tv_shows);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
}

function displayMovies(movies) {
  movies.forEach(movie => {
    const movieElement = document.createElement('ul');
    movieElement.classList.add('movie');

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.name;

    const imageElement = document.createElement('img');
    imageElement.src = movie.image_thumbnail_path;

    const startDateElement = document.createElement('h3');
    startDateElement.textContent = 'Fecha de estreno: ' + movie.start_date;

    imageElement.addEventListener('click', () => {
      showMovieDetails(movie);
    });

    movieElement.appendChild(titleElement);
    movieElement.appendChild(imageElement);
    movieElement.appendChild(startDateElement);

    moviesContainer.appendChild(movieElement);
  });
}

function showMovieDetails(movie) {
  // Mostrar los detalles de la película
//  alert(`Detalles de la película:\n\nTítulo: ${movie.name}\nFecha de estreno: ${movie.start_date}}\nEstado: ${movie.status}\nDescripción: ${movie.description}`);
  // Obtener el ID de la película
  const movieId = movie.id;
  const movieDetailsUrl = `Details.html?id=${movieId}`;
  window.location.href = movieDetailsUrl;
}

function nextPage() {
  currentPage++;
  getMovies(currentPage);
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    getMovies(currentPage);
  }
}

// Obtener las películas de la primera página al cargar la aplicación
getMovies(currentPage);

// Asignar controladores de eventos a los botones de paginación
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

previousButton.addEventListener('click', previousPage);
nextButton.addEventListener('click', nextPage);

// Obtener referencia al formulario de búsqueda
const searchForm = document.getElementById('searchForm');

// Agregar controlador de eventos al formulario de búsqueda
searchForm.addEventListener('submit', event => {
  event.preventDefault(); // Evitar el envío del formulario

  const searchTerm = document.getElementById('searchInput').value;
  getMovies(currentPage, searchTerm);
});







    /*dise;o carrusel*/

    const fila = document.querySelector('.contenedor-carousel');
    const peliculas = document.querySelector('.pelicula')
    
    const flechaIzquierda = document.getElementById('flecha-izquierda');
    
    const flechaDerecha = document.getElementById('flecha-derecha');
    
    
    // ? ----- ----- Event Listener para la flecha derecha. ----- -----
    flechaDerecha.addEventListener('click', () => {
      fila.scrollLeft += fila.offsetWidth;
    
      const indicadorActivo = document.querySelector('.indicadores .activo');
      if(indicadorActivo.nextSibling){
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
      }
    });
    
    // ? ----- ----- Event Listener para la flecha izquierda. ----- -----
    flechaIzquierda.addEventListener('click', () => {
      fila.scrollLeft -= fila.offsetWidth;
    
      const indicadorActivo = document.querySelector('.indicadores .activo');
      if(indicadorActivo.previousSibling){
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
      }
    
    });
        /*
    import "./Index.css";
    
    
    
    axios.defaults.baseURL = "https://www.episodate.com";
    
    const tvShowList = document.querySelector(".contenedor");
    const tvShowTemplate = document.querySelector("#tvshow-template").innerHTML.trim();
    
    getTvShows().then((result) => {
        for (const tvShow of result.tv_shows) {
            const tvShowElement = document.createElement("div");
            tvShowElement.innerHTML = tvShowTemplate
                .replace("{{url}}", tvShow.image_thumbnail_path)
                .replace("{{title}}", tvShow.name);
    
            tvShowList.append(tvShowElement.firstChild);
        }
    });
    
    function getTvShows(page = 1) {
        return axios
            .get("/api/most-popular?page=" + page)
            .then((response) => response.data);
    }
    */
