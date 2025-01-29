const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");

function updateClock() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDegree = (hours % 12) * 30 + (minutes / 60) * 30;
  const minuteDegree = minutes * 6 + (seconds / 60) * 6;
  const secondDegree = seconds * 6;

  hourHand.style.transform = `rotate(${hourDegree}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
  secondHand.style.transform = `rotate(${secondDegree}deg)`;
}

setInterval(updateClock, 1000);

updateClock();


const apiKey = "57b52f0c6dd995e6d34f0663ebb87f81";
const latitude = 22.579;
const longitude = 88.437;
const cityName = "SECTOR V";

const getWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const feelsLike = Math.round(data.main.feels_like);
    const condition = data.weather[0].description;
    const location = data.name || cityName;

    document.getElementById("conditionText").innerText = condition;
    document.getElementById("temp").innerText = `${temperature}°C`;
    document.getElementById("humidityLevel").innerText = `Humidity: ${humidity}%`;
    document.getElementById("feelsLike").innerText = `Feels Like: ${feelsLike}°C`;
    document.getElementById("location").innerText = location;
  } catch (error) {
    console.error("Error fetching weather data:", error);

    document.getElementById("conditionText").innerText = "Error fetching weather data!";
    document.getElementById("temp").innerText = "N/A";
    document.getElementById("humidityLevel").innerText = "N/A";
    document.getElementById("feelsLike").innerText = "N/A";
    document.getElementById("location").innerText = "N/A";
  }
};

getWeather();
setInterval(getWeather, 7200000);

