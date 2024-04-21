  // Obtener el ID de la película desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  // Obtener los detalles de la película usando el ID
  const API_URL = 'https://www.episodate.com/api';
  const movieDetailsUrl = `${API_URL}/show-details?q=${movieId}`;

  fetch(movieDetailsUrl)
    .then(response => response.json())
    .then(data => {
      displayMovieDetails(data.tvShow);
    })
    .catch(error => {
      console.log('Error:', error);
    });

  function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetailsContainer');

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.name;

    const imageElement = document.createElement('img');
    imageElement.src = movie.image_thumbnail_path;

    const startDateElement = document.createElement('h3');
    startDateElement.textContent = 'Fecha de estreno: ' + movie.start_date;

    const statusElement = document.createElement('h3');
    statusElement.textContent = 'Estado: ' + movie.status;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = 'Descripción: ' + movie.description;

    movieDetailsContainer.appendChild(titleElement);
    movieDetailsContainer.appendChild(imageElement);
    movieDetailsContainer.appendChild(startDateElement);
    movieDetailsContainer.appendChild(statusElement);
    movieDetailsContainer.appendChild(descriptionElement);
  }