var mymap = L.map('mymap',{zoominfoControl: true, zoom: 10, layer: [base] }).setView([48.5734053, 7.752111300000024], 10).on('ready', function() {
    new L.Control.MiniMap(L.map.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'))
        .addTo(mymap);
});;

var base = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 20, minZoom: 2,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

var popup = L.popup();

L.control.fullscreen().addTo(mymap);

L.control.locate().addTo(mymap);

// Layers

var Default = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 20, minZoom: 2,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
    }),
    OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
        maxZoom: 19, minZoom: 2,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }),
    CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 2
    }),
    GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
        attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
        bounds: [[-75, -180], [81, 180]],
        minZoom: 2,
        maxZoom: 16,
        apikey: 'choisirgeoportail',
        format: 'image/jpeg',
        style: 'normal'
    }),
    HikeBike_HikeBike = L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
        maxZoom: 19, minZoom: 2,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17, minZoom: 2,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }),
    NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
        attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
        minZoom: 2,
        maxZoom: 8,
        format: 'jpg',
        time: '',
        tilematrixset: 'GoogleMapsCompatible_Level'
    });

var baseMaps = {
    "Default": Default,
    "Road": OpenTopoMap,
    "Touristique": HikeBike_HikeBike,
    "Satelite": GeoportailFrance_orthos,
    "Railway": OpenRailwayMap,
    "Dark": CartoDB_DarkMatter,
    "Night Light": NASAGIBS_ViirsEarthAtNight2012
};

L.control.layers(baseMaps).addTo(mymap);

// Driving
L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGllbDY3IiwiYSI6ImNqa3MwYm9jNzN6ZWozcXA5bnRwZTBwbHEifQ.KpQsWntBZm4khQBFKnM5hg';
// move the attribution control out of the way
mymap.attributionControl.setPosition('bottomleft');

// create the initial directions object, from which the layer and inputs will pull data.

var directions = L.mapbox.directions();

var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(mymap);

var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
    .addTo(mymap);

var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
    .addTo(mymap);

var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
    .addTo(mymap);

var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
    .addTo(mymap);