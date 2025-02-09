const apiKey = '6c694e366dmsh18627374207b02cp1b5aadjsn8f05f481e2ca';
const apiHost = 'weatherapi-com.p.rapidapi.com';

let url; // URL will be dynamically set

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
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const result = await response.json();
        console.log(result)
        displayWeather(result);
        
        
    } catch (error) {
        console.error(error);
        document.getElementById('weather-info').innerText = 'Failed to load weather data';
    }
}

function displayWeather(data) {
    document.getElementById('location').innerHTML = `
        <p class="loc">${data.location.name}, ${data.location.country}</p>
        <p class="loc2">Coordinates: ${data.location.lat}, ${data.location.lon}</p>
        <p class="loc2">Time-Zone ID: ${data.location.tz_id}</p>
    `;
    document.getElementById('icon').innerHTML = `
        <img class="clouds" src="https:${data.current.condition.icon}" alt="weather"/>
        <p class="temp">${data.current.temp_c}°C</p>
        <p class="temp1">${data.current.condition.text}</p>
        <p class="temp2">Feels like ${data.current.feelslike_c}°C</p>
    `;
}



// Function to get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${lon}`;
                fetchWeatherData();
            },
            (error) => {
                console.warn("Geolocation denied or unavailable, using default location.");
                url = `https://weatherapi-com.p.rapidapi.com/current.json?q=Delhi,India`;
                fetchWeatherData();
            }
        );
    } else {
        console.warn("Geolocation not supported, using default location.");
        url = `https://weatherapi-com.p.rapidapi.com/current.json?q=Delhi.India`;
        fetchWeatherData();
    }
}

// Search functionality for manual location input
document.getElementById('change-location').addEventListener('click', () => {
    const newLocation = document.getElementById('location-input').value.trim() || 'Delhi';
    url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(newLocation)}`;
    fetchWeatherData();
});

// Run the function to get user's location when the app loads
getUserLocation();
