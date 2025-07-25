export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Get the user cordinates
 * @returns {Promise<UserCoordinates>} - The user cordinates
 */
export const getUserCoordinates = (): Promise<UserCoordinates> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      if (status.state === "denied") {
        reject(
          new Error(
            "Geolocation permissions has been denied. Please update your browser settings to allow location access and refresh this page.",
          ),
        );
      } else {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error: GeolocationPositionError) => {
            reject(error);
          },
        );
      }
    });
  });
