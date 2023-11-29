const legendContainer = document.querySelector('.legend-div');

function makeLegendItem(item) {
    const legendItem = document.createElement('div');
    legendItem.classList.add('legend-item');

    const img = document.createElement('img');
    img.setAttribute('src', item.party_img_uri);
    img.classList.add('party-img')

    const partyName = document.createElement('p');
    partyName.textContent = item.name;

    const percentageBar = document.createElement('div');
    percentageBar.classList.add('.progress-bar')
    percentageBar.style.width = item.votes_percentage + '%';
    percentageBar.style.backgroundColor = item.color;
    
    const nameAndPercentageBarWrapper = document.createElement('div');
    nameAndPercentageBarWrapper.append(partyName, percentageBar);

    legendItem.append(img, nameAndPercentageBarWrapper);

    return legendItem;
}

export function fillLegend(data) {
    legendContainer.innerHTML = '';

    data.forEach(item => {
        let legendItem = makeLegendItem(item)
        legendContainer.append(legendItem)
    });
}