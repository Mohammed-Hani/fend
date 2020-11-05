/* Global Variables */

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// if country is not specified then the search works for USA as a default
// baseUrl & apikey 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const UNITS_FORMAT = '&units=metric';
const API_KEY = '&appid=5842531da18d5146a394c4f23f0aaa13';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Get weather from external API
const getWeather = async (baseURL, zipCode, unitsFormat, key) => {

    const RES = await fetch(baseURL + zipCode + unitsFormat + key);
    try {
        const DATA = await RES.json();
        return DATA.main.temp;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// Post weather, date, content to internal API endpoint
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const RES = await response.json();
        
    }
    catch (error) {
        console.log('error: ', error);
    }

}

// Update UI using data from internal API endpoint
const updateUi = async (url = '') => {
    const res = await fetch(url);
    try {
        const DATA = await res.json();
        document.getElementById('date').textContent = DATA.date;
        document.getElementById('temp').textContent = DATA.temp;
        document.getElementById('content').textContent = DATA.content;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}