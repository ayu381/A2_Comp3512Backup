// JSON parsing for each file given
const songs = JSON.parse(songContent);
const artists = JSON.parse(artistContent);
const genres = JSON.parse(genreContent);

const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';


// Function to populate rows with song data
function songDisplay() {

    // Check if data is in local storage
    const storedData = localStorage.getItem('songData');

    if (storedData) {
        // Use local data
        const localData = JSON.parse(storedData);
        
        // Sorting logic
        const sortedLocalData = sortSongs(localData);
        displaySongs(sortedLocalData);
       
        // Display songs from local storage
        displaySongs(localData);
    } else {
        // Fetch data from API
        fetch (api)
            .then(response => response.json())
            .then(data => {
                // Store data in local storage
                localStorage.setItem('songData', JSON.stringify(data));

                // Sorting logic
                const sortedApiData = sortSongs(data);
                displaySongs(sortedApiData);
                
                // Display songs from the original data
                displaySongs(songs);
                
                // Save data to local storage
                localStorage.setItem('songData', JSON.stringify(songs));
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

// Sorting function
function sortSongs(songsSorted) {
    return songsSorted.sort((a, b) => {
        const artistA = a.artist.name.toUpperCase();
        const artistB = b.artist.name.toUpperCase();
        if (artistA < artistB) {
            return -1;
        }
        if (artistA > artistB) {
            return 1;
        }
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return titleA.localeCompare(titleB);
    });
}


// Function to display filtered songs
function displayFilteredSongs(filteredSongs) {
    displaySongs(filteredSongs);
}

// create rows and append cells
function displaySongs(songsToDisplay) {
    const tableBody = document.querySelector("#search-results tbody");

    // Clear existing rows
    tableBody.innerHTML = '';

    // Iterate through each song and create a new row in the table
    songsToDisplay.forEach((song) => {
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

    // Event listener for changes in the artist dropdown
    artistSelect.addEventListener('change', function () {
        const selectedArtist = this.value;
        if (selectedArtist) {
            // Filter songs based on selected artist
            const filteredSongs = songs.filter(song => song.artist.name === selectedArtist);
            // Display filtered songs
            displayFilteredSongs(filteredSongs);
        } else {
            // If no artist selected, display all songs
            songDisplay();
        }
    });
}

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

    // Event listener for changes in the genre dropdown
    genreSelect.addEventListener('change', filterSongs);
}

// Artist option event listener
document.getElementById("artist-select").addEventListener('change', function () {
    filterSongs();
});

// Genre option event listener
document.getElementById("genre-select").addEventListener('change', function () {
    filterSongs();
});

// Search button event listener
document.getElementById("search-button").addEventListener("click", function () {
    filterSongs();
});

// Function to filter songs based on selected artist, genre, and title
function filterSongs() {
    const selectedArtist = document.getElementById("artist-select").value;
    const selectedGenre = document.getElementById("genre-select").value;
    const typedTitle = document.getElementById("song-search").value.toLowerCase();

    const filteredSongs = songs.filter(song =>
        (!selectedArtist || song.artist.name === selectedArtist) &&
        (!selectedGenre || song.genre.name === selectedGenre) &&
        (!typedTitle || song.title.toLowerCase().startsWith(typedTitle))
    );

    displayFilteredSongs(filteredSongs);
}

// Call all functions when the window is loaded
window.onload = function () {
    songDisplay();
    artistOptions();
    genreOptions();
};