import Spotify from "~/components/Secondary/Spotify/spotify";
import Weather from "../components/Secondary/Weather/weather";

export default function Dashboard() {
    return (
        <>
            <div class="flex h-[calc(100%-4rem)] ">
                <div class="w-10/12 border-r-2 border-black border-opacity-10 p-1 ">Main Section</div>
                <div class="w-2/12 mt-3 flex flex-col">
                    <div class="h-3/5 mx-2.5">
                        <Weather />
                        <Spotify />
                    </div>
                    <div class="h-1/5 border-t-2">
                        Consola
                    </div>
                </div>
            </div>
        </>
    );
}