   $.fn.tableTwo = function(options) {

       // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var opts = $.extend( {}, $.fn.tableTwo.defaults, options );

    var base = this;
    $(this).data("tableTwo", opts);

    opts = $(this).data("tableTwo");

    if (opts.getJsonData){
      buildDataTable(this);

    }else{
      if (opts.createDefaultColumns){
        createStaticDefaultColumns(this);
      }
      loadOptions(this);
    }


 function loadOptions(element){

   if (opts.addColumn){
       createAddColumn(element);
   }

   if (opts.addRow){
        createAddRow(element);
   }

   if(opts.removeRow){
     createRemoveRow(element);
   }

   if (opts.showRowId){
       createRowId(element);
   }

   if (opts.editCells){
       bindEditCells(element);
   }else{
     if (opts.rowClick){
       bindRowClick(element);
     }
   }

   if (opts.editHeaders){
       bindEditHeaders(element);
   }

   if (opts.showColumnOptions){
       createColumnOptions(element);
   }

   if (opts.showTableCaption){
     createTableCaption(element);
   }

   if (opts.showSubmitButton){
     createSubmitTable(element);
   }



   if (opts.showCondensedView){
     applyCondensedView(element);
   }else if (opts.mobileCondensedView){

     if($(window).width() <=360){
     applyCondensedView(element);
   }else{
     removeCondensedView(element);
   }


   $(window).resize(function(){
     if($(window).width() <=360){
       applyCondensedView(element);
     }else{
       removeCondensedView(element);
     }
   });
  }

  if (opts.addFooter){
    addFooter(element);
  }

  if (opts.tableScrollable){
    addTableScrollable(element);
  }

 }

function addTableScrollable(element){
  if (opts.tableMaxSize){
    //$(element).closest("table-container").css("max-height", opts.tableMaxSize);
    $(element).children("tbody").addClass("tbody-scrollable");
    $(element).children(".tbody-scrollable").css("max-height", opts.tableMaxSize);


  }

  $(element).find("tr").each(function(i,item){
$(item).addClass("row-scrollable");
  });


}

function bindRowClick(element){

  $(element).on("click", "td", function(){

    if (!$(this).closest("tr").hasClass("add-row")){

      position = $(this).index() - $(this.active).index();
      row = $(this).closest("tr").index();

      if (!$(element, "tr:first").find("th:nth-child(" + position + ")").hasClass("toggle")){
      if (position == 1 && opts.showRowId == true ){
      }else{
      size = $(this).closest("tr").find("td").length;
      if (position == size && opts.addColumn == true ){
      }else{
        data = {"row":row}
        rowData = [];

        $(this).closest("tr").find("td").each(function(i,item){

          totalColumns = $("tr:first", element).find("th").length - 1;

          if(i==0 && opts.showRowId){

          }else if(i == totalColumns && opts.addColumn){

          }else if(i == totalColumns && opts.removeRow){

          }else{
            rowData[i] = $(item).text();
          }

        });
        data["rowData"] = rowData;

           opts.onRowClick.call(data);

     }

    }
    }
    }
  });

}

function addFooter(element){

  if (!$(element).closest("div").hasClass("table-container")){
      html = '<div class="table-container"></div>';
      $(element).wrap(html);
    }

    $(element).closest(".table-container").find(".table-footer").remove();

    html = '<div class="table-footer"></div>';

    $(element).closest(".table-container").append(html);

    html = '<div class="input-group footer-left">';

    if (opts.footerAddRowButton){

      $(element).find(".footer-add-row-open").closest(".dropup").remove();

      html += '<div class="dropup" style="">'
      html += '<button class="btn btn-primary footer-add-row-open" data-toggle="dropdown">Add';
      html += '<span class="caret" style="display:none;"></span>';
      html += '</button>';
      html += '<ul class="dropdown-menu footer-add-row-dropdown" style="padding-left:0.5pc;padding-right:0.5pc;"">';
      html += '</ul>';
      html += '</div>';

      $(element).closest(".table-responsive").css("overflow","visible");

    }

    html += '</div>';

    $(element).closest(".table-container").find(".table-footer").append(html);

    $('.footer-add-row-open').on("click", function(){

      totalColumns = $("tr:first", element).find("th").length - 1;

      $(this).closest("div").find(".dropdown-menu").empty();
        html = '<li class="footer-add-row-dropdown-header"><label>Add Row</label></li>';
        html += '<li class="divider"></li>';
        html += '<li>'
        html += '<table class="add-row-dropdown-table">';
        html += '<tbody>';

      $(this).closest(".table-container").find("tr:first").find("th").each(function(i,item){

        if (i == 0 && opts.showRowId){

        }else if (i == totalColumns && opts.addColumn){
        }else if (i == totalColumns && opts.removeRow){
        }else{
          html += '<tr>';
          html += '<td><label>' + $(item).text() + '</label></td>';
          html += '<td>';
          html += '<div class="form-group">';
          html += '<input class="form-control" value=""></input>';
          html += '</div>';
          html += '</div>';
          html += '</td>';
          html += '</tr>';
        }
      });

      html += '</tbody>';
      html += '</table>';
      html += '<div class="form-group">';
      html += '<div class="input-group">';
      html += '<div class="input-group-btn">';
      html += '<button class="btn btn-primary footer-addRow">Save</button>';
      html += '</div>';
      html += '<div class="input-group-btn">';
      html += '<button class="btn btn-success">Cancel</button>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</li>';
      html += '<li></li>';

      $(this).closest("div").find(".dropdown-menu").prepend(html);

    });

    if (opts.footerAddRowButton){
      $("body").on("click",".footer-addRow", function(event){
        event.stopImmediatePropagation();

        base = $(this).closest(".table-container").find("table:nth-child(1)").data("tableTwo");
        rowData = [];
        html = '<tr>';
        if (base.showRowId){
          html += '<td></td>';
        }
        $(this).closest(".footer-add-row-dropdown").find("tr").each(function(i,item){

            val = $(item).find("td:nth-child(2)").find("input").val();
            html += '<td>' + val + '</td>';
            rowData[i] = val;
        });

        if (base.addColumn || base.addRow || base.removeRow){
          html += '<td></td>';
        }

        html  += '</tr>';

        $(this).closest(".table-container").find("table:first").find("tr:last").after(html);

        if (base.removeRow){
          html = '<button type="button" class="btn btn-block btn-danger removeRow">X</button>';
          if (base.addRow){
          $(element).find("tr:last").prev("tr").find("td:last").html(html);
        }else{
          $(element).find("tr:last").find("td:last").html(html);
        }
        }

        if(base.removeRow){
          createRemoveRow($(this).closest(".table-container").find("table:first"));
        }

        if (base.showRowId){
          createRowId($(this).closest(".table-container").find("table:first"));
        }

        base.onRowAdd.call(rowData);

        if (base.sendOnChange){
          sendData($(this).closest(".table-container").find("table:first"));
        }


      });
    }

  }




 function removeCondensedView(element){
   $(element).find("th").removeClass("condensed-hidden");
   $(element).find("td").removeClass("condensed-hidden");

    $(element).find(".column-manager").remove();
 }

 function applyCondensedView(element){

  $.extend(opts.defaultColumnTypes,opts.columnTypes);

   totalColumns = $("tr:first", element).find("th").length - 1;

   $("tr:first", element).find("th").each(function(i,header){

     if (i == 0 && opts.showRowId){
     }else if (i == totalColumns && opts.addColumn){
     }else if (i == totalColumns && opts.removeRow){
     }else{
     removeFlag = true;
     $.each(opts.condensedDefaultColumns,function(ii,value){
       if (value == "*showAll"){
         removeFlag = false;
       }else if(value == $(header).text()){
         removeFlag = false;
       }
     });


       if (removeFlag){
         $(element).find("tr").find("th:nth-child(" + (i + 1) + ")").addClass("condensed-hidden");
         $(element).find("tr").find("td:nth-child(" + (i + 1) + ")").addClass("condensed-hidden");
       }


   }

   });

   var content = '<div class="form-group column-manager-container">';
      content += '<label>Columns</label>';
      content += '<ul class="list-group check-list-box">';


      $("tr:first", element).find("th").each(function(i,item){

        totalColumns = $("tr:first", element).find("th").length - 1;

        if(i == 0 && opts.showRowId){

        }else if (i == totalColumns && opts.addColumn){

        }else{

        if ($(this).hasClass("condensed-hidden")){
          content += '<li class="list-group-item"><label><input type="checkbox" class="condensedViewtoggle" value=""> ' + $(this).text() + '</label></li>';
        }else{
          content += '<li class="list-group-item"><label><input type="checkbox" class="condensedViewtoggle" checked> ' + $(this).text() + '</label></li>';
        }
      }

      });

      content += '</ul>';

      content += '</div>';


      if ($(element).find("caption").find(".column-manager").length >= 1){

      }else{

      var html = "<span class='pull-right column-manager'>";
       html += "<a class='column-manager-popover' data-toggle='popover title=Column Settings' data-html='true' data-placement='left' data-content='" + content + "'>";
       html += "<i class='fa fa-list'></i></a>";
       html += "</span>";



      if (opts.showTableCaption){

           $("caption", element).append(html);
           $(".column-manager-popover").popover();
         }else{

           $(element).append("<caption></caption>");
           $("caption", element).append(html);
           $(".column-manager-popover").popover()
         }
      }


    $(element).on("click", ".condensedViewtoggle", function(){

      val = $(this).closest("input").is(':checked');
      text = $(this).closest("label").text().trim();


      $("tr:first", element).find("th").each(function(i,column){
        if ($(column).text() == text){

          if (val == true){

          $("tr", element).find("th:nth-child(" + (i + 1) + ")").removeClass("condensed-hidden");
          $("tr", element).find("td:nth-child(" + (i + 1) + ")").removeClass("condensed-hidden");
        }else{
          $("tr", element).find("th:nth-child(" + (i + 1) + ")").addClass("condensed-hidden");
          $("tr", element).find("td:nth-child(" + (i + 1) + ")").addClass("condensed-hidden");
        }
        }

      });


    });

 }


 function sendJsonData(url,data){

   return new Promise (function(resolve){

     json = JSON.stringify(data);

    array = new Array();

    id = opts.sendJsonPOSTid;

    var ajax =  $.ajax({
  url: url,
  type: 'post',
    headers: {
        },
        dataType: 'json',
            data: {
              id: id,
              data:json,

          }
          });

    ajax.done(function(data){

            resolve();


            });
        });


    }

    function sendData(element){

      var data = [];
        $(element).find("tr").each(function(i,row){
          totalRows = $(element).find("tr").length - 1;
          totalColumns = $(element).find("tr:first").find("th").length - 1;
          if (i == totalRows && opts.addRow){

          }else{
            rowData = {};
            $(row).find("td").each(function(ii,cell){
            if (ii == totalColumns && opts.addColumn){
            }else if (ii == totalColumns && opts.removeRow){
            }else{
              if (ii == 0 && opts.showRowId){

              }else{
                header = $(element).find("tr:first").find("th:nth-child(" + (ii + 1) + ")").text();
                if ($(element).find("tr:first").find("th:nth-child(" + (ii + 1) + ")").hasClass("toggle")){
                  if ($(cell).find("button").hasClass("toggle-on")){
                  value = true;
                }else{
                  value = false;
                }
                }else{
                value = $(cell).text();
                  }
                rowData[header] = value;
                }
              }
          });

          data[i - 1] = rowData;
        }
        });
sendJsonData(opts.sendJsonUrl,data);

    }

  function createSubmitTable(element){

    html = '<div class="table-container"></div>';

    $(element).wrap(html);

    html = '<div class="input-group pull-right submit-button">';
    html += '<button class="btn btn-primary tableSubmit" style="" >Submit</button>';
    html += '</div>';
    html += '</div>';

    $(".submit-container").append(html);



    $(".table-container").on("click", ".tableSubmit", function(){
      sendData(element);
    });


  }

  function createRemoveRow(element){

    if (!opts.addColumn){
      if (!opts.addRow){

        if ($("tr:first", element).find("th:last").hasClass("remove-row-header")){
          $("tr",element).find("th:last").remove();
          $("tr",element).find("td:last").remove();
        }

        html = '<th class="remove-row-header"></th>';
        $("tr:first", element).find("th:last").after(html);

        html = '<td>';
        html += '<button type="button" class="btn btn block btn-danger removeRow" style="width:100%;"> X </button>';
        html += '</td>'

        $(element).find("tr").each(function(i,item){
          $(item).find("td:last").after(html);
        });
      }else{
        $("tr:first", element).find("th:last").addClass("remove-row-header");

        totalRows = $(element).find("tr").length - 1;

        $(element).find("tr").each(function(i,item){

          if (i != 0){
            if (i == totalRows && opts.addRow){
            }else{

              html = '<td>';
              html += '<button type="button" class="btn btn block btn-danger removeRow" style="width:100%;"> X </button>';
              html += '</td>';
              $(item).find("td:last").after(html);

            }
          }
        });
      }
    }else{
      $("tr:first", element).find("th:last").addClass("remove-row-header");

      totalRows = $(element).find("tr").length - 1;

      $(element).find("tr").each(function(i,item){

        if (i != 0){
          if (i == totalRows && opts.addRow){
          }else{

            html = '<button type="button" class="btn btn block btn-danger removeRow" style="width:100%;"> X </button>';
            $(item).find("td:last").html(html);

          }
        }
      });

    }

    $(element).on("click", ".removeRow", function(){

      id = $(this).closest("tr").index();

      $(this).closest("tr").remove();
      if (opts.showRowId){
        createRowId(element);
      }
      opts.onRowRemove.call(id);

      if (opts.sendOnChange){
        sendData(element);
      }

    });

  }

function createStaticDefaultColumns(element){
  if (opts.createDefaultGrid){
    xy = opts.gridSize.split('x');
    headers = '<tr>';
    for (i = 0; i < xy[0]; i++ ){
      headers += '<th>' + (i + 1) + '</th>';
    }
    headers += '</tr>';

    $("tbody", element).append(headers);

    cells = '';
    for (i = 0;i < xy[1]; i++){
      cells += '<tr>';
      for (ii = 0; ii < xy[0]; ii++ ){
        cells += '<td></td>';
      }
      cells += '</tr>';
    }

    $("tr:last", element).after(cells);


  }else{
  headers = '<tr>';

  $.each(opts.defaultColumns,function(k,v){

    headers += '<th>' + v + '</th>';

  });

  headers += '</tr>';

  $("tbody", element).append(headers);
  }
}

   function buildDataTable(element){
     getJsonData(opts.jsonurl).then(function(res){

       if (jQuery.isEmptyObject(res)){
         if (opts.createDefaultColumns){
           headers = '<tr>';
           //cells = '<tr>';

           $.each(opts.defaultColumns,function(k,v){

             if (opts.enableCustomColumnTypes){

               $.extend(opts.defaultColumnTypes,opts.columnTypes);

             columnMatch = false;
             $.each(opts.columnSettings, function(key,item){
               if (key == v ){

             columnMatch = true;

                 if (opts.defaultColumnTypes[item].type == "toggle"){

                   vv = '<button class="btn btn-primary toggleButton toggle-off"><i class="' + opts.defaultColumnTypes[item].off + '"></i></button>';
                   nn = '<input type="hidden" class="toggleId" value="' + opts.defaultColumnTypes[item].id + '">';
                   headers += '<th class="toggle">' + nn  + '</th>';

                 }else if (opts.defaultColumnTypes[item].type == "select"){

                   nn = '<input type="hidden" class="selectId" value="' + opts.defaultColumnTypes[item].id + '">';
                   headers += '<th class="select">' + v  + nn + '</th>';

                 }else if (opts.defaultColumnTypes[item].type == "date"){

                   headers += '<th class="date">' + v  + nn + '</th>';


                 }


                 }

               });
               if (columnMatch == false){
                 headers += '<th>' + v  + '</th>';

               }
             }else{
             headers += '<th>' + v + '</th>';
              }
             //cells += '<td></td>';
           });


         headers += '</tr>';
         //cells += '</tr>';

         $(element).find("tbody").append(headers);
                loadOptions(element);
        }else if (opts.createDefaultGrid){
          createStaticDefaultColumns(element);
          loadOptions(element);
        }
      }else{

       $.each(res,function(i,item){

         headers = '<tr>';
         cells = '<tr>';

          $.each(item,function(n,v){
            $.each(v, function(nn,vv){

              if (opts.enableCustomColumnTypes){

              $.extend(opts.defaultColumnTypes,opts.columnTypes);

              columnMatch = false;
              $.each(opts.columnSettings, function(key,item){
                if (key == nn ){
              columnMatch = true;
                  if (opts.defaultColumnTypes[item].type == "toggle"){

                    vv = '<button class="btn btn-primary toggleButton toggle-off"><i class="' + opts.defaultColumnTypes[item].off + '"></i></button>';

                    nn += '<input type="hidden" class="toggleId" value="' + opts.defaultColumnTypes[item].id + '">';

                    headers += '<th class="toggle">' + nn  + '</th>';


                    cells += '<td>' + vv + '</td>';

                  }else if (opts.defaultColumnTypes[item].type == "select"){

                    nn += '<input type="hidden" class="selectId" value="' + opts.defaultColumnTypes[item].id + '">';

                    headers += '<th class="select">' + nn  + '</th>';

                    cells += '<td>' + vv + '</td>';

                  }else if (opts.defaultColumnTypes[item].type == "date"){

                    headers += '<th class="date">' + nn  + '</th>';

                    cells += '<td>' + vv + '</td>';

                  }


                  }

                });
                if (columnMatch == false){
                  headers += '<th>' + nn  + '</th>';

                  cells += '<td>' + vv + '</td>';

                }
              }else{

                headers += '<th>' + nn  + '</th>';

                cells += '<td>' + vv + '</td>';
              }

            });

            });



          cells += '</tr>';
          $(element).find("tbody").append(cells);



       });

       headers += '</tr>';
       $(element).find("tbody").prepend(headers);

       loadOptions(element);
     }
     });



   }

   function createTableCaption(element){

     if ($(element).find(".caption").length >= 1){
       $(element).find(".caption").remove();
     }

     if (opts.tableCaptionValue != ""){
       html = '<caption class="caption">' + opts.tableCaptionValue + '</caption>';
     }else{
       html = '<caption class="caption">' + opts.jsonurl + '</caption>';
     }
       $(element).prepend(html)
   }

   function getJsonData(url){

     return new Promise (function(resolve){


      array = new Array();

      var ajax =  $.ajax({
  	url: url,
  	type: 'post',
      headers: {
          },
  		    dataType: 'json',
              data: opts.getJsonPOSTData,
            });

      ajax.done(function(data){
    if (typeof(data)== 'object'){
  $.each(data,function(i, item){
      var obj = {item};
      array.push(obj);
  });
}else{
  array[0] = data;
}
              resolve(array);


              });
          });


      }

   function createColumnOptions(element){

           $("tr:first", element).find("th").each(function(i,item){


               $.extend(opts.defaultColumnTypes,opts.columnTypes);


               dupcheck = $(item).find(".column-settings-popover").length;
               if (dupcheck == 0){
               if (i == 0 && opts.showRowId == true){
                    }else{
                        size = $(this).closest("tr").find("th").length;
                        if (i == size - 1 && opts.addColumn == true){
                    }else if(i == size - 1 && opts.removeRow == true){

                    }else{

               var content = '<div class="form-group column-settings-container">';
               content += '<label>Title</label>';
               content += '<input type="text" class="form-control column-settings-title" value="' + $(item).text() + '"/>';

               content += '<div class="form-group">'

               content += '<label>Formatting:</label>';

               content += '<div class="input-group input-group-sm formatting-buttons">'

               content += '<span class="input-group-btn">';
               content += '<button class="btn btn-default align-left"><i class="fa fa-align-left"></i></button>';
               content += '<button class="btn btn-default align-center"><i class="fa fa-align-center"></i></button>';
               content += '<button class="btn btn-default align-right"><i class="fa fa-align-right"></i></button>';
               content += '</span>';

               content += '<span class="input-group-btn">';
               content += '<button class="btn btn-default bold"><i class="fa fa-bold"></i></button>';
               content += '<button class="btn btn-default italic"><i class="fa fa-italic"></i></button>';
               content += '<button class="btn btn-default font"><i class="fa fa-font"></i></button>';
               content += '</span>';


               content += '</div>';


               content += '<label>Type</label>';
               content += '<select class="form-control column-settings-type" >';

              $.each(opts.defaultColumnTypes, function(i,item){
                content += '<option value="' + item.id + '">' + item.title + '</option>';
                })

               content += '</select><hr>';
               // content += '<span class="form-group">';
               // content += '<span class="form-group header-settings-type">';
               // content += '<label>Options</label>';
               // content += '<span class="input-group">'
               // content += '<select class="form-control header-settings-options" >';
               // content += '</select>';
               // content += '<span class="input-group-btn">';
               // content += '<button class="btn btn-primary header-settings-options-manage">Manage</button>';
               // content += '</span>';
               // content += '</span>';
               // content += '</span>';
               // content += '<label>Default</label>';
               // content += '<input type="text" class="form-control header-settings-default" />';
               // content += '</span>';
               content += '<button type="button" class="btn btn-block btn-success save" style="">Save</button>';
               content += '<button type="button" class="btn btn-block btn-default cancel " style="">Close</button>';
               content += '</div>';

           var html = "<span class='pull-right column-settings'>";
               html += '<input type="hidden" class="columnId" value="' + i + '">';
               html += "<a class='column-settings-popover' data-toggle='popover title=Column Settings' data-html='true' data-placement='left' data-content='" + content + "'>";
               html += "<i class='fa fa-cog'></i></a>";
               html += "</span>";


                   $(item).prepend(html);
                    }

               }
               }
           });

           $('.column-settings-popover', element).popover();

           $(element, ".formatting-buttons").on("click", "button", function(){

                id = parseInt($(this).closest("th").find(".columnId").val()) + 1;

                if ($(this).hasClass("align-left")){

                        $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-right");
                        $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-center");

                        $(element, "tr").find("td:nth-child(" + id + ")").addClass("text-left");

                    }

                if ($(this).hasClass("align-center")){

                        $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-right");
                        $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-left");

                        $(element, "tr").find("td:nth-child(" + id + ")").addClass("text-center");

                    }

                if ($(this).hasClass("align-right")){

                        $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-left");
                        $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-center");

                        $(element, "tr").find("td:nth-child(" + id + ")").addClass("text-right");

                    }

                if ($(this).hasClass("bold")){

                        if (!$(element, "tr").find("td:nth-child(" + id + ")").hasClass("text-bold")){

                            $(element, "tr").find("td:nth-child(" + id + ")").addClass("text-bold");

                        }else{

                            $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-bold");

                        }

                    }

                if ($(this).hasClass("italic")){

                        if (!$(element, "tr").find("td:nth-child(" + id + ")").hasClass("text-italic")){

                            $(element, "tr").find("td:nth-child(" + id + ")").addClass("text-italic");

                        }else{

                            $(element, "tr").find("td:nth-child(" + id + ")").removeClass("text-italic");

                        }

                    }


           });

           $("tr", element).on("keydown", ".column-settings-title", function(e){
                       if (e.which == 13){

              columnId = parseInt($(this).closest("th").find(".columnId").val()) + 1;

              value = $(this).val();

              $("tr:first", element).find("th:nth-child(" + columnId + ")").text(value);

              createColumnOptions(element);

              if (opts.sendOnChange){
                sendData(element);
              }

                       }
           });

           $("th", element).on("change", ".column-settings-type", function(){

              columnId = parseInt($(this).closest("th").find(".columnId").val()) + 1;

              typeId = $(this).find(":selected").val();

               $.extend(opts.defaultColumnTypes,opts.columnTypes);

              $.each(opts.defaultColumnTypes,function(i,item){

                  if (item.id == typeId){
                      $(element, "tr:first").find("th:nth-child(" + columnId + ")").each(function(i,itemm){

                            if (item.type == "date"){
                                $(this).removeClass();
                                $(this).remove('.toggleId');
                                $(this).remove('.selectId');
                                $(this).addClass(item.type);

                            } else if (item.type == "select"){
                                $(this).removeClass();
                                $(this).remove('.toggleId');
                                $(this).addClass(item.type);

                              if ($(this).find(".selectId").length){
                                  $(this).find(".selectId").val(item.id);
                              }else{

                                  html = '<input type="hidden" class="selectId" value="' + item.id + '">';
                                  $(this).append(html);

                                }
                            }else if (item.type == "toggle"){
                              $(this).removeClass();
                              $(this).remove('.selectId');
                              $(this).addClass(item.type);

                              if ($(this).find(".toggleId").length){
                                  $(this).find(".toggleId").val(item.id);
                              }else{

                                  html = '<input type="hidden" class="toggleId" value="' + item.id + '">';
                                  $(this).append(html);

                                }


                              html = '<button class="btn btn-primary toggleButton toggle-off"><i  class="' + item.off + '"></i></button>';

                              $(element, "tr:first").find("td:nth-child(" + columnId + ")").html(html);


                            }

                            if (item.type == "text"){
                              $(this).removeClass();
                              $(this).addClass(item.type);
                              $(this).remove('.selectId');



                            }
                            if (opts.addRow){
                                createAddRow(element);
                            }

                    });

                  }
              });


           });

           $(element, "th").on("click", ".cancel", function(){
             $(this).closest("th").find(".column-settings-popover").popover('hide');
           });

   }

   function bindEditHeaders(element){


       $(".editing-header", element).on("click", "button", function(event){

            value = $(this).closest("div").find("input").val();
            cell = $(this).closest("div").closest("th");

            cell.html(value);
            cell.removeClass("editing-header");
            event.stopPropagation();

       });

       $(element).on("click", "th", function(){

           if ($(this).hasClass("editing-header") == false){

               $(this).addClass("editing-header");

           position = $(this).index() - $(this.active).index();


           if (position == 1 && opts.showRowId == true ){
           }else{
           size = $(this).closest("tr").find("td").length;
            if (opts.showColumnOptions == false){
                if (position == size && opts.addColumn == true){
                    }else{

                    value = $(this).html();

                    html = '<div class="input-group">';
                    html += '<input type="text" class="form-control" value="' + value + '"/>';
                    html += '<span class="input-group-btn">';
                    html += '<button class="btn btn-primary">+</button>';
                    html += '</span>';
                    html += '</div>';

                    $(this).html(html);
                    }
                }
           }
           }
       });



       $("th", element).on("keydown", "input", function(event){
           if (event.which == 13){


            value = $(this).val();

            $(this).closest("td").removeClass("editing-header");
            $(this).closest("td").html(value);

           }
       });


   }


   function bindEditCells(element){
      $.extend(opts.defaultColumnTypes, opts.columnTypes);

       $(element).on("click", "td", function(){

         if (!$(this).closest("tr").hasClass("add-row")){

           if ($(this).hasClass("editing") == false){

               $(this).addClass("editing");

           position = $(this).index() - $(this.active).index();

           if (!$(element, "tr:first").find("th:nth-child(" + position + ")").hasClass("toggle")){
           if (position == 1 && opts.showRowId == true ){
           }else{
           size = $(this).closest("tr").find("td").length;
           if (position == size && opts.addColumn == true ){
           }else{

            value = $(this).html();

            html = '<div class="input-group">';

            if ($("tr:first", element).find("th:nth-child(" + (position) + ")").hasClass("select")){

              id = $("tr:first", element).find("th:nth-child(" + position + ")").find(".selectId").val();
              html += '<select class="form-control" value="' + value + '">';
              html += '<option>' + value + '</option>';

              $.each(opts.defaultColumnTypes, function(i,item){
                if (item.id == id){
                $.each(item.values,function(ii,iitem){
                    html += '<option>' + iitem + '</option>';
                });
              }
              });

              html += '</select>';
              html += '<span class="input-group-btn">';
              html += '<button class="btn btn-primary confirm">+</button>';
              html += '</span>';
              html += '</div>';

            }else if ($("tr:first", element).find("th:nth-child(" + position + ")").hasClass("date")){
                html += '<div class="input-group date" data-provide="datepicker">'
                html += '<input type="text" class="form-control">';
                html += '<div class="input-group-btn">';
                html += '<button class="btn btn-primary confirm">+</button>';
                html += '</div>';
                html += '</div>';
            }else{
              html += '<input type="text" class="form-control" value="' + value + '"/>';
              html += '<span class="input-group-btn">';
              html += '<button class="btn btn-primary confirm">+</button>';
              html += '</span>';
              html += '</div>';
            }



            $(this).html(html);

            if ($(this).find("input")){
              $(this).find("input").focus();
            }
           }
}
           }
         }
       }
       });

       $(element, "button").on("click", ".toggleButton", function(){

               $.extend(opts.defaultColumnTypes, opts.columnTypes);

         columnId = $(this).closest("td").index() + 1;
         rowId = $(this).closest("tr").index();

          if (opts.showRowId){
            data = {"column":columnId - 1,"row":rowId};
          }else{
            data = {"column":columnId,"row":rowId};
          }

         id = $(element).find("tr:first").find("th:nth-child(" + columnId + ")").find(".toggleId").val();


         if($(this).hasClass("toggle-off")){

           $.each(opts.defaultColumnTypes, function(i,item){
             if (item.id == id){
               html = '<i  class="' + item.on + '"></i>';
               }
           });

           $(this).removeClass("toggle-off");
           $(this).addClass("toggle-on");
           data["value"] = true;
         }else{

           $(this).removeClass("toggle-on");

           $.each(opts.defaultColumnTypes, function(i,item){
             if (item.id == id){
               html = '<i  class="' + item.off + '"></i>';
              data["value"] = false;
               }
           });
           $(this).addClass("toggle-off");

         }

         $(this).html(html);

         if (rowId == $(this).closest("tbody").find("tr").length - 1 && opts.addRow){

         }else{
           opts.onEditCell.call(data);

           if (opts.sendOnChange){
             sendData(element);
           }

          }
       });


       $("td", element).on("keydown", "input", function(event){



           if (event.which == 13){

             columnId = $(this).closest("td").index() + 1;
             rowId = $(this).closest("tr").index();

              if (opts.showRowId){
                data = {"column":columnId - 1,"row":rowId};
              }else{
                data = {"column":columnId,"row":rowId};
              }

            value = $(this).val();

            $(this).closest("td").removeClass("editing");
            $(this).closest("td").html(value);

            data["value"] = value;

           opts.onEditCell.call(data);

           if (opts.sendOnChange){
             sendData(element);
           }

           }


       });

       $(element).on("click", ".confirm", function(event){

         columnId = $(this).closest("td").index() + 1;
         rowId = $(this).closest("tr").index();

          if (opts.showRowId){
            data = {"column":columnId - 1,"row":rowId};
          }else{
            data = {"column":columnId,"row":rowId};
          }

          if ($(this).closest("td").find("select").length > 0){
              value = $(this).closest("div").find("select option:selected").text();
          }else{
            value = $(this).closest("td").find("input").val();
            }
            $(this).closest("td").removeClass("editing");
            $(this).closest("td").html(value);

            event.stopPropagation();
            data["value"] = value;
       opts.onEditCell.call(data);

       if (opts.sendOnChange){
         sendData(element);
       }

       });


   }

   function createRowId(element){

     if ($("tr:first", element).find("th:first").hasClass("row-id")){
       $("tr:first", element).find("th:first").remove();
       $("tr", element).find("td:first").remove();
     }
       $(element).find("tr").each(function(i,item){

            if(i == 0){

                html = '<th class="col-xs-1 col-md-1 row-id">';
                html += '#';
                html += '</th>';

                $(item).find("th:first").before(html);

            }else{
                html = '<td>' + i + '</td>';
                $(item).find("td:first").before(html);
            }

       });

   }


   function createAddColumn(element){
          if ($("tr:first", element).find("tr:first").find("th:last").hasClass("add-column-header")){
            $(element).find("tr").find("td:last").each(function(i,item){
                $(this).remove();
            });
              $("tr:first", element).find("th:last").remove();
          }



         th = $(element).find("tr:first").find("th:last");


           $(element).find("tr").each(function(i,item){

                if(i == 0){
                    html = '<th class="col-xs-1 col-md-1 add-column-header">';
                    html += '<button type="button" class="btn btn-block btn-primary addColumn" style="">+</button>';
                    html += '</th>';

                }else{
                    html = '<td></td>';
                }
                $(item).append(html);



       });



       $("tr:first", element).on("click", ".addColumn", function(){

        $(element).find("tr").each(function(i,item){

            if(i == 0){
              if (opts.showCondensedView){
                html = '<th class="">';
                html += '</th>';
              }else{
                html = '<th class="">';
                html += '</th>';
              }

                $(item).find("th:last").prev("th").after(html);

            }else{
              if (opts.showCondensedView){
                html = '<td class=""></td>';
              }else{
                html = '<td ></td>';
              }
                $(item).find("td:last").prev("td").after(html);
            }


            // $(element).find("tr:last").find("td").each(function(i,item){
            //
            //     count = $(element).find("tr:last").find("td").length;
            //
            //     if ( != 0 && i < count - 1){
            //         html = '<input type="text" class="form-control">';
            //         $(item).html(html);
            //     }
            // });


       });

          if(opts.showColumnOptions){
              createColumnOptions(element);
          }

          if(opts.addRow){
            createAddRow(element);
          }

          opts.onColumnAdd.call();

          if (opts.sendOnChange){
            sendData(element);
          }

       });

   }




        function createAddRow(element){

                $.extend(opts.defaultColumnTypes, opts.columnTypes);

          if (!opts.addColumn){
            html = '<th class="add-row-header"></th>';
            $("tr:first", element).find("th:last").after(html);
          }


            if ($("tr:last", element).hasClass("add-row")){
              $("tr:last", element).remove();
            }

            html = '<tr class="add-row">';

            totalColumns = $("tr:first", element).find("th").length - 1;

            $("tr:first", element).find("th").each(function(i,item){
              if ($(item).hasClass("add-row-header")){
                html += '<td></td>';


              }else if ($(item).hasClass("date")){
                html += '<td>';
                html += '<div class="input-group date" data-provide="datepicker">';
                html += '<input type="text" class="form-control">';
                html += '<div class="input-group-addon">';
                html += '<span class="glyphicon glyphicon-th"></span>';
                html += '</div>';
                html += '</div>';
                html += '</td>';

              } else if ($(item).hasClass("select")){
                  html += '<td>';
                  id = $(item).find(".selectId").val();

                  html += '<select class="form-control" value="">';

                  $.each(opts.defaultColumnTypes, function(i,item){
                    if (item.id == id){
                    $.each(item.values,function(ii,iitem){
                        html += '<option>' + iitem + '</option>';
                    });
                  }
                  });
                  html += '</td>';
                }else if($(item).hasClass("toggle")){

                  html += '<td>';
                  id = $(item).find(".toggleId").val();

                  $.each(opts.defaultColumnTypes, function(i,item){
                    if (item.id == id){
                        html += '<button class="btn btn-primary toggleButton toggle-off"><i class="' + item.off + '" ></i></button>';
                    }
                  });
                    html += '</td>';

                }else if($(item).hasClass("row-id")){
                    id = parseInt($(element).find("tr:last").find("td:first").html()) + 1;
                    html += '<td>' + id + '</td>';


                }else{
                  alert("d");



                    html += '<td>';


                html += '<input type="text" class="form-control"/>';

                    html += '</td>';
                  }

                    });




            html += '</tr>';

            $(element).find("tr:last").after(html);

            $("tr:first", element).find("th").each(function(i,item){
              if ($(this).hasClass("condensed-hidden")){
                $("tr:last", element).find("td:nth-child(" + i + ")").addClass("condensed-hidden");

              }
            });

              $(element).find("tr:first").find("th:last").addClass("add-row-header");


            // $(element).find("tr").find("th:last").each(function(i,item){
            //       if ($(item).find("th:last").hasClass("add-row-header")){
            //
            //
            //         html = '<th class="add-row-header">';
            //         html += '</th>';
            //
            //         $(item).find("th:last").after(html);
            //
            //     }else{
            //         html = '<td></td>';
            //         $(item).find("td:last").after(html);
            //     }
            //
            // });

            html = '<button type="button" class="btn btn-block btn-primary addRow" style="">+</button>';

            $(element).find("tr:last").find("td:last").html(html);




            $("tr", element).on("click", ".addRow", function(){

              rowData = [];

                html = '<tr>';
                    if (opts.showRowId == true){
                            $(element).find("tr:last").find("td").each(function(i,item){

                              if ($("tr:first",element).find("th:nth-child(" + (i + 1) + ")").hasClass("condensed-hidden")){
                            html += '<td class="condensed-hidden">';
                          }else{
                            html += '<td>';
                          }


                                if (i == 0){
                                    value = $(item).html();
                                    html += value;
                                }else{
                                  if($("tr:first", element).find("th:nth-child(" + (i + 1) + ")").hasClass("toggle")){

                                    if ($(this).hasClass("toggle-off")){
                                      rowData[i] = false;
                                    }else{
                                      rowData[i] = true;
                                      }

                                    value = $(item).html();
                                    html += value;

                                  }else if($("tr:first", element).find("th:nth-child(" + (i + 1) + ")").hasClass("select")){
                                    value = $(item).find("select option:selected").text();
                                      rowData[i] = value;
                                      html += value;
                                  }else{

                                    value = $(item).find("input").val();
                                    $(item).find("input").val("");
                                      rowData[i] = value;


                                    if (value){
                                      html += value;
                                    }
                                    }
                                }

                            html += '</td>';

                        });

                        id = $(element).find("tr").length;

                        $(element).find("tr:last").find("td:first").html(id + 1);


                    }else{

                            $(element).find("tr:last").find("td").each(function(i,item){

                            html += '<td>';

                            value = $(item).find("input").val();

                                if (value){

                            html += value;

                                }

                            html += '</td>';

                        });

                    }

               html += '</tr>';

               $(element).find("tr:last").before(html);

               if (opts.removeRow){
                 html = '<button type="button" class="btn btn-block btn-danger removeRow">X</button>';
                 $(element).find("tr:last").prev("tr").find("td:last").html(html);
               }

               if (opts.showRowId){
                 createRowId(element);
               }

               if (opts.showRowId){
                rowData.splice(0,1);
               }

               if (opts.addColumn){
                 rowData.splice(rowData.length - 1,1);
               }

               opts.onRowAdd.call(rowData);

               if (opts.sendOnChange){
                 sendData(element);
               }

            });



   }

   return this;
   }


   // Plugin defaults – added as a property on our plugin function.
$.fn.tableTwo.defaults = {

    addColumn: true,
    onColumnAdd: function(e){
      e.stopPropagation();
    },
    addRow: true,
    onRowAdd: function(e){
      e.stopPropagation();
    },
    removeRow:true,
    onRowRemove: function(e){
      e.stopPropagation();
    },
    showRowId:true,
    editCells:true,
    onEditCell:function(e){
      e.stopPropagation();
    },
    rowClick:false,
    onRowClick:function(e){
      e.stopPropagation();
    },
    showColumnOptions:true,
    allowDropdown:true,
    editHeaders:true,
    showTableCaption: true,
    tableCaptionValue: "",
    showSubmitButton:true,
    submitUrl:"",
    getJsonData:false,
    getJsonPOSTData: {},
    sendJsonUrl:"",
    sendJsonPOSTid: "",
    jsonurl:"",
    showCondensedView: true,
    mobileCondensedView: false,
    sendOnChange: false,
    createDefaultColumns:true,
    createDefaultGrid:false,
    defaultColumns:[],
    addFooter:true,
    footerAddRowButton:true,
    gridSize:"8x4",
    tableMaxSize:false,
    tableScrollable:false,
    //mobileDefaultColumns: [],
        enableCustomColumnTypes: true,
        columnSettings:{},


        defaultColumnTypes:{
          //text example
          text:{
            id:1,
            title: "text",
            type: "text",
            value: ""
          },
          date:{
            id:2,
            title: "date",
            type: "date",
            value:"now"
          },
           //select examples
           select:{
             id:3,
             title:"select",
             type: "select",
             values: [ '']
           },
          status:{
            id:4,
            title:"status",
            type:"select",
            values: [ 'created','started','done']
          },
          //toggle examples
          star:{
            id:5,
            title:"star",
            type:"toggle",
            on:"fa fa-star-o",
            off:"fa fa-star"
          },
          check:{
            id:6,
            title:"done",
            type:"toggle",
            on: "fa fa-check",
            off: "fa fa-times"
          },
          switch:{
            id:7,
            title:"switch",
            type:"toggle",
            on: "fa fa-toggle-on",
            off: "fa fa-toggle-off"
          }
        }
};
