var dataJson = {
    "BaseChecks": [
        {
            "LayerChecks": {
                "Result": "Fail",
                "MissingLayers": "BASIS OF BEARING GPS TIES,BOUNDARY,CENTERLINES,EASEMENTS,LOT LINES,NORTH ARROW MISCELLANEOUS,RIGHT OF WAY"
            }
        }
    ],
    "Parcels": {},
    "Segmentkey": [],
    "C3D_Labels": {
        "Labels": [
            {
                "ParcelSegments": []
            },
            {
                "Alignments": []
            },
            {
                "FeatureLines": []
            },
            {
                "Polylines": []
            },
            {
                "Lines": []
            },
            {
                "Arcs": []
            }
        ]
    },
    "Map_checkResults": [
        {
            "Model": [
                {
                    "top_of_all_sheets": {
                        "tract_parcel_map_number": [],
                        "date_of_survey": [
                            {
                                "HandleId": "b659",
                                "match_word": "DATE OF SURVEY: 10/26/2017",
                                "x": 31107.026194458209,
                                "y": 11228.528266734
                            }
                        ],
                        "surveyor_engineer_name_license": [
                            {
                                "HandleId": "bb10",
                                "match_word": "ALFRED J. THELWELL, LS 6999",
                                "x": 31222.373683522714,
                                "y": 11155.653262648202
                            },
                            {
                                "HandleId": "bbac",
                                "match_word": "C TAGGED LS 6999",
                                "x": 31259.729920857244,
                                "y": 10989.042982694229
                            },
                            {
                                "HandleId": "bbc5",
                                "match_word": "BRASS WASHER \r\nSTAMPED L.S. 5183",
                                "x": 31659.441567592636,
                                "y": 11039.439309968637
                            },
                            {
                                "HandleId": "bf0c",
                                "match_word": "W STAMPED LS 6999",
                                "x": 31482.6895838937,
                                "y": 11008.525792042698
                            }
                        ],
                        "total_area": [],
                        "number_of_lots_parcels": [
                            {
                                "HandleId": "b657",
                                "match_word": "LOTS: 5",
                                "x": 31107.253390780643,
                                "y": 11243.771894421843
                            },
                            {
                                "HandleId": "b6af",
                                "match_word": "LOTS 1",
                                "x": 31370.983842344671,
                                "y": 11089.395011209348
                            },
                            {
                                "HandleId": "c0a2",
                                "match_word": "LOTS 1",
                                "x": 31278.957435702083,
                                "y": 10819.57450535413
                            },
                            {
                                "HandleId": "c0a5",
                                "match_word": "LOTS 1",
                                "x": 31497.286658946086,
                                "y": 10514.047390896581
                            },
                            {
                                "HandleId": "c0cf",
                                "match_word": "LOTS 1",
                                "x": 31399.167661779269,
                                "y": 10796.644325429826
                            },
                            {
                                "HandleId": "c0d0",
                                "match_word": "LOTS 8",
                                "x": 31350.314548824026,
                                "y": 10502.702023775155
                            },
                            {
                                "HandleId": "d5b1",
                                "match_word": "LOTS 21",
                                "x": 31628.726183393752,
                                "y": 10661.145064029652
                            }
                        ],
                        "sheet_numbers": [],
                        "tentative_pm/tr": []
                    }
                },
                {
                    "title_sheets": {
                        "legal_description_near_top_center": [
                            {
                                "HandleId": "bb13",
                                "match_word": " IN THE CITY OF COSTA MESA, COUNTY OF ORANGE, STATE OF CALIFORNIA",
                                "x": 31418.9958378073,
                                "y": 11215.078518842372
                            }
                        ],
                        "owners_subdividers_certificate": [],
                        "surveyors_engineers_statement": [],
                        "county_surveyors_statement": [],
                        "signiture_omissions": [],
                        "scilicet_certificates": [],
                        "first_check_tract": []
                    }
                }
            ]
        }
    ]
}


/* Formatting function for row details - modify as you need */
function format(subCheckObj, number) {
    //console.log(d[4])
    // `d` is the original data object for the row
    var subTableFormat = "<tr class='show_tbl' id='childTbl-" + number.toString() + "'><td colspan=5><table class='child-sub-table' cellpadding='5' cellspacing='0' border='0' style='padding-left:50px;'>"

    $.each(subCheckObj, function (m, obj_five) {
        //console.log(m)
        //console.log(obj_five)
        subTableFormat = subTableFormat + "<tr class='main-child-row'>"
        subTableFormat = subTableFormat + "<td>" + m + "</td>"
        $.each(obj_five, function (n, obj_six) {
            //console.log('Key', n)
            //console.log('Value', obj_six)
            //console.log(obj_six['HandleId'])
            subTableFormat = subTableFormat + "<td class='matched-found' dataInfo=" + obj_six['HandleId'] + ">" + obj_six['match_word'] + "</td>"
        })
        subTableFormat = subTableFormat + "</tr>"
    })

    subTableFormat = subTableFormat + "</table></td></tr>"

    return subTableFormat
}

// function(key,value)
function builtTable(dataJson) {
    $.each(dataJson["Map_checkResults"], function (i, obj) {
        // console.log(i)
        // console.log(obj)
        // console.log(Object.keys(obj)) // Returns an array of keys in an object
        var autocad_layOutName = Object.keys(obj)[i]
        // obj equals dataJson["Map_checkResults"][i] : same results
        $.each(obj, function (j, obj_two) {

            // console.log(j) // Autocad Layout Name
            // console.log(obj_two) // list of objects
            var tableBody = ""
            var rowNumber = 0
            $.each(obj_two, function (k, obj_three) {
                //console.log(k)
                //console.log("===============================")
                //console.log("MAIN CHECKS - Record of Survey etc..")
                //console.log(k)
                //console.log(obj_three)
                //console.log("===============================")

                $.each(obj_three, function (l, obj_four) {
                    rowNumber = rowNumber + 1
                    // console.log(l)
                    // console.log(obj_four)
                    tableBody = tableBody + "<tr class='main-parent-row'>"
                    tableBody = tableBody + "<td class='details-controls'id='parentTbl-" + rowNumber.toString() + "'>"
                    tableBody = tableBody + l
                    tableBody = tableBody + "</td>"
                    tableBody = tableBody + "<td>"
                    tableBody = tableBody + "result"
                    tableBody = tableBody + "</td>"
                    tableBody = tableBody + "<td>"
                    tableBody = tableBody + "message"
                    tableBody = tableBody + "</td>"
                    tableBody = tableBody + "<td>"
                    tableBody = tableBody + "pass"
                    tableBody = tableBody + "</td>"
                    tableBody = tableBody + "</tr>"
                    tableBody = tableBody + format(obj_four, rowNumber)

                })
            })
            $("#dynamicTable").append(tableBody)
        })
    })
}
// Test static json tabel
//$(document).ready(function () {
//    builtTable(dataJson);
//});

/*
 * Add Functionality to interact with the data in the table
 * and Forge Viewer after the table is created.
 */

// GetAllLeafComponents function
function getAllLeafComponents_v3(callback) {
    //alert("Object Tree")
    viewer.getObjectTree(function (tree) {
        let leaves = [];
        tree.enumNodeChildren(tree.getRootId(), function (dbId) {
            if (tree.getChildCount(dbId) === 0) {
                leaves.push(dbId);
            }
        }, true);
        callback(leaves);
    });
}

function executeFitToViewHandleId(handleIdData) {
    // Execute test function getAllLeafComponents_v3
    console.log("Eric - Handle Id Passed: ", handleIdData)
    console.log("Eric - Type of: ", typeof handleIdData)
    getAllLeafComponents_v3((dbIds) => {
        // Now for leaf components, let's get some properties and count occurrences of each value
        const filteredProps = ['Handle'];

        // important! How does the search function work.

        // Get only the properties we need for the leaf dbIds
        viewer.model.getBulkProperties(dbIds, filteredProps, (items) => {
            // Iterate through the elements we found
            var handleIdVal
            var dbIdVal
            items.forEach((item) => {

                // Check a polyline based on dwg file

                handleIdVal = item['properties'][0]['displayValue']
                dbIdVal = item['dbId']
                console.log("Viewer - Handle Id: ", handleIdVal)
                console.log("Viewer - Type of", typeof handleIdVal)
                if (handleIdVal == handleIdData) {
                  console.log("Eric - Matched Handle Id ", handleIdVal)
                    viewer.select(dbIdVal)
                    viewer.utilities.fitToView()
                }
            });
            //console.log(viewer.select([testDbid]))
        });
    });
}

$(document).on('click', '.matched-found', function () {

    //alert($(this).attr('datainfo'));
    var handleIdFromElementAttribute = $(this).attr('datainfo')

    executeFitToViewHandleId(handleIdFromElementAttribute)
})

//var table = $('#example').DataTable();

// // Add event listener for opening and closing details
// $('#example tbody').on('click', 'td.details-controls', function () {
//     //var tr = $(this).closest('tr');
//     var patt = /\d+/i;
//     var idParentName = $(this).attr('id')
//     var resultMatch = idParentName.match(patt); // returns an Array (object)
//     var childClassName = "childTbl-" + resultMatch[0].toString() // create child table name
//
//     // check if the child table has class name "show-tbl"
//     var check = $("#" + childClassName).hasClass("show_tbl")
//     //console.log(childClassName)
//
//     if(check){
//     // Open this row
//     $("#" + childClassName).removeClass("animation-hide-detail")
//     $("#" + childClassName).removeClass("show_tbl")
//     $("#" + childClassName).addClass("animation-show-detail")
//
//     }
//     else{
//     // Close this row
//     $("#" + childClassName).removeClass("animation-show-detail")
//     //$("#" + childClassName).addClass("animation-hide-detail")
//     $("#" + childClassName).addClass("show_tbl")
//     }
// });
