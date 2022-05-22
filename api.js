const locationBtn = document.querySelector("#getLocation")
const container = document.querySelector(".shelterContainer")

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    window.initMap = initMap(position);
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
        newCard.className = 'card items'
        var newContainer = document.createElement('div');
        // newContainer.className = 'container'
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
        container.appendChild(newCard);
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

function initMap(position) {
    // Create the map.
    const location = { lat: position.coords.latitude, lng: position.coords.longitude }; //35.00573247895826, -80.84910169025957 the coordinates of RV
    const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 17,
        mapId: "8d193001f940fde3",
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");

    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) {
            getNextPage();
        }
    };

    // Perform a nearby search.
    service.nearbySearch(
        { location: location, radius: 3500, type: "real_estate_agency" },
        (results, status, pagination) => {
            if (status !== "OK" || !results) return;

            addPlaces(results, map);
            moreButton.disabled = !pagination || !pagination.hasNextPage;
            if (pagination && pagination.hasNextPage) {
                getNextPage = () => {
                    // Note: nextPage will call the same handler function as the initial call
                    pagination.nextPage();
                };
            }
        }
    );
}

function addPlaces(places, map) {
    const placesList = document.getElementById("places");

    for (const place of places) {
        if (place.geometry && place.geometry.location) {
            const image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            new google.maps.Marker({
                map,
                icon: image,
                title: place.name,
                position: place.geometry.location,
            });

            const li = document.createElement("li");

            li.textContent = place.name;
            placesList.appendChild(li);
            li.addEventListener("click", () => {
                map.setCenter(place.geometry.location);
            });
        }
    }
}

// https://data.cityofchicago.org/resource/eep4-c978.json Info for Chicago homelessness crisis