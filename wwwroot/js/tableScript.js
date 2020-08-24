//var dataJson = {
//  "BaseChecks": [
//    {
//      "LayerChecks": {
//        "Result": "Fail",
//        "MissingLayers": "BASIS OF BEARING GPS TIES,BOUNDARY,CENTERLINES,EASEMENTS,LOT LINES,NORTH ARROW MISCELLANEOUS,RIGHT OF WAY"
//      }
//    }
//  ],
//  "Parcels": {},
//  "C3D_Labels": {
//    "Labels": [
//      {
//        "ParcelSegments": []
//      },
//      {
//        "Alignments": []
//      },
//      {
//        "FeatureLines": []
//      },
//      {
//        "Polylines": []
//      },
//      {
//        "Lines": []
//      },
//      {
//        "Arcs": []
//      }
//    ]
//  },
//  "Map_checkResults": [
//    {
//      "Final Map-1st page": [
//        {
//          "top_of_all_sheets": {
//            "tract_parcel_map_number": [],
//            "date_of_survey": [
//              {
//                "match_word": "DATE OF SURVEY: 10/26/2017",
//                "x": 1096.9148753383388,
//                "y": 744.64063490145622
//              }
//            ],
//            "surveyor_engineer_name_license": [
//              {
//                "match_word": "ALFRED J. THELWELL, LS 6999",
//                "x": 1194.2749713289168,
//                "y": 661.57546438273187
//              },
//              {
//                "match_word": "BALTAZAR MEJIA\r\nR.C.E. 50330",
//                "x": 1439.7195626198272,
//                "y": 406.41068281119283
//              },
//              {
//                "match_word": "COUNTY SURVEYOR\r\nL.S. 6617",
//                "x": 1438.977205185879,
//                "y": 114.68839464718826
//              }
//            ],
//            "total_area": [],
//            "number_of_lots_parcels": [
//              {
//                "match_word": "LOTS: 5",
//                "x": 1096.7585598409396,
//                "y": 759.86425267980508
//              },
//              {
//                "match_word": "LOTS 1",
//                "x": 1134.7699548148712,
//                "y": 608.21104125625993
//              }
//            ],
//            "sheet_numbers": [],
//            "tentative_pm/tr": []
//          }
//        },
//        {
//          "title_sheets": {
//            "legal_description_near_top_center": [
//              {
//                "match_word": " IN THE CITY OF COSTA MESA, COUNTY OF ORANGE, STATE OF CALIFORNIA",
//                "x": 1395.3809325440425,
//                "y": 728.37624715997867
//              }
//            ],
//            "owners_subdividers_certificate": [
//              {
//                "match_word": "OWNERSHIP CERTIFICATE",
//                "x": 1133.8591665630565,
//                "y": 615.79774766555624
//              }
//            ],
//            "surveyors_engineers_statement": [
//              {
//                "match_word": "SURVEYOR'S STATEMENT",
//                "x": 1440.0580129534546,
//                "y": 615.94672422789
//              },
//              {
//                "match_word": "ENGINEER'S STATEMENT",
//                "x": 1439.930184886497,
//                "y": 489.05280712522494
//              },
//              {
//                "match_word": "SURVEYOR'S STATEMENT",
//                "x": 1440.4864332060142,
//                "y": 164.02341774775982
//              }
//            ],
//            "county_surveyors_statement": [
//              {
//                "match_word": "COUNTY SURVEYOR'S STATEMENT",
//                "x": 1440.4864332060142,
//                "y": 164.02341774775982
//              }
//            ],
//            "signiture_omissions": [
//              {
//                "match_word": "SIGNATURE OMISSIONS",
//                "x": 1133.1881591544125,
//                "y": 238.76360622434936
//              }
//            ],
//            "scilicet_certificates": [],
//            //"first_check_tract": [
//              {
//                "match_word": "CITY CLERK'S CERTIFICATE",
//                "x": 1440.6576466997258,
//                "y": 369.44124444739123
//              }
//            ]
//          }
//        }
//      ]
//    }
//  ]
//}

$(document).ready(function() {
  /* Formatting function for row details - modify as you need */
  function format(subCheckObj, number) {
    //console.log(d[4])
      // `d` is the original data object for the row
      var subTableFormat = "<tr class='show_tbl' id='childTbl-"+ number.toString() + "'><td colspan=5><table class='child-sub-table' cellpadding='5' cellspacing='0' border='0' style='padding-left:50px;'>"

      $.each(subCheckObj, function(m, obj_five){
        //console.log(m)
        //console.log(obj_five)
        subTableFormat = subTableFormat + "<tr class='main-child-row'>"
        subTableFormat = subTableFormat + "<td>" + m + "</td>"
        $.each(obj_five, function(n, obj_six){
          //console.log(n)
          //console.log(obj_six)
          //subTableFormat = subTableFormat + "<td>" + n + "</td>"

          $.each(obj_six,function(p,obj_seven){
            //console.log(n)
            if(typeof obj_seven == 'string'){
              subTableFormat = subTableFormat + "<td>" + obj_seven + "</td>"
            }
          })
        })
        subTableFormat = subTableFormat + "</tr>"
      })

      subTableFormat = subTableFormat + "</table></td></tr>"

      return  subTableFormat
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
                  console.log("===============================")
                  console.log("MAIN CHECKS")
                  console.log(obj_three)
                  console.log("===============================")
                  //$("#dynamicTable").append("<tr>")

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
                      //$(".tr_mainCheck").append("<td>" + l + "</td>")
                  })
                  // tableBody = tableBody + "</tr>"
                  // tableBody = tableBody + "</tr>"
              })
              $("#dynamicTable").append(tableBody)
          })
      })
  }

    //var table = $('#example').DataTable();

  // Add event listener for opening and closing details
  $('#example tbody').on('click', 'td.details-controls', function () {
      //var tr = $(this).closest('tr');
      var patt = /\d+/i;
      var idParentName = $(this).attr('id')
      var resultMatch = idParentName.match(patt); // returns an Array (object)
      var childClassName = "childTbl-" + resultMatch[0].toString() // create child table name

      // check if the child table has class name "show-tbl"
      var check = $("#" + childClassName).hasClass("show_tbl")
      //console.log(childClassName)

      if(check){
      // Open this row
      $("#" + childClassName).removeClass("animation-hide-detail")
      $("#" + childClassName).removeClass("show_tbl")
      $("#" + childClassName).addClass("animation-show-detail")

      }
      else{
      // Close this row
      $("#" + childClassName).removeClass("animation-show-detail")
      //$("#" + childClassName).addClass("animation-hide-detail")
      $("#" + childClassName).addClass("show_tbl")
      }
  });
});
