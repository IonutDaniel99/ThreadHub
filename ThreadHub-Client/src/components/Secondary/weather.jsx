import { HubConnectionBuilder } from "@microsoft/signalr";
import { createSignal, onCleanup, onMount } from "solid-js";
import { getLocation } from "~/common/browserHelpers";

export default async function Weather() {
    const [isGeoLocationActive, setIsGeolocationActive] = createSignal(false)
    const [weatherData, setWeatherData] = createSignal({})



    const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5000/WeatherServiceGateway")
        .withAutomaticReconnect()
        .build();

    onMount(async () => {
        await getLocation()
            .then((data) => {
                connection.start().then(
                    () => connection.invoke("RequestWeatherForecast", {
                        "latitude": data.coords.latitude,
                        "longitude": data.coords.longitude
                    })
                );
            })
            .catch((error) => {
                setIsGeolocationActive(false)
            })

    })

    onCleanup(() => connection.stop());

    connection.on("RequestedWeatherForecast", (weatherData) => {
        setWeatherData(weatherData)
        console.log(weatherData);
    });

    return (
        <div class="w-full h-28 px-4 bg-blue-400 flex flex-col items-center gap-2 rounded-xl">
            <div class="h-2 pt-2 w-full flex justify-between">
                <div>
                    12:13
                </div>
                <div>
                    Romania, REF
                </div>
            </div>
            <div class="flex w-full h-24 items-center justify-between leading-none">
                <div class="flex flex-col w-2/6 items-center">
                    <span class="font-bold text-4xl  text-white">24C</span>
                    <span class="font-bold text-base text-white">Cloudy</span>
                </div>
                <div class="flex justify-around text-white w-4/6">
                    <div class="flex flex-col items-center">
                        <p class="font-semibold text-sm">12:00</p>
                        <p>☀️</p>
                        <p class="font-semibold text-sm">28C</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="font-semibold text-sm">12:00</p>
                        <p>☀️</p>
                        <p class="font-semibold text-sm">28C</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="font-semibold text-sm">12:00</p>
                        <p>☀️</p>
                        <p class="font-semibold text-sm">28C</p>
                    </div>
                </div>
            </div>
        </div>
    );
}



/*
  <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
                {temperature()}
            </h1>
            <p class="my-4">
                <button
                    class="w-[200px] rounded-full bg-gray-100 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]"
                    onClick={() => sendMessage("CocoJumbo222")}
                >
                    Clicks
                </button>
            </p>
        </main>
*/