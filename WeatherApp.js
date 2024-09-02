let user_weather = document.querySelector('.user_weather')
let search_weather = document.querySelector('.search_weather')

let weather_container = document.querySelector('.weather_container')
let grant_access_tab = document.querySelector('.grant_access_tab')
let weather_form_container = document.querySelector('.weather_form_container')
let loading_container = document.querySelector('.loading_container')
let show_weather_info = document.querySelector('.show_weather_info') 

// initial variables
let API_KEY = "d1845658f92b31c64bd94f06f7188c9c"
let currentTab = user_weather
currentTab.classList.add("current_tab") 
getFromSessionStorage()

function switchTab(clickedTab){
    if(currentTab!=clickedTab){
        currentTab.classList.remove("current_tab")
        currentTab=clickedTab
        currentTab.classList.add("current_tab ")
    }
    if(!weather_form_container.classList.contains("active")){
        //my search weather wala is invisible, usko visible karna hai
        show_weather_info.classList.remove("active")
        grant_access_tab.classList.remove("active")
        weather_form_container.classList.add("active")
    }
    else{
        //main search weather vale tab par trha ab your weather par aakar usko visible karna hai
        weather_form_container.classList.remove("active")
        show_weather_info.classList.remove("active")
        getFromSessionStorage();
    }
}
user_weather.addEventListener('click',function(){
    switchTab(user_weather);
})
search_weather.addEventListener('click',function(){
    switchTab(search_weather)
})

function getFromSessionStorage(){
    let localCoordinates = sessionStorage.getItem("user-coordinates")
    if(!localCoordinates){
        grant_access_tab.classList.add("active")
    }
    else{
        let coordinates = JSON.parse(localCoordinates)
        fetchUserWeatherInfo(coordinates)
    }
}

async function fetchUserWeatherInfo(coordinates){
    let {lat,lon} = coordinates;
    // make grant access tab inactive
    grant_access_tab.classList.remove("active")
    //make loading active
    loading_container.classList.add("active")

    // API Call
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        let data = await response.json()
        loading_container.classList.remove("active")
        show_weather_info.classList.add("active")
        renderWeatherInfo(data)
    }
    catch(err){
        loading_container.classList.remove("active")
        console.log("Error 404 Found" , err);
    }
    
}

function renderWeatherInfo(weatherInfo){
    // fetch the elements first
    let cityname = document.querySelector(".data_city_name")
    let countryIcon = document.querySelector(".data_country_img")
    let desc = document.querySelector(".data_weather_desc")
    let weatherIcon = document.querySelector(".data_weather_img")
    let temp = document.querySelector(".temp_data")
    let humidity = document.querySelector(".humidity_value")
    let windspeed = document.querySelector(".wind_speed_value")
    let clouds= document.querySelector(".clouds_data_value")

    //fetch weather info details and put them
    cityname.innerText = weatherInfo?.name
    countryIcon.scr = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.weather?.[0].icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.windspeed
    humidity.innerText = weatherInfo?.main?.humidity
    clouds.innerText = weatherInfo?.clouds?.all
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        alert("Geo-Location is not enabled.")
    }
}

function showPosition(position){
    let userCoordinates ={
        lat : position.coords.latitude,
        lon : position.coords.longitude
    }
    sessionStorage.setItem(userCoordinates,JSON.stringify(userCoordinates));
    fetchUserWeatherInfo();
}

let grantAccessButton = document.querySelector(".acess_btn")
grantAccessButton.addEventListener('click',getLocation)

































// console.log("Hello Jee")

// async function checkWeather(){
//     try{
//         let city = "Goaaaaa"
//     let API_KEY = "168771779c71f3d64106d8a88376808a"

//     let response = await fetch(`https://api.openweathemap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
//     let data = await response.json();
//     console.log(data)

//     let para = document.createElement('p')
//     para.textContent = `${data?.main?.temp.toFixed(2)} °C`
//     document.body.appendChild(para)
//     }
//     catch(err){
//         console.log("Error Found Here" ,  err);
//     }
// }

// async function getWeather(){
//     try{
//         let API_KEY = "168771779c71f3d64106d8a88376808a"
//         let latitude = 13.78489;
//         let longitude = 0.48787;
    
//         let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
//         let dat = await result.json();
//         console.log(dat)
//     }
//     catch(err){
//         console.log("Error Found" , err);
//     }
// }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition)
//     }
//     else{
//         console.log("Navigator Not Found");
//     }
// } 
// function showPosition(position){
//     let lati = position.coords.latitude
//     let longi = position.coords.longitude

//     console.log(lati, longi);
// }

