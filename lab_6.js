// Initialize the map centered on the US
var map = L.map('map').setView([37.0902, -95.7129], 4);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate 3 random sets of coordinates
var coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) }
];

// Function to add markers and get locality info
coordinates.forEach((coord, index) => {
    var marker = L.marker([coord.lat, coord.lon]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}: [${coord.lat}, ${coord.lon}]`).openPopup();

    // API call to get locality
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            document.getElementById(`marker${index + 1}`).innerText = `${coord.lat}, ${coord.lon} - ${data.locality || 'Unknown Locality'}`;
        })
        .catch(error => {
            console.error('Error fetching locality:', error);
            document.getElementById(`marker${index + 1}`).innerText = `${coord.lat}, ${coord.lon} - Error fetching locality`;
        });
});