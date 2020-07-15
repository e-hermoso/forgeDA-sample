// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// A $( document ).ready() block.

console.log("esri javascript");
// Call esri map

var view;
var findposition = false;
var myitemid;
var myfile;
var correctcad = "Spatial reference of CAD file is in compliance with County standards."
var gp2failed = "File Failed to Convert."
var workingGDB;
function base_map() {
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/geometry/Polyline",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/SpatialReference",
        "esri/request",
        "esri/tasks/Geoprocessor",
        "esri/tasks/support/DataFile",
        "esri/config",
        "esri/layers/MapImageLayer",
        "esri/layers/TileLayer",
        "esri/widgets/BasemapToggle",
        "esri/Basemap",
        "esri/geometry/Point"
    ], function (Map, MapView, Polyline, Graphic, GraphicsLayer, SpatialReference, esriRequest, Geoprocessor, DataFile, esriConfig, MapImageLayer, TileLayer, BasemapToggle, Basemap, Point) {
        var dataFile = new DataFile();
        esriConfig.request.timeout = 300000;
        var mylocation = '{"displayFieldName": "","geometryType": "esriGeometryPoint","spatialReference": {"wkid": 2230,"latestWkid": 2230},"fields": [{"name": "OBJECTID","type": "esriFieldTypeOID","alias": "OBJECTID"}],"features": [{"attributes": {"OBJECTID": 1},"geometry": {"x": 6068758.9199999999,"y": 2242984.3800000008}}],"exceededTransferLimit": false}'

        var gpUrl =
            "https://www.ocgis.com/arcpub/rest/services/MapChecking_ProjectionCheck/GPServer/ProjectionCheckScript";

        var gpUploadURL = "https://www.ocgis.com/arcpub/rest/services/MapChecking_ProjectionCheck/GPServer/uploads/upload"

        var uploadURL = "https://www.ocgis.com/arcpub/rest/services/MapChecking_ProjectionCheck/GPServer/uploads"

        var gp = new Geoprocessor(gpUrl);

        /// gptool2
        var gp2Url =
            "https://www.ocgis.com/arcpub/rest/services/MapChecking_ConvertCadFile/GPServer/ConvertCadFile";

        var gp2UploadURL = "https://www.ocgis.com/arcpub/rest/services/MapChecking_ConvertCadFile/GPServer/uploads/upload"

        var uploadURL2 = "https://www.ocgis.com/arcpub/rest/services/MapChecking_ConvertCadFile/GPServer/uploads"

        var gp2 = new Geoprocessor(gp2Url);

        /// gptool3
        var gp3Url = "https://ocgis.com/arcpub/rest/services/MapChecking_TopologyCheck/GPServer/TopologyCheck";

        var gp3 = new Geoprocessor(gp3Url);

        var gpUploadURL4 = "https://ocgis.com/arcpub/rest/services/cad2amc_Eric/GPServer/uploads/upload"
        var uploadURL4 = "https://ocgis.com/arcpub/rest/services/cad2amc_Eric/GPServer/uploads"

        //var oForm = document.getElementById('inputFile'); // Erics- chnaged the id name of the form element.

        var gpUrl4 = "https://ocgis.com/arcpub/rest/services/cad2amc_Eric/GPServer/CAD%20to%20AMC";

        var dict = {};
        var dict2 = {};
        var parent = $('#content-sidebar');

        var gp4 = new Geoprocessor(gpUrl4);
        var graphicslayer = new GraphicsLayer({
            id: 'graphicslayer'
        });

        var lblgraphicslayer = new GraphicsLayer({
            id: 'lblgraphicslayer'
        });

        var lineSymbol = {
            type: "simple-line", // autocasts as new SimpleLineSymbol()
            color: 'yellow', // RGB color values as an array
            width: 4
        };


        var citylayers = new MapImageLayer({
            url: "https://www.ocgis.com/arcpub/rest/services/Map_Layers/City_Boundaries/MapServer",
            popupEnabled: false
        });

        var OCbasemapLayer = new TileLayer({
            url: "https://www.ocgis.com/survey/rest/services/Basemaps/County_Basemap_Ext/MapServer"
        });
        var eagleLayer = new TileLayer({
            url: "https://gis.ocgov.com/arcimg/rest/services/Aerial_Imagery_Countywide/Eagle_2017/MapServer"
        });

        var streetlayers = new MapImageLayer({
            url: "https://www.ocgis.com/survey/rest/services/WebApps/Streets/MapServer",
            popupEnabled: false
        });

        var OCB = new Basemap({
            baseLayers: [OCbasemapLayer],
            title: "Orange County",
            id: "ocbasemap",

            thumbnailUrl: "BasemapThumb.jpg"
        });

        var oceagle = new Basemap({
            baseLayers: [eagleLayer],
            title: "Eagle",
            id: "eagle",
            thumbnailUrl: "Eagle2017AerialThumbnail.jpg"
        });


        var parcellayer = new MapImageLayer({
            url: "https://www.ocgis.com/survey/rest/services/WebApps/Map_Layers_Associated_Documents/MapServer",
            sublayers: [
                {
                    id: 66,
                    visible: true,
                }, {
                    id: 67,
                    visible: false
                }, {
                    id: 68,
                    visible: false
                }
            ]
        });


        var map = new Map({
            //basemap: "streets-night-vector"
            basemap: OCB
        });

        map.add(citylayers);
        map.add(parcellayer);
        map.add(streetlayers);
        //map.basemap = "streets-night-vector";

        view = new MapView({
            container: "viewDiv",
            map: map
            // spatialReference: new SpatialReference({
            //   wkid: 2230
            // })
        });

        var btoggle = new BasemapToggle({
            titleVisible: true,
            view: view,
            nextBasemap: oceagle
        });

        view.ui.add("reset-map", "top-left");

        view.ui.add(btoggle, "bottom-left");

        map.add(graphicslayer);
        map.add(lblgraphicslayer);

        view.when(function () {
            //myUpload()
        });

        var markerSymbol3 = {
            type: "simple-marker", // autocasts as SimpleFillSymbol
            style: "x",
            color: "red",
            size: "14pt",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: "red",
                width: 3
            }

        }

        view.on("click", function (evt) {
            if (findposition) {
                view.graphics.removeAll();
                console.log(evt.mapPoint.x, evt.mapPoint.y);
                mylocation = '{"displayFieldName": "","geometryType": "esriGeometryPoint","spatialReference": {"wkid": 2230,"latestWkid": 2230},"fields": [{"name": "OBJECTID","type": "esriFieldTypeOID","alias": "OBJECTID"}],"features": [{"attributes": {"OBJECTID": 1},"geometry": {"x": ' + evt.mapPoint.x + ',"y": ' + evt.mapPoint.y + '}}],"exceededTransferLimit": false}'
                view.graphics.add(new Graphic(evt.mapPoint, markerSymbol3));
            }

        })


        function clearup() {
            graphicslayer.graphics.removeAll();
            view.graphics.removeAll();
            var addtitle = '<h3 align="center">Legal Description</h3>';
            parent.empty();
            parent.append(addtitle);
        }

        function myUpload() {
            var oForm = document.getElementById('importFileForm'); // Erics- chnaged the id name of the form element.
            //var oForm_file = oForm.files[0];
            findposition = false;
            view.surface.style.cursor = "default";
            graphicslayer.graphics.removeAll();
            view.graphics.removeAll();
            var addtitle = '<h3 align="center">Legal Description</h3>';
            parent.empty();
            parent.append(addtitle);
            console.log('Uploading file..');
            console.log('oForm', oForm)

            esriRequest(gpUploadURL4, {
                body: oForm,
                responseType: "document",
                method: "post"
            }).then(myUploadSucceeded, myUploadFailed);

        }

        function myUploadSucceeded(response) {
            console.log('Maybe Good response', response);
            var temp = response.data.body.innerText;
            if (temp) {
                temp = temp.replace(/[\n\r]+/g, ' ');
            }
            var start = temp.search("Item ID:"); //returns -1 if no match is found
            var end = temp.search("Item name:");
            var itemID = temp.slice(start, end).trim().replace(/\n|\r/g, "").replace("Item ID:", "").trim();
            myitemid = "{'itemID':'" + itemID + "'}"
            console.log('itemID', itemID);

            // //var dataFile = new DataFile();
            dataFile.itemid = itemID;
            dataFile.itemId = itemID;
            dataFile.url = uploadURL4 + '/' + itemID;


            var params = {
                "cadpath": myitemid
            };


            console.log('Params', params);

            gp4.execute(params).then(function (gpResult) {
                console.log('gpResult', gpResult)
                var kjson = gpResult.results[8].value;
                console.log('kjson', kjson)
                lblgraphicslayer.graphics.removeAll();
                var dictionary = kjson.Boundaries;
                console.log('dictionary', dictionary)
                var centroid = kjson.Controls.Centroid;
                var centerx = Number(kjson.Controls.Centroid[0]);
                var centery = Number(kjson.Controls.Centroid[1]);
                console.log('centroid', centroid)
                console.log(centerx, centery)

                for (var key in dictionary) {
                    // check if the property/key is defined in the object itself, not in parent
                    if (dictionary.hasOwnProperty(key)) {
                        var shapetype = dictionary[key].shapetype;
                        var words = dictionary[key].desc_ground;
                        var oid = dictionary[key].coid;
                        var wkt = dictionary[key].wkt;
                        var bdlabel = dictionary[key].annweb_ground;
                        var midx = Number(dictionary[key].midx);
                        var midy = Number(dictionary[key].midy);
                        console.log("mid", midx, midy)

                        var signx = Math.sign(centerx - midx);
                        var signy = Math.sign(centery - midy)
                        console.log(signx, signy);
                        var offx = 0;
                        var offy = 0;
                        if (signx === -1) {
                            console.log('x is positve')
                            midx = midx + 30;
                        } else {
                            console.log('x is negative')
                            midx = midx - 30;
                        }
                        if (signy === -1) {
                            console.log('y is positve')
                            midy = midy + 30;
                        } else {
                            console.log('y is negative')
                            midy = midy - 30;
                        }
                        var point = new Point(midx, midy, view.spatialReference);
                        var lblGraphic = new Graphic({
                            geometry: point,
                            symbol: {
                                type: "text", // autocasts as SimpleFillSymbol
                                color: "black",
                                haloColor: "white",
                                haloSize: "1px",
                                text: bdlabel,
                                xoffset: 0,
                                yoffset: 0,
                                font: {  // autocast as new Font()
                                    size: 9,
                                    family: "sans-serif",
                                    weight: "bold"
                                }

                            }
                        });

                        lblgraphicslayer.graphics.add(lblGraphic);
                        var myAtt = {
                            legal: words,
                            oid: oid
                        };

                        function createFeature(path) {

                            var myline = new Polyline({
                                paths: path,
                                spatialReference: { wkid: 2230 }
                            });

                            dict2[oid] = myline;
                            dict[oid] = words;




                            var mylabel = "<label id=" + oid + " class = 'lblclass' style = 'margin-right:3px'>" + words + " </label>";
                            var newElement = $(mylabel);
                            parent.append(newElement);

                            let mygraphic = new Graphic({
                                geometry: myline,
                                attributes: myAtt,
                                symbol: {
                                    type: "simple-line",
                                    color: [225, 0, 0],
                                    width: 1.5
                                }
                            });
                            graphicslayer.graphics.add(mygraphic);

                        }

                        var str = wkt
                        str = str.replace("MULTILINESTRING Z ((", "").replace('))', '')

                        if (shapetype == 'Line') {
                            console.log('Line')
                            var x = str.split(',')[0].split(' ')[0]
                            var y = str.split(',')[0].split(' ')[1]
                            var x2 = str.split(',')[1].split(' ')[1]
                            var y2 = str.split(',')[1].split(' ')[2]
                            var path = [[x, y, 0], [x2, y2, 0]]

                            createFeature(path);
                        } else if (shapetype == 'Curve') {
                            var cstr = str.split(', ')
                            console.log('Curve', cstr)
                            var item1 = []
                            cstr.forEach(function (item) {
                                var item2 = []
                                var item3 = item.split(' ')
                                console.log('item3', item3)
                                item3.forEach(function (itemx) {
                                    var num = Number(itemx)
                                    console.log(itemx, num)
                                    item2.push(num)

                                })
                                item1.push(item2)
                            })

                            createFeature(item1);
                        }

                    }
                }

            }, myUploadFailed);

        }

        function myUploadFailed(response) {
            //alert("Failed!")
            console.log("failure", response);

        }


        // Erics - Changed the id name of the button element.
        $("#startWorkitem").click(function () {
            myUpload();
        });

        $('#reset-map').css('display', 'block');
        $("#reset-map").click(function () {
            clearup();
            console.log('reset clicked')
            //remove existing graphic


        });


        let lastgeo;
        $(document).on("click", ".lblclass", function () {
            // hover starts code here
            var oid = $(this).attr("id");

            lastgeo = '';

            $("label").css("background-color", "white");
            $(this).css("background-color", "yellow");
            let myline = dict2[oid]
            let mygraphic = new Graphic({
                geometry: myline,
                symbol: lineSymbol
            });
            view.graphics.removeAll();
            view.graphics.add(mygraphic);
        });

        // $(document).on("mouseleave", ".lblclass", function() {
        //     // hover ends code here
        //     console.log('something');
        //     $(this).css("background-color", "white");
        //     view.graphics.removeAll();
        // });



        view.on("pointer-down", function (event) {
            // view.graphics.removeAll();
            // $( ".lblclass" ).css("background-color", "white");
            lastgeo = ''
            view.hitTest(event).then(function (response) {
                const graphic = response.results.filter(function (result) {
                    return result.graphic.layer === graphicslayer;
                })[0].graphic;
                let attribute = graphic.attributes;
                let geo = graphic.geometry;
                view.graphics.removeAll();
                $(".lblclass").css("background-color", "white");

                if (lastgeo !== geo) {
                    lastgeo = geo;
                    //lineSymbol

                    let graphic3 = new Graphic({
                        geometry: geo,
                        symbol: lineSymbol
                    });

                    ////*[@id="87"]

                    view.graphics.add(graphic3);

                    $("#" + attribute.oid).css("background-color", "yellow");
                    $("#" + attribute.oid)[0].scrollIntoView({
                        behavior: "smooth", // or "auto" or "instant"
                        block: "start" // or "end"
                    });

                    // if (attribute.oid === 'lbl0'){
                    //   $( "#lbl0" ).css("background-color", "yellow");
                    //   $( "#lbl1" ).css("background-color", "white");
                    // } else if (attribute.oid === 'lbl1'){
                    //   $( "#lbl1" ).css("background-color", "yellow");
                    //   $( "#lbl0" ).css("background-color", "white");
                    // }
                } else {
                    console.log('Same');
                }




            })
        });
    });
}

function handleFiles(files) {

    console.log('file uploaded')
    console.log(files)
    $("#drop-area").addClass("d-none")
    $("#viewDiv").removeClass("d-none")
    $("#upload-cad-file").removeClass("d-none")
    base_map();
}

function makex() {
    console.log('makex:true')
    findposition = true;
    view.surface.style.cursor = "crosshair";
    $("#reset-map").click();

}

$(document).ready(function () {

    //$('#sidebarCollapse').on('click', function () {
    //    $('#sidebar').toggleClass('active');
    //    $('#map_region').toggleClass('active');
    //});

    $("p").click(function () {
        alert("The paragraph was clicked.");
    });

    //$("#drop-area").addClass("d-none")
    //$("#viewDiv").removeClass("d-none")
    //$("#upload-cad-file").removeClass("d-none")
    base_map();
});

