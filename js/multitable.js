/*
    File: multitable.js
    GUI Assignment: Creating a Multiplication Table with JS - With Validation
    Ethan Rosenbaum, UML Computer Science, ethan_rosenbaum@student.uml.edu    
    
    Copyright (c) 2023 by Ethan. All Rights reserved. May be
    freely copied or excerpted for educational purposes with credit to the author.

    Header taken from HW assignment 1 example by Wenjin Zhou.
*/

/*
 *
 * Beginning of jquery form input validations
 * 
 */

// https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
$(function () {
    $("#multitable_form").validate({
        rules: {
            minimum_x_value: {
                required: true,
                range: [-50, 50],
                number: true
            },
            maximum_x_value:{
                required: true,
                range: [-50, 50],
                number: true
            },
            minimum_y_value:{
                required: true,
                range: [-50, 50],
                number: true
            },
            maximum_y_value:{
                required: true,
                range: [-50, 50],
                number: true
            }

        }, // End of 'rules'
        messages: {
            minimum_x_value: {
                required: "<br\>Please enter a minimum X (column) value",
                range: "<br\>Please enter a number between -50 and 50",
                number: "<br\>Please enter a number between -50 and 50"
            },
            maximum_x_value:{
                required: "<br\>Please enter a maximum X (column) value",
                range: "<br\>Please enter a number between -50 and 50",
                number: "<br\>Please enter a number between -50 and 50"
            },
            minimum_y_value:{
                required: "<br\>Please enter a minimum Y (row) value",
                range: "<br\>Please enter a number between -50 and 50",
                number: "<br\>Please enter a number between -50 and 50"
            },
            maximum_y_value:{
                required: "<br\>Please enter a maximum Y (row) value",
                range: "<br\>Please enter a number between -50 and 50",
                number: "<br\>Please enter a number between -50 and 50"
            }
        }, // End of 'messages'
        submitHandler: function(form) {
            return createTable();
        }
    });

});

/*
    createTable()
    
    Main driver function which is executed on form submission.
    This uses DOM methods to generate a table following validation of the form inputs.

    Params:
        None.

    Returns:
        false - prevents form resubmission. (See comment at return statements.)
*/
function createTable() {
    var statusMsg = "";

    var xmin  = Number(document.getElementById("xrangelow").value);
    var xmax  = Number(document.getElementById("xrangehi").value);
    var ymin  = Number(document.getElementById("yrangelow").value);
    var ymax  = Number(document.getElementById("yrangehi").value);    

    //
    // All good inputs
    //

    // Flip inputs if need be
    if (xmin > xmax) {
        var swap = xmin;
        xmin = xmax;
        xmax = swap;
        statusMsg += "<p>Swapped column minimum and maximum inputs.</p>";
    }

    if (ymin > ymax) {
        var swap = ymin;
        ymin = ymax;
        ymax = swap;
        statusMsg += "<p>Swapped row minimum and maximum inputs.</p>";
    }

    document.getElementById("status").innerHTML = statusMsg;

    //
    // Code heavily influenced by:
    // https://www.valentinog.com/blog/html-table/
    //

    // Get the div element which will hold the table then clear contents.
    var multitableDiv = document.getElementById("multitable");
    multitableDiv.innerHTML = "";
    
    // Create the new table element.
    var multitable = document.createElement('TABLE');

    // Create the first row - all table headers with X-MIN -> X-MAX values.
    var columnHeaders = multitable.insertRow();
    columnHeaders.appendChild(document.createElement("th"));

    for (let index = xmin; index <= xmax; index++) {
        let th = document.createElement("th");
        let thText = document.createTextNode(index);
        th.appendChild(thText);
        columnHeaders.appendChild(th);
    }

    // Create the rest of the table:
    // <th>Y-VAL</th><td></td><td></td><td></td> etc...
    for (let i = ymin; i <= ymax; i++) {
        let row = multitable.insertRow();

        // Create the header for the row
        let th = document.createElement("th");  
        let thText = document.createTextNode(i);
        th.appendChild(thText);
        row.appendChild(th);

        // Generate the multiples
        for (let j = xmin; j <= xmax; j++) {
            let cell = row.insertCell();
            let val  = document.createTextNode(i * j);
            cell.appendChild(val);
            
        }
    }

    // Put the table into the div.
    multitableDiv.appendChild(multitable);

    // See:
    //    https://stackoverflow.com/questions/21617060/content-disappears-immediately-after-form-submitted-and-function-runs
    return false
}

//
// Event handler for clicking the submit button - a little bit better than using the onsubmit attribute in the HTML.
//
// Calling 'valid' on the form prevents error text from remaining and further ensures a good form is submitted.
//
$(document).ready(function() {
    $("#generate-table").click(function(){
        if($("#multitable_form").valid()) {
            createTable();
        }
    }); 
});