
export default function Spotify() {

    return (
        <div class="h-56 w-full rounded-2xl overflow-hidden border-2 relative text-white ">
            <div class="z-10 h-1/2 w-full flex p-4">
                <img src="public/images/Spotify/bg.png" class="absolute top-0 left-0 rounded-2xl object-fit h-full w-full -z-50" style={"filter: blur(4px)"} />
                <img src="public/images/Spotify/bg.png" class="w-24 h-24 border-[1px] rounded-2xl border-white " />
                <div class="flex flex-col justify-evenly pl-2 pt-2 gap-4">
                    <div class="flex flex-col w-full">
                        <p class="text-xl leading-none">Stele Cazatoare</p>
                        <p class="text-xs leading-none opacity-60 pt-1">Puya, Tudor Chirila</p>
                    </div>
                    <div>
                        <p class="text-xs leading-none">Next</p>
                        <p class="text-xs leading-none truncate w-11/12">Must Have Been • Usb Players </p>
                    </div>
                </div>
            </div>
            <div class="h-1/2 flex flex-col w-full items-center justify-center">
                <div class="w-4/5 relative">
                    <div class="w-full flex justify-between px-2.5">
                        <div class="text-xs">00:56</div>
                        <div class="text-xs">02:54</div>
                    </div>
                    <input type="range" min="1" max="100" value="2" class="w-full h-2"></input>
                </div>
                <div class="flex h-12 border-2 border-white">
                    <div>R</div>
                    <div>B</div>
                    <div>P</div>
                    <div>N</div>
                    <div>V</div>
                </div>
            </div>
        </div>
    )
}
