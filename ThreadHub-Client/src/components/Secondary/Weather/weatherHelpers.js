export const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(0);

export const getHourAndMinute = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
};
export const getSeconds = (date) => {
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${seconds}`;
};

export const getImageBasedOnWeather = (weatherType) => {
    const weatherObject = {
        Thunderstorm: "da",
        Drizzle: "da",
        Snow: "da",
        Mist: "da",
        Smoke: "da",
        Smoke: "da",
        Dust: "da",
        Fog: "da",
        Sand: "da",
        Ash: "da",
        Squall: "da",
        Tornado: "da",
        //DONE
        Clouds: "Clouds.jpg",
        Rain: "Rain.png",
        Clear: "Sunny.png",
    };
    const weatherImage = weatherObject[weatherType];
    const path = `/images/Weather/${weatherImage}`;
    return path;
};
