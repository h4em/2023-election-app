import { initCharts, setChartData } from './charts.js';
import { initMap, updateMap } from './map.js';
import { fillLegend } from './legend.js';

const searchbar = document.querySelector('.searchbar');
const categoryDropdown = document.querySelector('#category-dropdown');
const hintContainer = document.querySelector('.search-hints');
const resultLabel = document.querySelector('.result-label-span');
const yearSpan = document.querySelector('.year');
const scrollImg = document.querySelector('.scroll-gif');
const aboutSection = document.querySelector('.about-section');

let highlightedHintIndex = -1;
let hasSearched = false;

document.addEventListener('DOMContentLoaded', init);

function init() {   
    setSearchbarListeners();
    setYearInFooter();

    scrollImg.addEventListener('click', function() {
        const aboutRect = aboutSection.getBoundingClientRect();

        const y = aboutRect.top + window.scrollY; 
        
        window.scrollTo({
            top: y - 24,
            behavior: 'smooth'
        });
    });

    initCharts();
    initMap();
}

function setYearInFooter() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    yearSpan.textContent = currentYear;
}

function setSearchbarListeners() {
    //Listen for input
    searchbar.addEventListener('input', getHints);
    
    //Resets the highlighted hint when input changes
    searchbar.addEventListener('input', resetHiglightedHintIndex)

    //Listen for arrowkeys
    searchbar.addEventListener('keydown', hintContainerArrowKeyNav);

    //Prevents the caret from shifting place, NIE MOZNA chodzic po literach szczalkiem lewo prawo
    searchbar.addEventListener('keydown', function(event) {
        if(event.key.startsWith('Arrow')) {
            event.preventDefault();
        }
    });

    //jak traci focus to empty hints bar

    searchbar.addEventListener('onblur', function() {
        console.log('asd');
    });

    //?
    //searchbar.addEventListener('submit', emptyHintsContainer);
}

function emptyHintsContainer() {
    hintContainer.innerHTML = '';
}

function emptySearchbar() {
    searchbar.value = '';
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

function makeHint(data, category, index) {
    const hint = document.createElement('div');
    hint.classList.add('hint');    
    
    hint.dataset.id = data.id;
    hint.dataset.category = category;
    hint.textContent = data.body;
    
    hint.addEventListener('click', () => {
        getResults(data.id, category);

        getLocationCoordinates(data.body, category)

        updateResultsLabel(data.body, category);

        emptyHintsContainer();
        emptySearchbar();
    });

    hint.addEventListener('mouseover', () => {
        updateHintHiglight(index);
    });

    return hint;
} 

function updateResultsLabel(text, category) {
    const prefix = getPrefixForCategory(category);
    
    resultLabel.textContent = prefix + ' ' + text;
}

function getPrefixForCategory(category_id) {
    switch (category_id) {
        case '3':
            return 'gmina'
        case '4':
            return 'powiat'
        case '5':
            return 'województwo'
        default:
            return '';
    }
}

async function getLocationCoordinates(placename, category) {
    const response = await fetch(`/location?placename=${placename}&category=${category}`);
    const data = await response.json();

    updateMap(data);
}

async function getHints() {
    const keyword = searchbar.value;
    const category = categoryDropdown.value;

    if (keyword === '') {
        emptyHintsContainer();
        return;
    }

    const response = await fetch(`/hints?keyword=${keyword}&category=${category}`);
    const data = await response.json();

    emptyHintsContainer();

    if (data.length === 0) {
        emptyHintsContainer();
        const newHint = makeHint('No results.', 0, 0);
        hintContainer.append(newHint);
    } else {
        data.forEach(async (item, index) => {
            const newHint = makeHint(item, category, index);
            hintContainer.append(newHint);
        });
    }
}

/*
    to kiedy i jak mozna request zsubmitowac jest bardzo wazne.
    jakos to zabezpieczyc zeby mozna bylo squerowac resultsy tylko
    dla czegos co istnieje w bazie!
*/
async function getResults(id, category) {
    const response = await fetch(`/results?id=${id}&category=${category}`);
    const data = await response.json();

    if(!hasSearched) {
        let appDivLabel = $("h2:contains('App')");
        let marginOffset = parseInt(appDivLabel.css('margin-top')) || 0;
        
        $('html, body').animate({
            scrollTop: appDivLabel.offset().top - marginOffset
        }, 1000);
        
        $(".results-div").slideDown(1000);
        hasSearched = true;
    }

    fillLegend(data);
    setChartData(data);
}

/*
    jak sie zmienia kategorie niech sie czysci searchbar i hint container

    timeouty na get res
*/

/*
    DZISIAJ: skończyć robić caly submit, frontend hintsów?, timeouty?
    jak nie ma geojson polygon to marker, jak sa to sam outline, ogarnac mape do końca.

    - caly submit trzeba zrobic

    - SUBMIT MUSI BYC ZABEZPIECZONY ze mozna squerowac tylko item z podpowiedzi (istniejacy.)
    - przy resetowaniu indexu moga byc jakies bugi
    - zeby hintsy nie rozszerzaly containera tylko przykrywaly to co pod nim
    - zeby mapka pokazywala destynacje po submicie

    - timeout to co gracjan mowil na hintowaniu.

    - no i jakies takie pierdoly typu zapisywanie i wyswietlanie tego dla czego sa wyniki
    - moze zeby to co highlighted bylo w searchbarze ale to tez rzeczy psuje
*/