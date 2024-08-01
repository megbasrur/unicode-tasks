const apikey="286fefb3f279e936e22eb234b92e1e2e";
const url="https://api.openweathermap.org/data/2.5/weather?units=metric";

const search=document.querySelector("input");
const btn=document.querySelector("#submit");
const icon=document.querySelector(".icon");
const change=document.querySelector(".unit");

async function getWeather(city){
    const response= await fetch(url+`&q=${city}&appid=${apikey}`);
    if(response.status==404){
        document.querySelector("#error").style.display="block";
        document.querySelector("#weather").style.display="none";
    }
    else{
    const data=await response.json();
    console.log(data);
    document.querySelector("#temp").innerText=Math.round(data.main.temp)+"°C";
    document.querySelector(".city").innerText=data.name;
    document.querySelector("#humidity").innerText="Humidity: "+data.main.humidity+"%";
    document.querySelector("#wind").innerText="Wind: "+data.wind.speed+"km/h";
    if(data.weather[0].main=="Clouds"){
         icon.src="clouds.png";
    } 
    else if(data.weather[0]=="Clear"){
        icon.src="sun.png";
    }
    else if(data.weather[0]="Haze"){
        icon.src="drizzle.png";
    }
    else if(data.weather[0]="Rain"){
        icon.src="rain.png";
    }
    
    document.querySelector("#weather").style.visibility="visible";
    document.querySelector("#extra").style.visibility="visible";
    document.querySelector("#error").style.display="none";
    change.setAttribute("data-unit","C");
    change.innerText="Change to °F";
}
}
  
btn.addEventListener("click",()=>{
    getWeather(search.value);
});

change.addEventListener("click",()=>{
    const currentUnit=change.getAttribute("data-unit");
    const currentTemp=parseFloat(document.querySelector("#temp").innerText);
    if(currentUnit==="C"){
        const newTemp=(currentTemp*9/5)+32;
        document.querySelector("#temp").innerText=Math.round(newTemp)+"°F";
        change.setAttribute("data-unit","F");
        change.classList.add(".unit");
        change.innerText="Change to °C";
    }
    else if(currentUnit==="F"){
        const newTemp=(currentTemp-32)*5/9;
        document.querySelector("#temp").innerText=Math.round(newTemp)+"°C";
        change.setAttribute("data-unit","C");
        change.classList.add(".unit");
        change.innerText="Change to °F";
    }
});