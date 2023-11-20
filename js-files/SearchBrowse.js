const songs = JSON.parse(songContent);

// Function to populate rows with song data
function updateSongTable() {
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

        tableBody.appendChild(row);
    });
}

window.onload = updateSongTable;