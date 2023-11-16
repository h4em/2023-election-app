import { initCharts, setChartData } from './charts.js';
import { initMap } from './map.js';

const searchbar = document.querySelector('.searchbar');
const hintContainer = document.querySelector('.search-hints');
let highlightedHintIndex = -1;

document.addEventListener('DOMContentLoaded', init);

function init() {   
    setSearchbarListeners();
    updateSearchContainerWidth();

    window.addEventListener('resize', updateSearchContainerWidth);

    initCharts();
    initMap();
}

function setSearchbarListeners() {
    //Listen for input
    searchbar.addEventListener('input', showHints);
    
    searchbar.addEventListener('input', resetHiglightedHintIndex)

    //Listen for arrowkeys
    searchbar.addEventListener('keydown', hintContainerArrowKeyNav);

    //Prevents the caret from shifting place
    searchbar.addEventListener('keydown', function(event) {
        if(event.key.startsWith('Arrow')) {
            event.preventDefault();
        }
    });

    //?
    //searchbar.addEventListener('submit', emptyHintsContainer);
}

//to mozna jakos ladnie CSSem zrobic
function updateSearchContainerWidth() {
    const searchbarWidth = searchbar.offsetWidth;
    hintContainer.style.width = searchbarWidth + 'px'
}

function emptyHintsContainer() {
    hintContainer.innerHTML = '';
}

//z tym resetowaniem indexu moga problemu jakies byc, jest strasznie duzo przypadkow.
function resetHiglightedHintIndex() {
    highlightedHintIndex = -1;
}

function hintContainerArrowKeyNav(event) {
    const hints = hintContainer.querySelectorAll('.hint');

    if (event.key === 'ArrowUp' && highlightedHintIndex > 0) {
        updateHintHiglight(--highlightedHintIndex);
    } else if (event.key === 'ArrowDown' && highlightedHintIndex < hints.length - 1) {
        updateHintHiglight(++highlightedHintIndex);
    }
}

function updateHintHiglight(index) {
    const hints = hintContainer.querySelectorAll('.hint');
    highlightedHintIndex = index;

    hints.forEach((item, index) => {
        if(index !== highlightedHintIndex) {
            if(item.classList.contains('highlight')) {
                item.classList.remove('highlight')
            }
        }
    });
    
    hints[highlightedHintIndex].classList.add('highlight');
}

function makeHint(content, index) {
    const hint = document.createElement('div');
    hint.classList.add('hint');    
    hint.textContent = content;

    //trigger searcbar submission!!!
    // hint.addEventListener('click', () => {
    //     fetchInstitutionResults(item);
    //     updateSearchbarValue(item);
    // });

    hint.addEventListener('mouseover', () => {
        updateHintHiglight(index);
    });

    return hint;
} 


async function showHints() {
    const keyword = searchbar.value;
    //tu sie doda opcje z dropdownu
    //const category = ...

    if (keyword === '') {
        emptyHintsContainer();
        return;
    }

    //?keyword=${keyword}&category=${category}
    const response = await fetch(`/institution_search_bar?q=${keyword}`);
    const data = await response.json();

    emptyHintsContainer();

    if (data.length === 0) {
        const newHint = makeHint('No results.', 0);
        hintContainer.append(newHint);
    } else {
        data.forEach((item, index) => {
            const newHint = makeHint(item, index);
            hintContainer.append(newHint);
        });
    }
}

async function fetchInstitutionResults(institution_name) {
    const response = await fetch(`/institution_results?q=${institution_name}`);
    const data = await response.json();

    setChartData(data);
}

/*
    Co niedziala:

    - no ogolnie wyszukiwanie LIKE jest chujowe strasznie XD

    - caly submit trzeba zrobic

    - SUBMIT MUSI BYC ZABEZPIECZONY ze mozna squerowac tylko item z podpowiedzi (istniejacy.)
    - przy resetowaniu indexu moga byc jakies bugi
    - zeby hintsy nie rozszerzaly containera tylko przykrywaly to co pod nim
    - zeby mapka pokazywala destynacje po submicie
    python googlesearch-python

    - wiec trzeba bedzie jakos ogarnac modul ktory na podstawie tego co przyjdzie z bazy
        szukal w googlu latitute i longitude
    - no i ta legenda dla chartsow caly modul, zeby sie spod chartsow wysuwala
    - timeout to co gracjan mowil na hintowaniu.

    - no i jakies takie pierdoly typu zapisywanie i wyswietlanie tego dla czego sa wyniki
    - moze zeby to co highlighted bylo w searchbarze ale to tez rzeczy psuje
*/