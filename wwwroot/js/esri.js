// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// A $( document ).ready() block.

console.log("ready!");
// Call esri map
require([
    "esri/Map",
    "esri/Graphic",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"
], function (Map, Graphic, MapView, FeatureLayer, Legend) {
    // Crime in SF
    var layer = new FeatureLayer({
        // autocasts as new PortalItem()
        portalItem: {
            id: "234d2e3f6f554e0e84757662469c26d3"
        },
        outFields: ["*"]
    });

    var map = new Map({
        basemap: "gray",
        layers: [layer]
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        popup: {
            autoOpenEnabled: false,
            dockEnabled: true,
            dockOptions: {
                // dock popup at bottom-right side of view
                buttonEnabled: false,
                breakpoint: false,
                position: "bottom-right"
            }
        }
    });

    var legend = new Legend({
        view: view,
        layerInfos: [
            {
                layer: layer
            }
        ]
    });

    view.ui.add(legend, "bottom-left");
    view.ui.add("optionsDiv", "top-right");

    // additional query fields initially set to null for basic query
    var distance = null;
    var units = null;

    //create graphic for mouse point click
    var pointGraphic = new Graphic({
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [0, 0, 139],
            outline: {
                color: [255, 255, 255],
                width: 1.5
            }
        }
    });

    // Create graphic for distance buffer
    var bufferGraphic = new Graphic({
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [173, 216, 230, 0.2],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1
            }
        }
    });

    // when query type changes, set appropriate values
    var queryOpts = document.getElementById("query-type");

    queryOpts.addEventListener("change", function () {
        switch (queryOpts.value) {
            // values set for distance query
            case "distance":
                distance = 0.5;
                units = "miles";
                break;
            default:
                // Default set to basic query
                distance = null;
                units = null;
        }
    });
    layer.load().then(function () {
        // Set the view extent to the data extent
        view.extent = layer.fullExtent;
        layer.popupTemplate = layer.createPopupTemplate();
    });

    view.on("click", function (event) {
        view.graphics.remove(pointGraphic);
        if (view.graphics.includes(bufferGraphic)) {
            view.graphics.remove(bufferGraphic);
        }
        queryFeatures(event);
    });

    function queryFeatures(screenPoint) {
        const point = view.toMap(screenPoint);
        layer
            .queryFeatures({
                geometry: point,
                // distance and units will be null if basic query selected
                distance: distance,
                units: units,
                spatialRelationship: "intersects",
                returnGeometry: false,
                returnQueryGeometry: true,
                outFields: ["*"]
            })
            .then(function (featureSet) {
                // set graphic location to mouse pointer and add to mapview
                pointGraphic.geometry = point;
                view.graphics.add(pointGraphic);
                // open popup of query result
                view.popup.open({
                    location: point,
                    features: featureSet.features,
                    featureMenuOpen: true
                });
                if (featureSet.queryGeometry) {
                    bufferGraphic.geometry = featureSet.queryGeometry;
                    view.graphics.add(bufferGraphic);
                }
            });
    }
});

