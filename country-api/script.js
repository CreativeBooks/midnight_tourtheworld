const tooltip = document.getElementById('tooltip');

document.querySelectorAll('svg a').forEach(area => {
    area.addEventListener('mousemove', (e) => {
        tooltip.innerHTML = area.dataset.info;
        tooltip.style.opacity = 1;
        tooltip.style.left = (e.pageX + 10) + 'px';
        tooltip.style.top = (e.pageY + 10) + 'px';
    });

    area.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
    });
});


function getURLParameter(name) {
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const selectedCountryName = getURLParameter('country');
const API_URL = 'https://ambient-equally-css-completed.trycloudflare.com/countries';

async function renderCountryData() {
    const mainContainer = document.getElementById('main-content');
    if(!mainContainer) return;
    mainContainer.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const countries = await response.json();

        const country = countries.find(c => c.name === selectedCountryName);

        if (country) {
            const backimage = country['background-image-url'];
            const cityNames = country.top_cities.map(city => city.city_name).join(', ');

            let countryHtml = '';

            // --- Country Header ---
            countryHtml += `
                <div class="country-section">
                     <div class="country-banner" style="background-image: url('${backimage}');">
                        <h1>${country.name}</h1>
                    </div>
                    <hr style="margin-top:0px;">
                    <h3>Some of the most visited cities are: ${cityNames}</h3>
                    <hr>
            `;

            // --- Cities Section ---
            countryHtml += `<h1 style="text-align: center;" id="dynamic-cities">Top Cities in ${country.name}</h1>`;
            countryHtml += `<div class="container">`;
                    
            country.top_cities.forEach((city, index) => {
                        
                const details = city.details;
                const annualTourists = details['annual tourists'] || 'N/A';
                const popularAttractions = (details['popular attractions'] && details['popular attractions'].length > 0)
                    ? details['popular attractions'].join(', ') 
                    : 'N/A';
                const imageUrl = details['image-url'] || '#';
                const firstCityId = (index === 0) ? `id="${city.city_name.toLowerCase().replace(/\s/g, '-')}"` : '';

                countryHtml += `
                     <div class="content" ${firstCityId}>
                        <h2>${city.city_name}</h2>
                        <br>
                        <p>
                            <b>Annual Tourists: </b> ${annualTourists} <br>
                            <br><b>Most Popular Attractions: </b>${popularAttractions}
                        </p>
                        <br>
                        <img src="${imageUrl}" alt="${city.city_name}">
                    </div>
                `;
            });
            countryHtml += `</div>`; 

            // --- Maps Section ---
            countryHtml += `<h1 style="text-align: center;margin-bottom:10px;" id="dynamic-maps">Maps for Each City</h1>`;
            countryHtml += `<div class="container">`;
                    
            country.top_cities.forEach(city => {
                    
                const mapIframe = city.details["map-url"] || '<p>Map not available</p>';
                countryHtml += `
                    <div class="content">
                        <h2>${city.city_name}</h2>
                        <br>
                        ${mapIframe}
                    </div>
                `;
            });
            countryHtml += `</div>`;

            // --- Transportation Section ---
            countryHtml += `<h1 style="margin-bottom:10px;" id="dynamic-trans">Transportation Tips</h1>`;
            countryHtml += `<div class="container">`;

                    
            let airportTips = `<h2>Airport</h2><br><p>`;
            country.top_cities.forEach(city => {
                const tip = city.details.transportation.airport || 'Information not available.';
                airportTips += `<b>${city.city_name}:</b> ${tip} <br><br>`;
            });
            airportTips += `</p>`;

                    
            let publicTips = `<h2>Local Public Transport</h2><br><p>`;
            country.top_cities.forEach(city => {
                const taxi = city.details.transportation.taxi || 'N/A';
                const buses = city.details.transportation.buses || 'N/A';
                const walking = city.details.transportation.walking || 'N/A';
                        
                publicTips += `
                    <b>${city.city_name}</b><br>
                    <b>Taxi/Rideshares: </b>${taxi}<br>
                    <b>Buses: </b>${buses}<br>
                    <b>Walking: </b>${walking}<br>
                    <br>
                `;
            });
            publicTips += `</p>`;

                    
            countryHtml += `<div class="ccontent">${airportTips}</div>`;
            countryHtml += `<div class="ccontent">${publicTips}</div>`;
            countryHtml += `</div></div>`;

            mainContainer.innerHTML = countryHtml;
        } else {
            mainContainer.innerHTML = `<h1>Country "${selectedCountryName}" not found.</h1>`;
        }
    } catch (error) {
        console.error('Error:', error);
        mainContainer.innerHTML = '<p style="color:red;">Error loading country data.</p>';
    }
}

renderCountryData();



// function getURLParameter(name) {
//    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//    const results = regex.exec(location.search);
//    return results === null? '': decodeURIComponent(results[1].replace(/\+/g, ' '));
// }

// const selectedCountryName = getURLParameter('country');

// fetch(`country-api/country.json`)
//     .then(response => response.json())
//     .then (allCountriesData =>{
//         const selectedCountry = allCountriesData.find(country => country.name === selectedCountryName);

//         if (selectedCountry) {
//             renderSingleCountry(selectedCountry);
//         } else {
//             document.getElementById('')
//         }
//     })


//window.onload = async () => {
    //const svgObj = document.getElementById("worldmap");

    //svgObj.addEventListener("load", async () => {
        //const svgDoc = svgObj.contentDocument;

        //const res = await fetch("http://127.0.0.1:8000/countries");
        //const countryCodes = await res.json();

        //console.log("Loaded countries:", countryCodes);

        //countryCodes.forEach(code => {
            //const region = svgDoc.getElementById(code);  // your SVG id MUST match code
            //if (region) {
                //region.style.fill = "lightgreen";

                //region.addEventListener("click", async () => {
                    //const detailsRes = await fetch(`http://127.0.0.1:8000/country/${code}`);
                    //const details = await detailsRes.json();

                    //alert(`Country: ${details.name}\nCapital: ${details.capital}`);
                //});
            //}
        //});
    //});
//};
