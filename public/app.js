// API from OpenWeather app
const urlMain = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=d2beea9d62f89cc0c42188370656defd';
const unit = '&units=metric';

const zipcode = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
// const icon = document.querySelector('#icon');
const temp = document.querySelector('#temp');
const enterKey = document.querySelector('.zipcode');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

// Manage eventListener to html home page
let generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', performAction);
enterKey.addEventListener('keyup', enterPressed);

function enterPressed(event) {
    if (event.key === 'Enter') {
        performAction();
    }
}

function performAction(e) {
    let zip = zipcode.value;
    let feel = feelings.value;
    let url = urlMain + zip + apiKey + unit;
    if (zip === '' || zip.length < 5 || zip.length > 5) {
        alert("Please enter 5 digit zip code");
    }
    else {
        getWeather(url)
            .then(function (data) {
                console.log(data);
                const icon = data.weather[0].icon;
                const date = newDate;
                const temp = data.main.temp.toFixed();
                postData('/addData', { date: date, temperater:temp, icon, feeling:feel });

            })
            .then(
                updateUI()
            )           
    }
}

// Fetch function to get data and converts JS object into a string 
const getWeather = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error', error);
    }
}

// POST request takes two arguments url(post to), and object holds data
const postData = async (url, data) => {
    console.log(data);   
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
   
};

// Update the webpage UI function
const updateUI = async () => {
    const request = await fetch('/getData');
    try {
        const allDataUpdate = await request.json();
        document.querySelector('#date').innerHTML = `Date: ${allDataUpdate.date}`;
        document.querySelector('#temp').innerHTML = `Temperature: ${allDataUpdate.temp}°C`;
        document.querySelector('#icon').innerHTML = `<img class="icon" src="http://openweathermap.org/img/wn/${allDataUpdate.icon}.png" alt="icon">`;
        document.querySelector('#content').innerHTML = `Feelings: ${allDataUpdate.feel}`;       

        // reset ,
        zip.value = '';
        feeling.value ='';
    } catch (error) {
        console.log("error", error);
    }
}


