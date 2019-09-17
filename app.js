window.addEventListener("load", () => {
    let temperature = document.querySelector(".temperature-degree");
    let weatherConditions = document.querySelector(".conditions");
    let temperatureDegree = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".degree-symbol");

    let city = "Hamilton";

    window.addEventListener('keypress', function(e){
        if(e.keyCode === 13){
            const newLocation = document.querySelector(".input");
            city = newLocation.value;
            apiCall();
        }
    });

    function apiCall(){
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city},nz&appid=1d9047627cac5771042f25a9756f9511`;

        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);

            const {temp, temp_min, temp_max} = data.main;
            const {description, icon} = data.weather[0];

            temperature.textContent = Math.round((temp - 273.15) * 10) / 10;        
            weatherConditions.textContent = description;
            document.querySelector(".city").textContent = data.name;

            temperatureDegree.addEventListener("click", () => {
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";                
                }
                else{
                    temperatureSpan.textContent = "F";
                }
            });

            // Set Icon
            setIcons(icon, document.querySelector(".icon"));
        });
    }

    // Function for seting the weather icon
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        let currentIcon = "WIND";
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
        
    // jQuery code for search button
    $(".btn").click(function(){
        $(".input").toggleClass("active").focus;
        $(this).toggleClass("animate");
        $(".input").val("");
    });

    apiCall();
});