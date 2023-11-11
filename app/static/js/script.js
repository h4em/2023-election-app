import { initCharts } from './charts.js';

//const searchForm = document.querySelector('#search-form')
const searchbar = document.querySelector('#searchbar');
const hintContainer = document.querySelector('#searchbar-hints-div');
let hintIndex = -1;

document.addEventListener('DOMContentLoaded', init);

function init() {
    setSearchbarListeners();
    initCharts();
}

function updateSearchbarValue(value) {
    searchbar.value = value;
}

function emptyHintsContainer() {
    hintContainer.innerHTML = '';
}

function setSearchbarListeners() {
    searchbar.addEventListener('input', hintInstitutions);
    
    //prevents the caret from shifting place
    searchbar.addEventListener('keydown', function(event) {
        if(event.key.startsWith('Arrow')) {
            event.preventDefault();
        }
    });
    
    searchbar.addEventListener('keydown', hintContainerArrowKeyNav);

    searchbar.addEventListener('submit', fetchInstitutionResults(searchbar.value));
    
    searchbar.addEventListener('submit', emptyHintsContainer);
}

function highlightHint(hint) {
    if (hint) {
        hint.classList.add('highlight');
    }
}

function dehighlightHint(hint) {
    if (hint) {
        hint.classList.remove('highlight');
    }
}

function updateHintsHighlighting(newIndex) {
    const hints = hintContainer.querySelectorAll('.hint-div');

    const currHint = hints[hintIndex];
    const newHint = hints[newIndex];

    dehighlightHint(currHint);
    highlightHint(newHint);
}

function updateHintIndex(newIndex) {
    updateHintsHighlighting(newIndex);
    hintIndex = newIndex;
}

function hintContainerArrowKeyNav(event) {
    const hints = hintContainer.querySelectorAll('.hint-div');

    if (event.key === 'ArrowUp' && hintIndex > 0) {
        updateHintIndex(hintIndex - 1);
    } else if (event.key === 'ArrowDown' && hintIndex < hints.length - 1) {
        updateHintIndex(hintIndex + 1);
    }
}

//nazewnictwo i ogolnie o co chodzi.
async function hintInstitutions() {
    const keyword = searchbar.value;

    if (keyword.length === 0) {
        emptyHintsContainer();
    }

    const response = await fetch(`/institution_search_bar?q=${keyword}`);
    const data = await response.json();

    emptyHintsContainer();

    data.forEach((element, index) => {
        const hintElement = document.createElement('div');
        hintElement.textContent = element;
        hintElement.className = 'hint-div';

        //tutaj chyba nie bedzie element 
        hintElement.addEventListener('click', () => {
            fetchInstitutionResults(element);
            updateSearchbarValue(element);
        });

        hintElement.addEventListener('mouseover', () => {
            updateHintIndex(index);
        });

        hintContainer.append(hintElement);
    });
}

async function fetchInstitutionResults(institution_name) {
    const response = await fetch(`/institution_results?q=${institution_name}`);
    const data = await response.json();

    data.forEach(element => {
        console.log(element);
    });
}

/*
    TODO: po submicie 
        - clear search baru
        - niech znika hintsContainer
*/