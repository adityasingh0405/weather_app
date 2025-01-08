const apiKey = '6c694e366dmsh18627374207b02cp1b5aadjsn8f05f481e2ca';
const apiHost = 'weatherapi-com.p.rapidapi.com';

let location1 = '53.1,-0.13'; 
let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location1}`;

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
    }
};

async function fetchWeatherData() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayWeather(result);
        console.log(result);
    } catch (error) {
        console.error(error);
        document.getElementById('weather-info').innerText = 'Failed to load weather data';
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('location');
    weatherDiv.innerHTML = `
        <p class="loc"> ${data.location.name}, ${data.location.country}</p>
        <p class="loc2">Coordinates: ${data.location.lat},${data.location.lon}</p>
        <p class="loc2">Time-Zone ID: ${data.location.tz_id}</p>
    `;
    const weatherDiv1 = document.getElementById('icon');
    weatherDiv1.innerHTML = `
        <img class="clouds" src=${data.current.condition.icon} alt="weather"/>
        <p class="temp" >${data.current.temp_c}°C</p>
        <p class="temp1">${data.current.condition.text} </p>
        <p class="temp2"> Feels like ${data.current.feelslike_c}°C</p>
    `;

}

document.getElementById('change-location').addEventListener('click', () => {
    const newLocation = document.getElementById('location-input').value;
    if (newLocation) {
        const encodedLocation = encodeURIComponent(newLocation);
        url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodedLocation}`;
        console.log('Fetching data from URL:', url); 
        fetchWeatherData(); 
    } else {
        alert('Please enter a location');
    }
});


fetchWeatherData();

