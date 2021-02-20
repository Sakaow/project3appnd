const urlMain = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=d2beea9d62f89cc0c42188370656defd';
const unit = '&units=metric';
let city = 'Washington,US';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(evt) {
  const newWeather = document.getElementById('city').value;
  getWeather(urlMain, city, apiKey, unit);
}

// GET request using async/await
const getWeather = async (urlMain, city, key, unit) => {
  const request = await fetch(urlMain + city + key + unit);
  try {
    const data = await request.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// POST request
const postData = async (url = '', projectData) => {
  console.log(projectData);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(projectData),
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log('Error', error);
  }
};

// call function this will post information to our app's data
postData('/addWeather', { weather: 'Cool', feeling: 5 });
