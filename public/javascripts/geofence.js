// * Source: https://developer.here.com/blog/geofencing-regions-with-javascript-and-here

class Location {
    constructor(lat, long) {
        this.lat = lat;
        this.long = long;
    }
}

const zachry = new Location(30.621356, -96.340493)
const centerMap = new Location(30.620635, -96.341027)

class HereMap {
    constructor(appId, apiKey, mapElement, PatientLocation) {
        this.appId = appId;
        this.apiKey = apiKey,
            this.platform = new H.service.Platform({
                'apikey': apiKey
            });

        var defaultLayers = this.platform.createDefaultLayers();

        // Instantiate (and display) a map object:

        this.map = new H.Map(
            mapElement,
            defaultLayers.vector.normal.map, {
                zoom: 16.5,
                pixelRatio: window.devicePixelRatio || 1,
                center: {
                    lat: centerMap.lat,
                    lng: centerMap.long
                }
            }
        );
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        // Add UI components
        // Create the default UI components
        var ui = H.ui.UI.createDefault(this.map, defaultLayers);

        // add a resize listener to make sure that the map occupies the whole container
        window.addEventListener('resize', () => this.map.getViewPort().resize());
        this.geofencing = this.platform.getGeofencingService();
        this.currentPosition = new H.map.Marker({
            lat: PatientLocation.lat,
            lng: PatientLocation.long
        });
        this.map.addObject(this.currentPosition);
        // console.log("Current Position:" + this.currentPosition.getGeometry())
        this.getAddress();
        this.isWithinFence();

        this.map.addEventListener("tap", (ev) => {
            var target = ev.target;
            this.map.removeObject(this.currentPosition);
            this.currentPosition = new H.map.Marker(this.map.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY));
            this.map.addObject(this.currentPosition);
            this.fenceRequest(["zachry"], this.currentPosition.getGeometry()).then(result => {
                if (result.geometries.length > 0) {
                    // * In case I want to add a label
                    // var bubble = new H.ui.InfoBubble({
                    //     lng: zachry.long,
                    //     lat: zachry.lat
                    // }, {
                    //     content: '<b>Pape is within Fence!</b>'
                    // });
                    // // Add info bubble to the UI:
                    // ui.addBubble(bubble);
                    this.getAddress();
                    this.isWithinFence()
                } else {
                    this.getAddress();
                    this.isWithinFence()
                }
            });
        }, false);
    }
    draw(mapObject) {
        this.map.addObject(mapObject);
    }
    polygonToWKT(polygon) {
        const geometry = polygon.getGeometry();
        return geometry.toString();
    }
    uploadGeofence(layerId, name, geometry) {
        const zip = new JSZip();
        zip.file("data.wkt", "NAME\tWKT\n" + name + "\t" + geometry);
        return zip.generateAsync({
            type: "blob"
        }).then(content => {
            var formData = new FormData();
            formData.append("zipfile", content);
            return axios.post("https://fleet.ls.hereapi.com/2/layers/upload.json", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                },
                params: {
                    "apiKey": this.apiKey,
                    "layer_id": layerId
                }
            });
        });
    }
    fenceRequest(layerIds, position) {
        return new Promise((resolve, reject) => {
            this.geofencing.request(
                H.service.extension.geofencing.Service.EntryPoint.SEARCH_PROXIMITY, {
                    'layer_ids': layerIds,
                    'proximity': position.lat + "," + position.lng,
                    'key_attributes': ['NAME']
                },
                result => {
                    resolve(result);
                }, error => {
                    reject(error);
                }
            );
        });
    }

    getAddress() {
        var lat = this.currentPosition.getGeometry().lat;
        var lng = this.currentPosition.getGeometry().lng;
        var url = "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=oyfO4jfGOwSPdYhXdY6o7yJZlVezlB9cEa8IdQlalao&mode=retrieveAddresses";
        var params = "&prox=" + lat + "," + lng;

        fetch(url + params)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                var address = jsonResponse.Response.View[0].Result[0].Location.Address.Label;
                $('#addressHeader + p').empty();
                $('#addressHeader').after("<p>" + address + "</p>");
            });
    }

    isWithinFence() {
        this.fenceRequest(["zachry"], this.currentPosition.getGeometry()).then(result => {
            if (result.geometries.length > 0) {
                $('.geofenceLabel + div').remove();
                $('.geofenceLabel').after('<div class="ui green label">YES</div>')
            } else {
                $('.geofenceLabel + div').remove();
                $('.geofenceLabel').after('<div class="ui red label">NO</div>')
            }
        });
    }
}
const start = async (lat, long) => {
    var PatientLocation = new Location(lat, long);

    var map = new HereMap("xqbdoZAQ7svDzIG0eLzH", "oyfO4jfGOwSPdYhXdY6o7yJZlVezlB9cEa8IdQlalao",
        document.getElementById('map'), PatientLocation);
    const lineStringZachry = new H.geo.LineString();
    lineStringZachry.pushPoint({
        lat: 30.621550,
        lng: -96.341565
    });
    lineStringZachry.pushPoint({
        lat: 30.622404,
        lng: -96.340573
    });
    lineStringZachry.pushPoint({
        lat: 30.621364,
        lng: -96.338995
    });
    lineStringZachry.pushPoint({
        lat: 30.620279,
        lng: -96.340388
    });
    const zachry = new H.map.Polygon(lineStringZachry);
    map.draw(zachry);
    const geofenceResponseEvans = await map.uploadGeofence("zachry",
        "oyfO4jfGOwSPdYhXdY6o7yJZlVezlB9cEa8IdQlalao", map.polygonToWKT(
            zachry))
    // TODO: Figure out why I can't have two layers
    // const lineStringBlocker = new H.geo.LineString();
    // lineStringBlocker.pushPoint({
    //     lat: 30.619740,
    //     lng: -96.342871
    // });
    // lineStringBlocker.pushPoint({
    //     lat: 30.618971,
    //     lng: -96.342085
    // });
    // lineStringBlocker.pushPoint({
    //     lat: 30.619428,
    //     lng: -96.341384
    // });
    // lineStringBlocker.pushPoint({
    //     lat: 30.619834,
    //     lng: -96.341888
    // });
    // lineStringBlocker.pushPoint({
    //     lat: 30.619740,
    //     lng: -96.342871
    // });
    // const blocker = new H.map.Polygon(lineStringBlocker);
    // // var zachry = new H.map.Circle({
    // //     lat: 30.621356,
    // //     lng: -96.340493
    // // }, 200);

    // map.draw(blocker);
    // const geofenceResponseBlocker = await map.uploadGeofence("blocker",
    //     "oyfO4jfGOwSPdYhXdY6o7yJZlVezlB9cEa8IdQlalao", map.polygonToWKT(
    //         blocker))
};

class PatientsMap {
    constructor(appId, apiKey, mapElement) {
        this.appId = appId;
        this.apiKey = apiKey,
            this.platform = new H.service.Platform({
                'apikey': apiKey
            });

        var defaultLayers = this.platform.createDefaultLayers();

        this.map = new H.Map(
            mapElement,
            defaultLayers.vector.normal.map, {
                zoom: 15,
                center: {
                    lat: centerMap.lat,
                    lng: centerMap.long
                }
            }
        );
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

        var ui = H.ui.UI.createDefault(this.map, defaultLayers);

        window.addEventListener('resize', () => this.map.getViewPort().resize());
        this.geofencing = this.platform.getGeofencingService();
        this.currentPosition = new H.map.Marker({
            lat: centerMap.lat,
            lng: centerMap.long
        });
        this.map.addObject(this.currentPosition);
    }
}

const drawPatientsMap = () => {
    var map = new PatientsMap("xqbdoZAQ7svDzIG0eLzH", "oyfO4jfGOwSPdYhXdY6o7yJZlVezlB9cEa8IdQlalao",
        document.getElementById('allPatientsMap'));
}
