
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

function splitLines(string) { return string.split(/\r\n|\r|\n/); }

function formatFortunas(quote, author) {

    if (splitLines(quote).length == 1) {
        // remove trailing '.'
        if (
            quote.charAt(quote.length - 1) == "." &&
            (
                quote.length > 3 &&
                quote.substring(quote.length - 3, quote.length) != "..."
            )  // no es '...'
        ) {
            quote = quote.slice(0, -1)
        }

        // replace '«', '»'
        quote = quote.replace("«", "\"")
        quote = quote.replace("»", "\"")


        // añadir comillas guays

        // prevenir que se apliquen al setup/punchline (*Uno que pasaba* Y le dije...)
        let first = quote.indexOf("*")
        let last = quote.lastIndexOf("*")
        if (first >= 0 && first != last) {
            if (first == 0) {
                // prevenir al inicio
                quote = quote.substring(first, last + 1) + "\n" +
                        "«" + quote.substring(last + 2, quote.length) + "»"
            }
            else if (last == quote.length - 1) {
                // prevenir al final
                quote = "«" + quote.substring(0, first - 1) + "»" +
                        "\n" + quote.substring(first, quote.length)
            }
        }
        else {
            quote = "«" + quote + "»"
        }
    }

    return [quote, "— " + author]
}


$(document).ready(function() {
    /* ====== OPEN STREET MAP  -  LEAFLET ====== */
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });
    var map = L.map('map').setView([40.33139,-3.76821], 17).addLayer(osm);
    L.marker([40.33228,-3.76589])
        .addTo(map)
        .bindPopup('Universidad Carlos III de Madrid')
        .openPopup();

    // Fichero con las fortunas ya se encuentra precargado en el HTML
    // Carga fortuna aleatoria y rellena el elemento HTML
    let fortuna_aleatoria = fortunas[Math.floor(Math.random() * fortunas.length)];
    console.log(fortuna_aleatoria);

    const [quote, author] = formatFortunas(fortuna_aleatoria[0], fortuna_aleatoria[1])
    $("#fortuna-texto").html(quote);
    $("#fortuna-autor").html(author);
});
