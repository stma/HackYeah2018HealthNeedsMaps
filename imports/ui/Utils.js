
export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((p) => resolve(p.coords), null, {maximumAge: 1000 * 60, enableHighAccuracy: true});
            }
        }
    );
};
