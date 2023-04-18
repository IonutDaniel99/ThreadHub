import Weather from "../components/Secondary/weather";

export default function Dashboard() {
    return (
        <>
            <div class="flex">
                <div class="w-10/12 border-r-2 bg-red-200 m-1">Main Section</div>
                <div class="w-2/12 m-1">
                    <Weather />
                </div>
            </div>
        </>
    );
}