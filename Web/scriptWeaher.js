//alert("asd");

async function loadWeather(weatherEl){
    let prom = await fetch(`https://vm.nathoro.ru/weather?lattitude=${54.3}&longitude=${48.4}`);
    let json = await prom.json();
    json.forEach(day => {
        let card = document.createElement("card");
        let date = new Date(day.date);
        card.innerHTML =  `<div>Дата: ${date.toLocaleString()} </div>
                           <div>Температура: ${Math.round(day.temperature)}°C </div>
                           <div>Ветер: ${day.windDirection}, ${Math.round(day.windSpeed)}м/с </div>
                           <div>Влажность: ${Math.round(day.humidity)}% </div>`;


        weatherEl.appendChild(card);
    });
}

const weatherDiv = document.getElementById("cardsContainer");
loadWeather(weatherDiv);
