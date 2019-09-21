window.addEventListener("load", () => {
    // Get the elements that will be edited
    let temperature = document.querySelector(".temperature-degree");
    let weatherConditions = document.querySelector(".conditions");
    let temperatureDegree = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".degree-symbol");

    // Set the default city to Hamilton
    let city = "Hamilton";

    /**
     * Makes calls to the Open Weather API in order to obtain current weather
     * data from any city in New Zealand. 
     */
    function apiCall(){
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city},nz&appid=1d9047627cac5771042f25a9756f9511`;

        // Send request to API
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // Log the response data for testing
            console.log(data);

            // Get the weather information
            const {temp, pressure, humidity} = data.main;
            const {description, icon} = data.weather[0];
            const {speed} = data.wind;

            // Set the weather information
            temperature.textContent = Math.round((temp - 273.15) * 10) / 10;        
            weatherConditions.textContent = description.toUpperCase();
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".pressure-text").textContent = pressure + "hpa";
            document.querySelector(".humidity-text").textContent = humidity + "%";
            document.querySelector(".wind-speed-text").textContent = speed + "m/s";

            // Set weather icon
            setIcons(icon, document.querySelector(".weather-icon"));
        });
    }

    /**
     * Sets the weather icon to the relevant icon based on the current weather data.
     * @param {current weather from API call} icon 
     * @param {icon location on HTML page} iconID 
     */
    function setIcons(icon, iconID){
        // Set the skycons colour to white
        const skycons = new Skycons({color: "white"});
        // Set the default icon to the wind icon
        let currentIcon = "WIND";

        // Map the icons from the Open Weather API to icons from the skycons file
        if(icon == "01d"){
            currentIcon = "CLEAR_DAY";
        }
        else if(icon == "01n"){
            currentIcon = "CLEAR_NIGHT";
        }
        else if(icon == "02d"){
            currentIcon = "PARTLY_CLOUDY_NIGHT";
        }
        else if(icon == "02n"){
            currentIcon = "PARTLY_CLOUDY_NIGHT";
        }
        else if(icon == "03d" || icon == "03n" || icon == "04d" || icon == "04n"){
            currentIcon = "CLOUDY";
        }
        else if(icon == "09d" || icon == "09n" || icon == "10d" || icon == "10n" || icon == "11d" || icon == "11n"){
            currentIcon = "RAIN";
        }
        else if(icon == "13d" || icon == "13n"){
            currentIcon = "SNOW";
        }
        else{
            currentIcon = "FOG";
        }
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    /**
     * When the temperature location is clicked the temperature converts from celsius
     * to fahrenheit and vice versa.
     */
    temperatureDegree.addEventListener("click", () => {
        // If the temperature is in fahrenheit convert it to celsius
        // or vice versa
        if(temperatureSpan.innerHTML === "°F"){
            temperatureSpan.innerHTML = "°C";
            let tempF = document.querySelector(".temperature-degree").innerHTML;
            let tempC = (tempF - 32) * (5/9);
            document.querySelector(".temperature-degree").textContent = tempC.toFixed(1);
        } 
        else if(temperatureSpan.innerHTML === "°C"){
            temperatureSpan.innerHTML = "°F";
            let tempC = document.querySelector(".temperature-degree").innerHTML;
            let tempF = (tempC * (9/5)) + 32;
            document.querySelector(".temperature-degree").textContent = tempF.toFixed(1); 
        }
    });

    window.addEventListener('keypress', function(e){
        if(e.keyCode === 13){
            const newLocation = document.querySelector(".input");
            city = newLocation.value;
            apiCall();
        }
    });

    apiCall();
});