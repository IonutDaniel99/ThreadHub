import { HubConnectionBuilder } from "@microsoft/signalr";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { getLocation } from "~/common/browserPermissions";
import SunnySvg from "../../../../public/icons/Sunny";
import LocationIcon from "../../../../public/icons/LocationIcon";
import {
    formatTime,
    getHourAndMinute,
    getImageBasedOnWeather,
    getSeconds,
    kelvinToCelsius,
} from "./weatherHelpers";

export default function Weather() {
    const [isGeolocation, setIsGeolocation] = createSignal("");
    const [isLoading, setIsLoading] = createSignal(true);
    const [weatherData, setWeatherData] = createSignal({});
    const [time, setTime] = createSignal(new Date());

    const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/WeatherServiceGateway")
        .withAutomaticReconnect()
        .build();

    onMount(async () => {
        await getLocation()
            .then((data) => {
                connection.start().then(() => {
                    connection.invoke("AskWeatherForecast", {
                        latitude: data.coords.latitude,
                        longitude: data.coords.longitude,
                    });
                });
            })
            .catch((error) => {
                console.log(error.message);
                setIsGeolocation(error.message);
            });
    });

    createEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    });

    onCleanup(() => connection.stop());
    // INVOCATIONS
    const askForRefresh = () => {
        connection.invoke("AskWeatherRefresh");
    };
    //Listeeners
    connection.on("getWeatherForecast", (weatherData) => {
        setWeatherData(JSON.parse(weatherData));
        setIsLoading(false);
    });

    connection.on("getWeatherRefresh", (data) => console.log(data));

    return (
        <Show
            when={!isLoading()}
            fallback={<div class="h-32">{isGeolocation() || "Loading"}</div>}
        >
            <div class="w-full h-32 flex flex-col items-center gap-2 rounded-2xl relative text-white bg-gradient-to-r from-[#00000080]">
                <img
                    src={getImageBasedOnWeather(weatherData().weather[0].main)}
                    alt=""
                    class="absolute h-full w-full object-cover overflow-hidden -z-10 rounded-2xl"
                />
                <div class="z-10 px-3 py-4 flex justify-between w-full">
                    <div class="min-w-[5rem] flex flex-col items-center justify-between h-full">
                        <div
                            class="bg-black bg-opacity-50 px-2 rounded-lg font-normal flex  items-center cursor-pointer group"
                            onClick={() => askForRefresh()}
                        >
                            <div class="absolute invisible group-hover:visible z-10 flex pl-1 ">
                                Refresh
                            </div>
                            <div class="gap-1 visible group-hover:invisible flex items-center">
                                <LocationIcon />
                                {weatherData().name}
                            </div>
                        </div>
                        <div class="flex justify-center flex-col">
                            <div class="w-full flex items-center justify-center">
                                <img
                                    src={`http://openweathermap.org/img/w/${
                                        weatherData().weather[0].icon
                                    }.png`}
                                />
                            </div>
                            <div class="text-sm flex w-full items-center justify-center capitalize">
                                {weatherData().weather[0].description}
                            </div>
                        </div>
                    </div>
                    <div class="min-w-[5rem] flex flex-col items-center justify-between h-full">
                        <div class="bg-black bg-opacity-50 px-3 rounded-lg min-w-[5rem] max-w-[5rem]">
                            {getHourAndMinute(time())}:
                            <span class="text-xs">{getSeconds(time())}</span>
                        </div>
                        <div class="ml-2">
                            <div class="flex">
                                <p class="text-5xl leading-none">
                                    {kelvinToCelsius(weatherData().main.temp)}
                                </p>
                                <span class="text-2xl leading-7">°</span>
                            </div>
                            <div class="text-sm">
                                {kelvinToCelsius(weatherData().main.temp_min)}°
                                / {kelvinToCelsius(weatherData().main.temp_max)}
                                °
                            </div>
                        </div>
                    </div>
                    <div class="min-w-[5rem] flex flex-col items-center justify-between h-full">
                        <div class="bg-black bg-opacity-50 px-3 rounded-lg w-full">
                            Clear
                        </div>
                    </div>
                </div>
            </div>
        </Show>
    );
}
