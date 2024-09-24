let DATA_URL = "https://japceibal.github.io/japflix_api/movies-data.json"; // URL que contiene los datos sobre películas

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
            console.log(data); // Muestra los datos en la consola
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
}

// Al cargar la página, se realizará el fetch
window.onload = function() {
    fetchMovies(DATA_URL); // Solo llama a la función fetch
};

