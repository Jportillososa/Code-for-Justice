var body = document.body;
const locationBtn = document.querySelector("#getLocation")

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    fetchAPI(position);
}
locationBtn.addEventListener("click", getLocation())

async function fetchAPI(position) {
    let response = await fetch('https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Public_Service_WebMercator/MapServer/25/query?where=1%3D1&outFields=*&outSR=4326&f=json');
    let data = await response.json();
    let info = data.features; //OWNER_RENTER PROVIDER ADDRESS WARD TYPE SUBTYPE STATUS NUMBER_OF_BEDS ON_SITE_MEDICAL_CLINIC AGES_SERVED HOW_TO_ACCESS WEB_URL
    console.log(info);
    info.forEach(element => { //Put .attributes before using the above ^
        var newCard = document.createElement('div');
        newCard.className = 'card'
        var newContainer = document.createElement('div');
        newContainer.className = 'container'
        var newHeader = document.createElement('h4');
        newHeader.textContent = element.attributes.OWNER_RENTER
        var provider = document.createElement('p');
        provider.textContent = `Name of provider: ${element.attributes.PROVIDER}`
        var address = document.createElement('p');
        address.textContent = element.attributes.ADDRESS
        var numberOfBeds = document.createElement('p');
        numberOfBeds.textContent = `Number of beds: ${element.attributes.NUMBER_OF_BEDS}`
        var status = document.createElement('p');
        status.textContent = `Status of establishment: ${element.attributes.STATUS}`
        var ward = document.createElement('p');
        ward.textContent = element.attributes.WARD
        var type = document.createElement('p');
        type.textContent = `Type of establishment: ${element.attributes.TYPE}`
        var subtype = document.createElement('p');
        subtype.textContent = `The subtype: ${element.attributes.SUBTYPE}`
        var onSiteMed = document.createElement('p');
        onSiteMed.textContent = `Is there a on-site medical clinic? ${element.attributes.ON_SITE_MEDICAL_CLINIC}`
        var ages = document.createElement('p');
        ages.textContent = `Ages served: ${element.attributes.AGES_SERVED}`
        var access = document.createElement('p');
        access.textContent = `How to access shelter: ${element.attributes.HOW_TO_ACCESS}`
        var url = document.createElement('p');
        url.textContent = `Website url (if any): ${element.attributes.WEB_URL}`
        body.appendChild(newCard);
        newCard.append(newContainer);
        newContainer.append(newHeader);
        newContainer.append(provider);
        newContainer.append(address);
        newContainer.append(numberOfBeds);
        newContainer.append(status);
        newContainer.append(ward);
        newContainer.append(type);
        newContainer.append(subtype);
        newContainer.append(onSiteMed);
        newContainer.append(ages);
        newContainer.append(access);
        newContainer.append(url);
    });
    console.log(position);
}
// https://data.cityofchicago.org/resource/eep4-c978.json Info for Chicago homelessness crisis