# tableTwo

TableTwo is a Bootstrap compatible jQuery plugin that easily turns any html table into a responsive editable environment.

For tableTwo elements to render the following two files must be included:

  tableTwo.js
  tableTwo.css

Tables can then be initiated using jQuery selectors as shown below:

    $('#elementToTableify').tableTwo();
    $('.elementsToTableify').tableTwo();

Some elements of tableTwo (such as the toggle buttons and column options menu) also use font awesome icons which can be found here:

    http://fontawesome.io

tableTwo JSON works best using the following html table format:

```html
  <div class="table-responsive">
   <table class="table table-condensed">
       <tbody>
     </tbody></table>
  </div>
  ```

if using static data tableTwo is farely forgiving with html formatting.

    #latest update:
    03/11/2016
    pre-release update, all functions work as expected but more are being added.
    Please see the development list in the readme for more information.

    added option 'mobileCondensedView' (bool) to condense view for mobile devices.
    added option array 'mobileDefaultColumns', these columns will remain by default in mobile view.
    added popover menu to hide/show columns.

    added the above to the readme log.



    #currently in development
    date column types
    mobile view - started and added (basic)
    event bindings for functions
    font edit menu
    toggle button column types - completed - documented


    #current development cycle
    active




#options

TableTwo uses a number of default options all of which can be overloaded, these are listed below along with there default setting:

addColumn: true,
addRow: true,
removeRow:true,
showRowId:true,
editCells:true,
showColumnOptions:true,
allowDropdown:true,
editHeaders:true,
showTableCaption: true,
tableCaptionValue: "",
submitTable:false,
submitUrl:"",
getJsonData:false,
sendJsonUrl:"",
jsonurl:"",
mobileCondensedView: true,
//mobileDefaultColumns: [],
    enableColumnSettings: true,
    columnSettings:{"title":"status","budget":"star","project":"switch"},


    columnTypes:{
      //text example
      text:{
        id:1,
        title: "text",
        type: "text",
        value: ""
      },
      // //select examples
      // select:{
      //   id:2,
      //   title:"select",
      //   type: "select",
      //   values: [ '']
      // },
      status:{
        id:3,
        title:"status",
        type:"select",
        values: [ 'created','started','done']
      },
      //toggle examples
      star:{
        id:4,
        title:"star",
        type:"toggle",
        on:"fa fa-star-o",
        off:"fa fa-star"
      },
      check:{
        id:5,
        title:"done",
        type:"toggle",
        on: "fa fa-check",
        off: "fa fa-times"
      },
      switch:{
        id:6,
        title:"switch",
        type:"toggle",
        on: "fa fa-toggle-on",
        off: "fa fa-toggle-off"
      }
    }

To orderload these options use the following format:

    $('#elementToTableify').tableTwo({addColumn:false);    


#JSON

One of tableTwo's main features is the ability to receive json data. This can be done by setting the options variable 'options.getJsonData' to true and
passing a url to the variable 'options.jsonurl'.

Currently the tableTwo plugin automatically parses headers for individual columns and expects to recieve a standard json array containing objects.

#mobileCondensedView

tableTwo supports hiding of some columns based screensize. This can be achieved by setting the value 'mobileCondensedView' to true.

When this is applied a popover menu will be added to the top corner of the table allowing users to hide or show columns when required.

some columns can be set to auto remain when loading data on a mobile device. This is done using the option 'mobileDefaultColumns'.

column headers should be passed to this array in the format:

    mobileDefaultColumns: ["example1","example2"],


#columnTypes

tableTwo supports the use of custom column types within your tables including:

    text (input)
    select (dropdown)
    toggle (switch/button)

default behavoir for editable cells is set to text.

To set a columns type you must first make sure that column type exists. Some example column types are shown below:

columnTypes:{
  //text example
  text:{ -- unique key (column type name)
    id:1, -- must be unique
    title: "text", -- descriptor
    type: "text", -- key
    value: "" -- value
  },
  //select example
   select:{ -- unique key (column type name)
     id:2, -- must be unique
     title:"select", -- descriptor
     type: "select", -- key
     values: [''] -- values
   },
  status:{
    id:3, -- must be unique
    title:"status", -- descriptor
    type:"select", -- key
    values: [ 'created','started','done'] -- values
  },
  //toggle example
  star:{
    id:4, -- must be unique
    title:"star", -- descriptor
    type:"toggle", -- key
    on:"fa fa-star-o", -- value (font fa class)
    off:"fa fa-star" -- value (font fa class)
  },
  //toggle example
  check:{
    id:5, -- must be unique
    title:"done", -- descriptor
    type:"toggle", -- key
    on: "fa fa-check", -- value (font fa class)
    off: "fa fa-times"--  value (font fa class)
  },
  //toggle example
  switch:{
    id:6,
    title:"switch",
    type:"toggle",
    on: "fa fa-toggle-on",
    off: "fa fa-toggle-off"
  }
}


When loading data use the following code to match column types to headers:

  columnSettings:{"header 1":"column type name","header 2":"column type name","header 3":"column type name"},

For example (using the data above):

  columnSettings:{"title":"status","budget":"star","project":"switch"},
