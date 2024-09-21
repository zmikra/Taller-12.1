let DATA_URL = "https://japceibal.github.io/japflix_api/movies-data.json"; // URL que contiene los datos sobre películas
let lista = document.getElementById("lista"); // Seleccionamos el ul con id "lista"

    /**
     * Función que recibe por parámetro un array con los datos de las películas
     * Aquí simplemente hacemos un console.log para ver los datos.
     */
function showData(dataArray) {
    console.log(dataArray);
      // Si en el futuro decides mostrar los datos, puedes hacerlo aquí
      // Por ejemplo:
      /*dataArray.forEach(movie => {
      lista.innerHTML += `<li class="list-group-item">${movie.title}</li>`;
      });*/
}

    // Función para realizar el fetch
async function fetchMovies(url) { 
    let results = {};
    return fetch(url)
    .then(response => {
        if (response.ok) {
        return response.json();
        } else {
        throw Error(response.statusText);
        }
    })
    .then(response => {
        results.status = "ok";
        results.data = response; 
        return results;
    })
    .catch(error => {
        results.status = "error";
        results.data = error;
        return results;
    });
}

    // Al cargar la página, se realizará el fetch
window.onload = function() {
    fetchMovies(DATA_URL).then(results => {
    if (results.status === "ok") {
        showData(results.data); // Aquí puedes manejar los datos como desees
    } else {
        console.error("Error al cargar los datos:", results.data);
        lista.innerHTML = "<li class='list-group-item text-danger'>Error al cargar los datos.</li>"; 
    }
    });
};
