import './style.css';
import {getResult, getData} from './data'
import {convertC, convertF} from "./convert"

const form = document.querySelector("form.search")
const searchBtn = document.querySelector("form.search > button")
const input = document.querySelector("form.search > input")

form.addEventListener("submit", e=>{
  e.preventDefault();
})
searchBtn.addEventListener("click", async ()=>{
  const searchTerm = input.value;
  const response = await getResult(searchTerm);
  handleResponse(response);
})

const homeBtn = document.querySelector("button.home")
homeBtn.addEventListener("click", toHome);
function toHome(){
  resetInput();
  const resultModal = document.querySelector(".result");
  const homeModal = document.querySelector(".home");
  resultModal.classList.toggle("active");
  homeModal.classList.toggle("active");
}

let currentFormat = "C";
const convertBtn = document.querySelector("button.convert")
convertBtn.addEventListener("click", toggleFormat)

function toggleFormat(){
  if(currentFormat === "C"){
    currentFormat = "F";
  } else {
    currentFormat = "C";
  }
  convertBtn.textContent = currentFormat;
  renderWeather();
}

function handleResponse(res){
  if(res === -1){
    const error = document.querySelector(".error");
    error.textContent = "No result";
    setTimeout(() => {
      error.textContent = "";

    }, 2000);
    resetInput();
    return;
  } 
  else{
    const resultModal = document.querySelector(".result");
    const homeModal = document.querySelector(".home");
    resultModal.classList.toggle("active");
    homeModal.classList.toggle("active");
    renderWeather();
  }
}

function renderWeather(){
  const data = getData();
  let dataT = Object.assign({}, data);
  if(currentFormat === "C"){
    dataT = convertC(dataT);
  } else {
    dataT = convertF(dataT);
  }

 
  const temp = document.querySelector(".temp > h1")
  const name = document.querySelector(".temp > h2")
  const weather = document.querySelector(".weather > h1")
  const weatherDesc = document.querySelector(".weather > h2")
  const weatherIcon = document.querySelector(".weather > .icon");
  const humidity = document.querySelector(".humidity > .data")
  const feels = document.querySelector(".feels > .data")
  const wind = document.querySelector(".wind > .data")

  name.textContent = dataT.name + ", " + dataT.country;
  temp.textContent = dataT.temp + "°" + currentFormat;
  weather.textContent = dataT.weather;
  weatherDesc.textContent = dataT.weather_desc;
  // weatherIcon.textContent = getIcon();
  humidity.textContent = dataT.humidity + "%";
  feels.textContent = dataT.feels + "°" + currentFormat;
  wind.textContent = `${dataT.wind_deg}° | ${dataT.wind_speed} `
}

function resetInput(){
  input.value = "";
}

