const cityName = document.querySelector('.city-name')
const inputCity = document.querySelector('input')
const sendBtn = document.querySelector('.send')
const img = document.querySelector('img')
const weatherInfo = document.querySelector('.info-weather')
const tempInfo = document.querySelector('.info-temp')
const humInfo = document.querySelector('.info-humidity')
const warning = document.querySelector('.warning')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'YOUR_API_KEY'
const API_UNITS = '&units=metric'

const getWeather = () => {
    const city = inputCity.value || 'Puerto de la Cruz'
    const URL = API_LINK + city + API_KEY + API_UNITS

    axios.get(URL).then(res => {
            const idIcon = res.data.weather[0].id;

            cityName.textContent = res.data.name;
            weatherInfo.textContent = res.data.weather[0].main;
            tempInfo.textContent = Math.round(res.data.main.temp) + '°C';
            humInfo.textContent = res.data.main.humidity + '%';

            warning.textContent = '';
            inputCity.value = '';

            if (idIcon >= 200 && idIcon <= 232) {
                img.setAttribute('src', './img/thunderstorm.png')
            } else if (idIcon >= 300 && idIcon <= 321) {
                img.setAttribute('src', './img/drizzle.png')
            } else if (idIcon >= 500 && idIcon <= 531) {
                img.setAttribute('src', './img/rain.png')
            } else if (idIcon >= 600 && idIcon <= 622) {
                img.setAttribute('src', './img/ice.png')
            } else if (idIcon == 741 || idIcon == 701) {
                img.setAttribute('src', './img/fog.png')
            } else if (idIcon == 800) {
                img.setAttribute('src', '/img/sun.png')
            } else if (idIcon >= 801 && idIcon <= 804) {
                img.setAttribute('src', './img/cloud.png')
            }
        })
        .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta!')

}

const enterCheck = (e) => {
    if (e.key === 'Enter') {
        console.log('enter')
        getWeather()
    }
}

sendBtn.addEventListener('click', getWeather)
inputCity.addEventListener('keyup', enterCheck)