import { HubConnectionBuilder } from "@microsoft/signalr";
import {
    Match,
    Show,
    Switch,
    createEffect,
    createSignal,
    onCleanup,
    onMount,
} from "solid-js";
import { getLocation } from "~/common/browserPermissions";
import {
    getHourAndMinute,
    getImageBasedOnWeather,
    getSeconds,
    kelvinToCelsius,
} from "./weatherHelpers";

import { FaSolidLocationDot } from "solid-icons/fa";
import {
    ASK_WEATHER_CONNECTION,
    ASK_WEATHER_REFRESH,
    GET_WEATHER_CONNECTION,
    GET_WEATHER_REFRESH,
    WEATHER_SERVICE_NAME,
    WEATHER_SERVICE_PATH,
} from "./constants";
import { createServerServicePath } from "~/constants";
import ServiceLoading from "~/components/Others/ServiceLoading";

export default function Weather() {
    const [time, setTime] = createSignal(new Date());
    const [weatherData, setWeatherData] = createSignal({});

    const [isGeolocationDisable, setIsGeolocationDisable] = createSignal(false);
    const [isServerDown, setIsServerDown] = createSignal(false);

    const [isLoading, setIsLoading] = createSignal(true);

    const connection = new HubConnectionBuilder()
        .withUrl(createServerServicePath(WEATHER_SERVICE_PATH))
        .withAutomaticReconnect()
        .build();

    onMount(async () => {
        await getLocation()
            .then((data) => {
                connection
                    .start()
                    .then(() => {
                        clearTimeout(connectionTimeout);
                        connection.invoke(ASK_WEATHER_CONNECTION, {
                            latitude: data.coords.latitude,
                            longitude: data.coords.longitude,
                        });
                    })
                    .catch((error) => {
                        setIsServerDown(true);
                    });
            })
            .catch((error) => {
                setIsGeolocationDisable(true);
            });
    });

    //User denied Geolocation
    createEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    });

    // INVOCATIONS
    const askForRefresh = () => {
        connection.invoke(ASK_WEATHER_REFRESH);
    };

    //Listeeners
    connection.on(GET_WEATHER_CONNECTION, (weatherData) => {
        setWeatherData(JSON.parse(weatherData));
        setIsLoading(false);
    });

    connection.on(GET_WEATHER_REFRESH, (data) => console.log(data));

    onCleanup(() => connection.stop());

    return (
        <>
            <Switch
                fallback={
                    <ServiceLoading
                        serviceError={`${WEATHER_SERVICE_NAME} is loading...`}
                    />
                }
            >
                <Match when={isServerDown()}>
                    <ServiceLoading
                        serviceError={`${WEATHER_SERVICE_NAME} server is down!`}
                    />
                </Match>
                <Match when={isGeolocationDisable()}>
                    <ServiceLoading
                        serviceError={"User denied Geolocation access!"}
                    />
                </Match>
                <Match when={!isLoading()}>
                    <div class="w-full h-32 flex flex-col items-center gap-2 rounded-2xl relative text-white bg-gradient-to-r from-[#00000080]">
                        <img
                            src={getImageBasedOnWeather(
                                weatherData().weather[0].main
                            )}
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
                                        <FaSolidLocationDot />
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
                                    <span class="text-xs">
                                        {getSeconds(time())}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <div class="flex">
                                        <p class="text-5xl leading-none">
                                            {kelvinToCelsius(
                                                weatherData().main.temp
                                            )}
                                        </p>
                                        <span class="text-2xl leading-7">
                                            °
                                        </span>
                                    </div>
                                    <div class="text-sm">
                                        {kelvinToCelsius(
                                            weatherData().main.temp_min
                                        )}
                                        ° /{" "}
                                        {kelvinToCelsius(
                                            weatherData().main.temp_max
                                        )}
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
                </Match>
            </Switch>
        </>
    );
}
