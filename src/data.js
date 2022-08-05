const openKey = '314516512d45a893c3ddd41870bb907e';
let data;
async function getGeo(place){
  const geoCall = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${openKey}`
  const response = await fetch(geoCall);
  const data = await response.json();
  if(data.length===0){
    //no result
    return -1;
  } else {
    return {
      "name": data[0].name,
      "country": data[0].country,
      "lat": data[0].lat,
      "lon": data[0].lon,
    }
  }
}

async function getCurrent(place){
  const weatherCall = `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${openKey}`
  const response = await fetch(weatherCall);
  const data = await response.json();

  return {
    "place": place,
    "data": data,
  }
}

async function getResult(search){
  const place = await getGeo(search);
  if(place === -1){
    return -1;
  }
  const result = await getCurrent(place);

  data = {
    "name": result.place.name,
    "country": result.place.country,
    "temp": result.data.main.temp,
    "feels": result.data.main.feels_like,
    "weather": result.data.weather[0].main,
    "weather_desc": result.data.weather[0].description,
    "humidity": result.data.main.humidity,
    "wind_deg": result.data.wind.deg,
    "wind_speed": result.data.wind.speed,
  }
} 

function getData(){
  return data;
}

export { getResult, getData}

