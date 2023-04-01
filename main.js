 function getWeather() {
        const city = document.getElementById("city").value;
        const geoApiKey = "0978fd8bed10f76184580d729450d8a8";
        const weatherApiKey = "0978fd8bed10f76184580d729450d8a8";
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${geoApiKey}`;
        
        fetch(geoUrl)
          .then((response) => response.json())
          .then((data) => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;
            
            return fetch(weatherUrl);
          })
          .then((response) => response.json())
          .then((data) => {
            const weather = document.getElementById("weather");
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const html = `
              <p><strong>${city}</strong></p>
              <p><img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}" /></p>
              <p>${temp} &#8451;, ${description}</p>
            `;
            weather.innerHTML = html;
          })
          .catch((error) => {
            console.error(error);
            const weather = document.getElementById("weather");
            weather.innerHTML = "Помилка! Не вдалося отримати погоду.";
          });
      }