
function offsetNav() {
    var navbar = document.getElementById("navbar");
    var offset = navbar.offsetHeight;
    return offset;
}

/* ====== SCROLL ANYWHERE ====== */
function scrollToIt(section) {
    console.log(section.toString());
    var sectionHeight = $(section.toString()).offset().top;
    var offset = 84;
    console.log(sectionHeight);

    var distance = sectionHeight - offset / 5;

    $(window).scrollTop(distance);
}


/* ====== OPEN STREET MAP  -  LEAFLET ====== */
var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });
var map = L.map('map').setView([40.33139,-3.76821], 17).addLayer(osm);
L.marker([40.33228,-3.76589])
    .addTo(map)
    .bindPopup('Universidad Carlos III de Madrid')
    .openPopup();
