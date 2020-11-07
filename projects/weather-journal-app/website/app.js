/* Global Variables */
const GENERATE_BTN = document.getElementById('generate');
const ZIP_CODE_INPUT = document.getElementById('zip');
const FEELINGS_ELEM = document.getElementById('feelings');

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// if country is not specified then the search works for USA as a default
// baseUrl & apikey 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const UNITS_FORMAT = '&units=metric';
const API_KEY = '&appid=5842531da18d5146a394c4f23f0aaa13';



// Get weather from external API
const getWeather = async (baseURL, zipCode, unitsFormat, key) => {

    const RES = await fetch(baseURL + zipCode + unitsFormat + key);
    try {
        const DATA = await RES.json();
        console.log('External api get response: ', DATA);

        //Handle response error codes
        if (DATA.cod != "200")
            alert(`An error occured with the message: ${DATA.message}`);
        else
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
        console.log('internal api post response: ',RES);
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
        document.getElementById('date').textContent = `Date: ${DATA.date}`;
        document.getElementById('temp').innerHTML = DATA.temp ? `Temperature: ${DATA.temp} <sup>o</sup>C` : '';
        document.getElementById('content').textContent = DATA.content ? `Feelings: ${DATA.content}` : '';
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// Add event listener to Generate Btn Click event
GENERATE_BTN.addEventListener('click', performGetPostRequests)

// Generate Btn event listener
function performGetPostRequests() {
    // Handle empty zip code
    if (ZIP_CODE_INPUT.value.trim() == "")
        alert("Please enter a valid zip code!");
    else {
        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

        getWeather(BASE_URL, ZIP_CODE_INPUT.value.trim(), UNITS_FORMAT, API_KEY)
            .then((temperature) => {
                postData('/addWeatherData', {
                    temp: temperature,
                    date: newDate,
                    content: FEELINGS_ELEM.value
                })
            })
            .then(() => {
                updateUi('/getWeatherData');
            })
            .catch((error) => console.log(`Error processing the requests: ${error}`));
    }
    
        
}