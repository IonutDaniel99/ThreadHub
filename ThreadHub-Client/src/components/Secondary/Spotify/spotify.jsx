import { createSignal } from "solid-js";

import { FaSolidShuffle } from "solid-icons/fa";
import { ImBackward, ImForward2 } from "solid-icons/im";
import { FaSolidCirclePlay } from "solid-icons/fa";
import { BsPauseCircleFill } from "solid-icons/bs";
import { FiVolume2, FiVolumeX } from "solid-icons/fi";

export default function Spotify() {
    const [isShuffleActive, setIsShuffleActive] = createSignal(false);
    const [isPlayActive, setIsPlayActive] = createSignal(true);
    const [isVolumeActive, setIsVolumeActive] = createSignal(false);

    console.log(isVolumeActive());

    return (
        <div class="h-56 w-full rounded-2xl overflow-hidden border-2 relative text-white ">
            <div class="z-10 h-1/2 w-full flex p-4">
                <img
                    src="/images/Spotify/bg.png"
                    class="absolute top-0 left-0 rounded-2xl object-fit h-full w-full -z-50"
                    style={"filter: blur(4px)"}
                />
                <img
                    src="/images/Spotify/bg.png"
                    class="w-24 h-24 border-[1px] rounded-2xl border-white "
                />
                <div class="flex flex-col justify-evenly pl-2 pt-2 gap-4">
                    <div class="flex flex-col w-full">
                        <p class="text-xl leading-none">Stele Cazatoare</p>
                        <p class="text-xs leading-none opacity-60 pt-1">
                            Puya, Tudor Chirila
                        </p>
                    </div>
                    <div>
                        <p class="text-xs leading-none">Next</p>
                        <p class="text-xs leading-none truncate w-11/12 opacity-60">
                            Must Have Been • Usb Players
                        </p>
                    </div>
                </div>
            </div>
            <div class="h-1/2 flex flex-col w-full items-center justify-center">
                <div class="w-4/5 relative">
                    <div class="w-full flex justify-between px-2.5">
                        <div class="text-xs">00:56</div>
                        <div class="text-xs">02:54</div>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value="2"
                        class="w-full h-2"
                    ></input>
                </div>
                <div class="flex h-12 justify-between items-center w-4/5">
                    <span
                        class="cursor-pointer"
                        onClick={() => setIsShuffleActive(!isShuffleActive())}
                    >
                        <FaSolidShuffle
                            class="h-5 w-5"
                            color={isShuffleActive() ? "#1db954" : "white"}
                        />
                    </span>
                    <span class="cursor-pointer">
                        <ImBackward class="h-7 w-7" />
                    </span>
                    <span
                        class="cursor-pointer"
                        onClick={() => setIsPlayActive(!isPlayActive())}
                    >
                        {isPlayActive() ? (
                            <FaSolidCirclePlay class="h-8 w-8" />
                        ) : (
                            <BsPauseCircleFill class="h-8 w-8" />
                        )}
                    </span>
                    <span class="cursor-pointer">
                        <ImForward2 class="h-7 w-7" />
                    </span>
                    <span
                        class="cursor-pointer"
                        onClick={() => setIsVolumeActive(!isVolumeActive())}
                    >
                        {isVolumeActive() ? (
                            <FiVolumeX class="h-6 w-6" />
                        ) : (
                            <FiVolume2 class="h-6 w-6" />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}
