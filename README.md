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
    02/11/2016

    added option 'enableColumnSettings' (bool) to enable non default column types.

    added ability to set column types for both json and static data.
    toggle data is not yet reported to the json send function and may be overwritten if you change the column types.

    added the above to the readme log.

    added mobile mobile view to development list

    created the change log.




    #currently in development
    date column types
    mobile view
    event bindings for functions
    font edit menu
    toggle button column types - completed - documented


    #current development cycle
    active




#options

TableTwo uses a number of default options all of which can be overloaded, these are listed below along with there default setting:

  addRow: true,
  addColumn: true,
  removeRow:true,
  showRowId:true,
  editCells:true,
  showColumnOptions:true,
  allowDropdown:true,
  editHeaders:true,
  showTableCaption: true,
  tableCaptionValue: "",
  submitTable:true,
  submitUrl:"",
  getJsonData:true,
  sendJsonUrl:"",
  jsonurl:"",
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
