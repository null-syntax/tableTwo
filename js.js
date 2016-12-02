$(function(){

var options = {
  showRowId:true,
  addRow:true,
  removeRow:true,
  editCells:true,
  addColumn:false,
  rowClick:true,
  getJsonData:false,
  jsonurl:"",
  footerShowSubmitButton: false,
  showToggleButton:false,
  condensedDefaultColumns: ["*showAll"],
  showCondensedView: true,
  tableCaptionValue: "Simple Editable Table With Hideable Columns",
  createDefaultColumns:false,
  tableMaxSize:"",
  tableScrollable:false,
  addFooter:false,
  columnSettings:{"Date of Birth":"date","Contact Method":"contactTypes","Active":"check"},
  //onColumnAdd: function(){alert(JSON.stringify(this));},
  onRowAdd: function(){},
  onRowClick: function(){},
  onRowRemove: function(){},
  onRowRemove: function(){},
  onEditCell: function(){},
};

$(".simple-example").tableTwo(options);


var options = {
  showRowId:false,
  addRow:false,
  removeRow:false,
  editCells:false,
  addColumn:false,
  rowClick:true,
  getJsonData:false,
  jsonurl:"",
  footerShowSubmitButton: true,
  condensedDefaultColumns: ["*showAll"],
  showCondensedView: true,
  footerAddRowButton:true,
  tableCaptionValue: "Datasheets in a table? - click a row to Open!",
  createDefaultColumns:false,
  showColumnOptions:false,
  tableMaxSize:"",
  tableScrollable:true,
  addFooter:true,
  //onColumnAdd: function(){alert(JSON.stringify(this));},
  onRowAdd: function(){},
  onRowClick: function(){

$('.dataSheet-sheet').empty();
$('.dataSheet-sheet').append('<tbody></tbody>');

$('.dataSheet-sheet').tableTwo({
  createDefaultGrid:true,
  gridSize:"8x10",
  condensedDefaultColumns: ["*showAll"],
  showCondensedView: true,
})

$('#dataSheet-sheet').modal('toggle');

  },
  onRowRemove: function(){},
  onRowRemove: function(){},
  onEditCell: function(){},
};

$(".dataSheet-Menu").tableTwo(options);


var options = {
  showRowId:false,
  centerRowId:true,
  addRow:false,
  removeRow:false,
  editCells:false,
  addColumn:false,
  rowClick:true,
  getJsonData:false,
  jsonurl:"",
  footerShowSubmitButton: false,
  condensedDefaultColumns: ["*showAll"],
  showCondensedView: false,
  tableCaptionValue: "Dependencies",
  createDefaultColumns:false,
  tableMaxSize:"",
  tableScrollable:true,
  showColumnOptions:false,
  addFooter:false,
  //onColumnAdd: function(){alert(JSON.stringify(this));},
  onRowAdd: function(){},
  onRowClick: function(){},
  onRowRemove: function(){},
  onRowRemove: function(){},
  onEditCell: function(){},
};

$(".dependencies-table").tableTwo(options);


});
