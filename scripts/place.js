// Wind Chill calculation function
function calculateWindChill(temperature, windSpeed) {
    if (windSpeed > 4.8) {
        // Formula for Wind Chill
        return (13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16))).toFixed(2);
    } else {
        return 'N/A'; // If conditions are not met, return "N/A"
    }
}

// Get the temperature and wind speed (static values for now)
const temperature = 25; // Example: 25°C
const windSpeed = 10; // Example: 10 km/h

// Calculate the wind chill
const windChill = calculateWindChill(temperature, windSpeed);

// Update the DOM with wind chill, temperature, and wind speed
document.getElementById("wind-chill").textContent = windChill;
document.getElementById("temp").textContent = `${temperature}°C`;
document.getElementById("wind-speed").textContent = `${windSpeed} km/h`;

// Set the current year and last modified date in the footer
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;
