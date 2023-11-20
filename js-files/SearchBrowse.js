const songs = JSON.parse(songContent);

// Function to populate rows with song data
function songDisplay() {
    const tableBody = document.querySelector("#search-results tbody");

    // Iterate through each song and create a new row in the table
    songs.forEach((song) => {
        const row = document.createElement("tr");

        // Cell generator for each property
        const titleCell = document.createElement("td");
        titleCell.textContent = song.title;
        row.appendChild(titleCell);

        const artistCell = document.createElement("td");
        artistCell.textContent = song.artist.name;
        row.appendChild(artistCell);

        const yearCell = document.createElement("td");
        yearCell.textContent = song.year;
        row.appendChild(yearCell);

        const genreCell = document.createElement("td");
        genreCell.textContent = song.genre.name;
        row.appendChild(genreCell);

        const popularityCell = document.createElement("td");
        popularityCell.textContent = song.details.popularity; 
        row.appendChild(popularityCell);

        tableBody.appendChild(row);
    });
}

const artists = JSON.parse(artistContent);

// Artist select options function
function artistOptions() {
    const artistSelect = document.getElementById("artist-select");

    // Create an option for each artist and add it to the select element
    artists.forEach((artist) => {
        const option = document.createElement("option");
        option.value = artist.name;
        option.textContent = artist.name;
        artistSelect.appendChild(option);
    });
}

const genres = JSON.parse(genreContent);

// Genre select options function
function genreOptions() {
    const genreSelect = document.getElementById("genre-select");

    // Create an option for each genre and add it to the select element
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.name;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

// Call all functions the window is loaded
window.onload = function () {
    songDisplay();
    artistOptions();
    genreOptions();
};