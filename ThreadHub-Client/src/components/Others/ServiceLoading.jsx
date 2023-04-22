export default function ServiceLoading({ serviceError, style }) {
    return (
        <div
            class={`border-2 border-slate-400 flex items-center justify-center ease-in-out animate-pulse transition-opacity rounded-xl ${
                style || "h-12"
            }`}
        >
            {serviceError}
        </div>
    );
}
