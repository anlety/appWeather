const searchBox = document.getElementById('searchBox')
const searchBtn = document.getElementById('searchBtn')


searchBtn.addEventListener('click', (event) => {
  getWeather(searchBox.value)
  localStorage.setItem("Search", searchBox.value)
});
window.addEventListener('load', (event) => {
  let lastSearch = localStorage.getItem("Search")
  getWeather(lastSearch)
});

async function getWeather(location) {
  let result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=292f87fe8f485ef23606e9a45dfeb567`);
  result = await result.json()
  console.log(result)
  if (result.cod == "404") {
    error(result)
  } else {
    populatePage(result)
  }
}

function populatePage(result) {
  document.getElementById('name').innerHTML = result.name
  document.getElementById('temp').innerHTML = result.main.temp + "°C"
  document.getElementById('weather').innerHTML = result.weather[0].main
  document.getElementById('description').innerHTML = result.weather[0].description
  document.getElementById('icon').src = 'http://openweathermap.org/img/wn/' + result.weather[0].icon + '@2x.png'
  //http://openweathermap.org/img/wn/01n@2x.png

}
function error(result) {
  document.getElementById('name').innerHTML = result.message
  document.getElementById('temp').innerHTML = ''
  document.getElementById('weather').innerHTML = ''
  document.getElementById('description').innerHTML = ''
  document.getElementById('icon').src = ''
  //http://openweathermap.org/img/wn/01n@2x.png

}


