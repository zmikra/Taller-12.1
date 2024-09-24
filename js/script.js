let DATA_URL = "https://japceibal.github.io/japflix_api/movies-data.json"; // URL que contiene los datos sobre películas
let moviesData = [];

// Función para realizar el fetch
function fetchMovies(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json(); // Retorna los datos en formato JSON
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            moviesData = data; // Guardamos los datos en una variable global
            console.log("Datos cargados:", moviesData); // Muestra los datos en la consola
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
}

// Función para generar estrellas según la calificación
function generateStars(rating) {
    let starsHTML = '';
    const maxStars = 5; // Máximo de estrellas a mostrar

    const fullStars = Math.floor(rating); // Estrellas completas
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Estrella media
    const emptyStars = maxStars - fullStars - halfStar; // Estrellas vacías

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="fa fa-star checked"></span>';
    }
    if (halfStar) {
        starsHTML += '<span class="fa fa-star-half-o checked"></span>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="fa fa-star"></span>';
    }

    return starsHTML;
}

// Función para mostrar las películas filtradas
function displayMovies(listMovies, searchInput) {
    let moviesHTML = "";
    searchInput = searchInput.toLowerCase();

    listMovies = listMovies.filter(movie => {
        return movie.title.toLowerCase().includes(searchInput) || 
               movie.genres.some(genre => genre.name.toLowerCase().includes(searchInput)) ||
               movie.tagline.toLowerCase().includes(searchInput) || 
               movie.overview.toLowerCase().includes(searchInput);
    });

    for (let movie of listMovies) {
        moviesHTML += `
            <li class="list-group-item text-light movie-item" data-id="${movie.id}" onclick="showMovieInfo(${movie.id})">
                <div>
                    <h5>${movie.title}</h5>
                    <p>${movie.tagline}</p>
                </div>
                <div class="star-container">
                    <p>${generateStars(movie.vote_average)}</p>
                </div>
            </li>
        `;
    }

    if (moviesHTML === "") {
        moviesHTML = "<li class='list-group-item text-light'>No se encontraron películas.</li>";
    }

    document.getElementById("lista").innerHTML = moviesHTML;
}

// Función para mostrar información de la película en el offcanvas
function showMovieInfo(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    
    if (movie) {
        const offcanvasBody = document.getElementById('offcanvasBody');
        offcanvasBody.innerHTML = `
            <h5>${movie.title}</h5>
            <p>${movie.overview}</p>
            <p><strong>Géneros:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
            <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#extra-info" aria-expanded="false" aria-controls="extra-info">
                Más info ▼
            </button>
            <div class="collapse" id="extra-info">
                <p>Año: ${new Date(movie.release_date).getFullYear()}</p>
                <p>Duración: ${movie.runtime} minutos</p>
                <p>Presupuesto: $${movie.budget.toLocaleString()}</p>
                <p>Ganancias: $${movie.revenue.toLocaleString()}</p>
            </div>
        `;

        const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasInfo'));
        offcanvas.show();
    }
}

// Al cargar la página, se realizará el fetch
window.onload = function() {
    fetchMovies(DATA_URL); // Solo llama a la función fetch
};

// Agregar el evento al botón de búsqueda
document.getElementById("btnBuscar").addEventListener("click", () => {
    const searchInput = document.getElementById("inputBuscar").value;
    if (searchInput) {
        displayMovies(moviesData, searchInput);
    } else {
        alert("Por favor, ingresa un término de búsqueda.");
    }
});
