// DOM Elements

// Selecting the search button
const searchButton = document.getElementById('search-button');

// Selecting the input field for city names
const cityInput = document.getElementById('city-input');

// Selecting the div for displaying current weather
const currentWeatherDiv = document.getElementById('current-weather');

// Selecting the divs for displaying the 5-day forecast
// This creates an array of all elements with the class 'forecast-day'
const forecastDivs = Array.from(document.getElementsByClassName('forecast-day'));

// Selecting the div for search history
const searchHistoryDiv = document.getElementById('search-history');


// API Configuration
const openWeatherApiKey = '67a37788d01048d1758476fd88ff14f9'; // Replace with the actual API key
const openWeatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5';



// Event listeners

// Event listener for the search button
searchButton.addEventListener('click', function() {
    const cityName = cityInput.value.trim();
    if (cityName) {
        fetchWeatherData(cityName);
        cityInput.value = ''; // Clearing the input field after search
    } else {
        alert('Please enter a city name');
    }
});

// Event listener for the Enter key in the city input
cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        searchButton.click(); 
    }
});

// Fetching Weather Data Functions
// Function to fetch weather data
async function fetchWeatherData(cityName) {
    try {
        // Fetching latitude and longitude for the city
        const coordResponse = await fetch(`${openWeatherApiBaseUrl}/weather?q=${cityName}&appid=${openWeatherApiKey}`);
        if (!coordResponse.ok) {
            throw new Error(`Error: ${coordResponse.status}`);
        }
        const coordData = await coordResponse.json();
        const { lat, lon } = coordData.coord;

        // Fetching weather forecast using the coordinates
        const forecastResponse = await fetch(`${openWeatherApiBaseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`);
        if (!forecastResponse.ok) {
            throw new Error(`Error: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();

        // Processing and displaying the fetched weather data
        displayWeatherData(forecastData);
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        // Display an error message to the user
    }
}

// Function to display the weather data (to be implemented)
function displayWeatherData(weatherData) {
    // Display current weather
    const currentWeather = weatherData.list[0];
    currentWeatherDiv.innerHTML = `
        <h3>${weatherData.city.name}</h3>
        <p><strong>Date:</strong> ${new Date(currentWeather.dt * 1000).toLocaleDateString()}</p>
        <p><strong>Temp:</strong> ${currentWeather.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${currentWeather.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${currentWeather.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="Weather icon">
    `;

    // Display 5-day forecast
    for (let i = 0; i < forecastDivs.length; i++) {
        const forecastDay = weatherData.list[i * 8]; // Approximation for daily forecast
        forecastDivs[i].innerHTML = `
            <h4>${new Date(forecastDay.dt * 1000).toLocaleDateString()}</h4>
            <p><strong>Temp:</strong> ${forecastDay.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${forecastDay.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${forecastDay.wind.speed} m/s</p>
            <img src="https://openweathermap.org/img/w/${forecastDay.weather[0].icon}.png" alt="Weather icon">
        `;
    }
}


