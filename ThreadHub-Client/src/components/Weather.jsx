import { A } from "solid-start";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { createSignal } from "solid-js";

export default function Weather() {
    const [temperature, setTemperature] = createSignal("None")

    const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5000/WeatherServiceGateway")
        .withAutomaticReconnect()
        .build();

    connection.on("ReceiveMessage", (message) => {
        setTemperature(message);
    });
    connection.start();

    function sendMessage(user) {
        connection.invoke("SendData", user);
    }

    return (
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
    );
}



