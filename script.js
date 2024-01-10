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
const openWeatherApiKey = 'MY_API_KEY'; // Replace with the actual API key
const openWeatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5';
