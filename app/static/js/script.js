function hintInstitution() {
    const keyword = document.getElementById('searchInput').value;
    const hintsContainer = document.getElementById('hints');
    const resultsContainer = document.getElementById('results-container');

    if (keyword.length === 0) {
        hintsContainer.innerHTML = ''; // Clear hints if the input is empty
        return;
    }

    // Make an AJAX request to your Flask server to get matching results
    fetch(`/institution_search_bar?q=${keyword}`)
        .then(response => response.json())
        .then(data => {
            hintsContainer.innerHTML = ''; // Clear existing hints
            resultsContainer.innerHTML = ''; // Clear existing search results

            data.forEach(result => {
                const hintElement = document.createElement('div');
                hintElement.textContent = result;

                // Add an event listener to each hint element
                hintElement.addEventListener('click', () => {
                    // When a hint is clicked, update the search input with the hint and trigger a new query
                    document.getElementById('searchInput').value = result;
                    // performNewQuery(result);
                });

                hintsContainer.appendChild(hintElement);
            });
        });
}

function fetchIntitutionResults(institution) {
    fetch(`/get_institution_results?q=${institution}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = ''; 

            data.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.textContent = result;
                resultsContainer.appendChild(resultElement);
            });
        });
}