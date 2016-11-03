   $.fn.tableTwo = function(options) {


       // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var opts = $.extend( {}, $.fn.tableTwo.defaults, options );

    if (opts.getJsonData){
      buildDataTable(this);

    }else{
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

   if (opts.submitTable){
     createSubmitTable(element);
   }

   if (opts.mobileCondensedView){
     applyMobileCondensedView(element);
   }

 }

 function applyMobileCondensedView(element){

   totalColumns = $("tr:first", element).find("th").length - 1;

   $("tr:first", element).find("th").each(function(i,header){

     if (i == 0 && opts.showRowId){
     }else if (i == totalColumns && opts.addColumn){
     }else{
     removeFlag = true;
     $.each(opts.mobileDefaultColumns,function(ii,value){

       if(value == $(header).text()){
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

   var html = "<span class='pull-right column-manager'>";
       html += "<a class='column-manager-popover' data-toggle='popover title=Column Settings' data-html='true' data-placement='left' data-content='" + content + "'>";
       html += "<i class='fa fa-list'></i></a>";
       html += "</span>";


           $("caption", element).append(html);
           $(".column-manager-popover").popover();

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

    var ajax =  $.ajax({
  url: url,
  type: 'post',
    headers: {
        },
        dataType: 'json',
            data: {
              data:json,

          }
          });

    ajax.done(function(data){

            resolve();


            });
        });


    }

  function createSubmitTable(element){
    html = '<div class="">';

    html += '<button class="btn btn-primary pull-right tableSubmit" style="" >Submit</button>';
    html += '</div>';

    $(element).after(html);

    $(".tableSubmit").on("click", function(){
      var data = [];
        $(element).find("tr").each(function(i,row){
          totalRows = $(element).find("tr").length - 1;
          totalColumns = $(element).find("tr:first").find("th").length - 1;
          if (i == totalRows && opts.addRow){

          }else{
            rowData = {};
            $(row).find("td").each(function(ii,cell){
            if (ii == totalColumns && opts.addColumn){

            }else{
              if (ii == 0 && opts.showRowId){

              }else{
                header = $(element).find("tr:first").find("th:nth-child(" + (ii + 1) + ")").text();
                value = $(cell).text();
                rowData[header] = value;
                }
              }
          });

          data[i - 1] = rowData;
        }
        });
sendJsonData(opts.sendJsonUrl,data);

    });

  }

  function createRemoveRow(element){

    if (!opts.addColumn){
      if (!opts.addRow){
        html = '<th></th>';
        $("tr:first", element).find("th:last").after(html);
          html = '<td></td>';
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

              html = '<td><button type="button" class="btn btn block btn-danger removeRow" style="width:100%;"> X </button></td>';
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
      $(this).closest("tr").remove();
      if (opts.showRowId){
        createRowId(element);
      }
    });

  }

   function buildDataTable(element){
     getJsonData(opts.jsonurl).then(function(res){

       $.each(res,function(i,item){

         headers = '<tr>';
         cells = '<tr>';

          $.each(item,function(n,v){
            $.each(v, function(nn,vv){

              if (opts.enableColumnSettings){

              columnMatch = false;
              $.each(opts.columnSettings, function(key,item){
                if (key == nn ){
              columnMatch = true;
                  if (opts.columnTypes[item].type == "toggle"){

                    vv = '<button class="btn btn-primary toggleButton toggle-off"><i class="' + opts.columnTypes[item].off + '"></i></button>';

                    nn += '<input type="hidden" class="toggleId" value="' + opts.columnTypes[item].id + '">';

                    headers += '<th class="toggle">' + nn  + '</th>';


                    cells += '<td>' + vv + '</td>';

                  }
                  if (opts.columnTypes[item].type == "select"){

                    headers += '<th class="select">' + nn  + '</th>';

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
     });



   }

   function createTableCaption(element){
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
              data: {

            }
            });

      ajax.done(function(data){

  $.each(data,function(i, item){

  var obj = {item};

  array.push(obj);

  });
              resolve(array);


              });
          });


      }

   function createColumnOptions(element){




           $("tr:first", element).find("th").each(function(i,item){
               dupcheck = $(item).find(".column-settings-popover").length;
               if (dupcheck == 0){
               if (i == 0 && opts.showRowId == true){
                    }else{
                        size = $(this).closest("tr").find("th").length;
                        if (i == size - 1 && opts.addColumn == true){
                    }else{

               var content = '<div class="form-group column-settings-container">';
               content += '<label>Title</label>';
               content += '<input type="text" class="form-control column-settings-title" value="' + $(item).html() + '"/>';

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

              $.each(opts.columnTypes, function(i,item){
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

           $(element, "th").on("change", ".column-settings-type", function(){

              columnId = parseInt($(this).closest("th").find(".columnId").val()) + 1;

              typeId = $(this).find(":selected").val();

              $.each(opts.columnTypes,function(i,item){
                  if (item.id == typeId){
                      $(element, "tr:first").find("th:nth-child(" + columnId + ")").each(function(i,itemm){

                            if (item.type == "select"){
                                $(this).removeClass();
                                $(this).remove('.toggleId');
                                $(this).addClass(item.type);


                              if ($(this).find(".selectId").length){
                                  $(this).find(".selectId").val(item.id);
                              }else{

                                  html = '<input type="hidden" class="selectId" value="' + item.id + '">';
                                  $(this).append(html);

                                }
                            }

                            if (item.type == "toggle"){
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


       $(element, ".editing-header").on("click", "button", function(event){

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



       $(element, "th").on("keydown", "input", function(event){
           if (event.which == 13){


            value = $(this).val();

            $(this).closest("td").removeClass("editing-header");
            $(this).closest("td").html(value);

           }
       });


   }


   function bindEditCells(element){


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

            if ($(element, "tr:first").find("th:nth-child(" + (position) + ")").hasClass("select")){

              id = $(element, "tr:first").find("th:nth-child(" + position + ")").find(".selectId").val();

              html += '<select class="form-control" value="' + value + '">';

              html += '<option>' + value + '</option>';

              $.each(opts.columnTypes, function(i,item){
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

         position = $(this).closest("td").index() + 1;
         id = $(element).find("tr:first").find("th:nth-child(" + position + ")").find(".toggleId").val();


         if($(this).hasClass("toggle-off")){

           $.each(opts.columnTypes, function(i,item){
             if (item.id == id){
               html = '<i  class="' + item.on + '"></i>';
               }
           });

           $(this).removeClass("toggle-off");
           $(this).addClass("toggle-on");
         }else{

           $(this).removeClass("toggle-on");

           $.each(opts.columnTypes, function(i,item){
             if (item.id == id){
               html = '<i  class="' + item.off + '"></i>';

               }
           });
           $(this).addClass("toggle-off");

         }

         $(this).html(html);

       });


       $(element, "td").on("keydown", "input", function(event){
           if (event.which == 13){
            value = $(this).val();

            $(this).closest("td").removeClass("editing");
            $(this).closest("td").html(value);

           }
       });

       $(element, ".editing").on("click", ".confirm", function(event){

          if ($(this).closest("td").find("select").length > 0){

              value = $(this).closest("div").find("select option:selected").text();

          }else{

            value = $(this).closest("div").find("input").val();

            }
            cell = $(this).closest("td");

            cell.html(value);
            cell.removeClass("editing");
            //event.stopPropagation();

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
                html = '<th>';
                html += '</th>';

                $(item).find("th:last").prev("th").after(html);

            }else{
                html = '<td></td>';
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

       });

   }




        function createAddRow(element){

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


              }else if ($(item).hasClass("select")){
                  html += '<td>';
                  id = $(item).find(".selectId").val();

                  html += '<select class="form-control" value="">';

                  $.each(opts.columnTypes, function(i,item){
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

                  $.each(opts.columnTypes, function(i,item){
                    if (item.id == id){
                        html += '<button class="btn btn-primary toggleButton toggle-off"><i class="' + item.off + '" ></i></button>';
                    }
                  });
                    html += '</td>';

                }else if($(item).hasClass("row-id")){
                    id = parseInt($(element).find("tr:last").find("td:first").html()) + 1;
                    html += '<td>' + id + '</td>';


                }else{



                    html += '<td>';


                html += '<input type="text" class="form-control"/>';

                    html += '</td>';
                  }

                    });

            html += '</tr>';

            $(element).find("tr:last").after(html);

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

                html = '<tr>';
                    if (opts.showRowId == true){
                            $(element).find("tr:last").find("td").each(function(i,item){
                            html += '<td>';
                                if (i == 0){
                                    value = $(item).html();
                                    html += value;
                                }else{
                                  if($("tr:first", element).find("th:nth-child(" + (i + 1) + ")").hasClass("toggle")){

                                    value = $(item).html();
                                    html += value;

                                  }else{

                                    value = $(item).find("input").val();
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

            });



   };

   };


   // Plugin defaults – added as a property on our plugin function.
$.fn.tableTwo.defaults = {
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
};
