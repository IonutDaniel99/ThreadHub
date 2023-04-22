import Secondary from "~/components/Secondary/Secondary";

export default function Dashboard() {
    return (
        <>
            <div class="flex h-[calc(100%-4rem)] ">
                <div class="w-10/12 border-r-2 border-black border-opacity-10 p-1 ">
                    Main Section
                </div>
                <Secondary />
            </div>
        </>
    );
}
