// Footer setup
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind chill calculation
function calculateWindChill(tempC, speedKmh) {
  if (tempC <= 10 && speedKmh > 4.8) {
    let v = Math.pow(speedKmh, 0.16);
    let chill = 13.12 + 0.6215 * tempC - 11.37 * v + 0.3965 * tempC * v;
    return chill.toFixed(1) + " °C";
  } else {
    return "N/A";
  }
}

// Run calculation on load
const temp = parseFloat(document.getElementById("temperature").textContent);
const wind = parseFloat(document.getElementById("windSpeed").textContent);
document.getElementById("windChill").textContent = calculateWindChill(temp, wind);
