# tableTwo

TableTwo is a Bootstrap compatible jQuery plugin that easily turns any html table into a responsive editable environment.

For tableTwo elements to render the following two files must be included:

tableTwo.js
tableTwo.css

Tables can then be initiated using jQuery selectors as shown below:

    $('#elementToTableify').tableTwo();
    $('.elementsToTableify').tableTwo();

tableTwo JSON works best using the following html table format:

  <div class="table-responsive">
   <table class="table table-condensed">
       <tbody>
     </tbody></table>
  </div>

if using static data tableTwo is farely forgiving with html formatting.

    #latest update:
    01/11/2016
    pre-release update, all functions work as expected but documentation is being added.

    #changes
    added readme file, amended json send function.

    #currently in development
    event bindings for functions
    font edit menu
    radio button column types
    date column types

    #current development cycle
    active




#options

TableTwo uses a number of default options all of which can be overloaded, these are listed below along with there default setting:

    addRow: true,
    addColumn: true,
    removeRow:true,
    showRowId:false,
    editCells:true,
    showColumnOptions:true,
    allowDropdown:true,
    editHeaders:true,
    background: "white",
    showTableCaption: true,
    tableCaptionValue: "",
    submitTable:false,
    submitUrl:"",
    getJsonData:false,
    jsonurl:"",

    To orderload these options use the following format:

    $('#elementToTableify').tableTwo({addColumn:false);    


#JSON

  One of tableTwo's main features is the ability to receive json data. This can be done by setting the options variable 'options.getJsonData' to true and
  passing a url to the variable 'options.jsonurl'.

  Currently the tableTwo plugin automatically parses headers for individual columns and expects to recieve a standard json array containing objects.
