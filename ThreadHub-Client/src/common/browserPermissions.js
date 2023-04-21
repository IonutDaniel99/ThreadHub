const arrayOfPermissions = [
    "geolocation",
    // "notifications",
    // "push",
    // "midi",
    // "camera",
    // "microphone",
    // "speaker",
    // "device-info",
    // "background-fetch",
    // "background-sync",
    // "bluetooth",
    // "persistent-storage",
    // "ambient-light-sensor",
    // "accelerometer",
    // "gyroscope",
    // "magnetometer",
    // "clipboard",
    // "screen-wake-lock",
    // "nfc",
    // "display-capture",

    // Non-standard:
    // "accessibility-events",
    // "clipboard-read",
    // "clipboard-write",
    // "payment-handler",
    // "idle-detection",
    // "periodic-background-sync",
    // "system-wake-lock",
    // "storage-access",
]

export const getLocation = () => {
    const options = {
        timeout: 5000,
        maximumAge: 0,
    };

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            },
            options
        );
    });
}

