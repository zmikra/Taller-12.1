let DATA_URL = "https://japceibal.github.io/japflix_api/movies-data.json"; // URL que contiene los datos sobre películas
let moviesData = [];

// Función para realizar el fetch
function fetchMovies(url) {
    fetch(url).then(response => {
            if (response.ok) {
                return response.json(); // Retorna los datos en formato JSON
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            moviesData = data; // Guardamos los datos en una variable global
            console.log(moviesData); // Muestra los datos en la consola
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
}

// Función para mostrar las películas filtradas
function displayMovies(listMovies, searchInput) {
    let moviesHTML = "";
    searchInput = searchInput.toLowerCase();

    // Filtrar películas según el input de búsqueda
    listMovies = listMovies.filter(movie => {
        return movie.title.toLowerCase().includes(searchInput) || movie.genres.some(genre => genre.toLowerCase().includes(searchInput)) ||
        movie.tagline.toLowerCase().includes(searchInput) || movie.overview.toLowerCase().includes(searchInput);
    });

    // Crear el HTML de las películas filtradas
    for (let movie of listMovies) {
        moviesHTML += `
            <li class="list-group-item text-light">
                <h5>${movie.title}</h5>
                <p>${movie.tagline}</p>
                <p>⭐ ${movie.vote_average}</p>
            </li>
        `;
    }

    if (moviesHTML === "") {
        moviesHTML = "<li class='list-group-item text-light'>No se encontraron películas.</li>";
    }

    document.getElementById("lista").innerHTML = moviesHTML;
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
    }
});

