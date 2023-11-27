const legendContainer = document.querySelector('.legend-div');

function makeLegendItem(item) {
    const legendItem = document.createElement('div');
    legendItem.classList.add('legend-item');

    const img = document.createElement('img');
    img.setAttribute('src', item.party_img_uri);
    img.classList.add('party-img')

    const partyName = document.createElement('p');
    partyName.textContent = item.name;

    // const percentageBar = makePercentageBar(item.num_of_votes, sumOfVotes)
    // const partyColor = item.color;

    //item.votes_percentage
    
    legendItem.append(img, partyName);

    return legendItem;
}

export function fillLegend(data) {
    legendContainer.innerHTML = '';

    data.forEach(item => {
        let legendItem = makeLegendItem(item)
        legendContainer.append(legendItem)
    });
}