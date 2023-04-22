import { Show, createSignal } from "solid-js";
import Spotify from "./Spotify/spotify";
import Weather from "./Weather/weather";

import {
    RiDeviceBluetoothFill,
    RiLogosSpotifyFill,
    RiWeatherSunFill,
} from "solid-icons/ri";
import {
    getValueFromLocalStorage,
    setValueInLocalStorage,
} from "~/common/browserHelpers";

export default function Secondary() {
    const [isWeatherOpen, setIsWeatherOpen] = createSignal(
        JSON.parse(getValueFromLocalStorage("WeatherOpen", false))
    );
    const [isSpotifyOpen, setIsSpotifyOpen] = createSignal(
        JSON.parse(getValueFromLocalStorage("SpotifyOpen", false))
    );
    console.log(isSpotifyOpen());
    const [isBluetoothOpen, setIsBluetoothOpen] = createSignal(
        JSON.parse(getValueFromLocalStorage("BluetoothOpen", false))
    );

    return (
        <div class="w-2/12 flex flex-col">
            <div class="h-12 flex items-center mx-2.5 my-1">
                <div
                    class={`h-10 w-10 flex items-center justify-center rounded-xl ${
                        isWeatherOpen() ? "bg-amber-300" : ""
                    }`}
                    onClick={() => {
                        setValueInLocalStorage("WeatherOpen", !isWeatherOpen());
                        setIsWeatherOpen(!isWeatherOpen());
                    }}
                >
                    <RiWeatherSunFill
                        class="h-7 w-7"
                        color={isWeatherOpen() ? "white" : "lightgray"}
                    />
                </div>
                <span class="h-2/5 w-1 border-slate-700 border-opacity-10 border-x-2 rounded-full mx-2" />
                <div
                    class={`h-10 w-10 flex items-center justify-center rounded-xl ${
                        isSpotifyOpen() ? "bg-green-300" : ""
                    }`}
                    onClick={() => {
                        setValueInLocalStorage("SpotifyOpen", !isSpotifyOpen());
                        setIsSpotifyOpen(!isSpotifyOpen());
                    }}
                >
                    <RiLogosSpotifyFill
                        class="h-8 w-8"
                        color={isSpotifyOpen() ? "darkslategray" : "lightgray"}
                    />
                </div>
                <span class="h-2/5 w-1 border-slate-700 border-opacity-10 border-x-2 rounded-full mx-2" />
                <div
                    class={`h-10 w-10 flex items-center justify-center rounded-xl ${
                        isBluetoothOpen() ? "bg-sky-400" : ""
                    }`}
                    onClick={() => {
                        setValueInLocalStorage(
                            "BluetoothOpen",
                            !isBluetoothOpen()
                        );
                        setIsBluetoothOpen(!isBluetoothOpen());
                    }}
                >
                    <RiDeviceBluetoothFill
                        class="h-7 w-7"
                        color={isBluetoothOpen() ? "white" : "lightgray"}
                    />
                </div>
            </div>
            <div class="h-3/5 mx-2.5 overflow-y-auto gap-2 flex flex-col">
                <Show when={isWeatherOpen()} children={<Weather />} />
                <Show when={isSpotifyOpen()} children={<Spotify />} />
            </div>
            <div class="h-1/5 border-t-2">Consola</div>
        </div>
    );
}
