var OKcurrentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var OKcurrentSheet = OKcurrentSpreadsheet.getActiveSheet();
var OKDATA_ROW_START = 2;

// set default structure of JSON data
var OKJSONDataObj = 
{
  "LiteEvents": [ ]
};

function OKsaveJSONFile(json_obj)
{
  var TAB_NAME = SpreadsheetApp.getActiveSheet().getName();
  saveFileData(json_obj,TAB_NAME + "_OKMenuCards.json");
}

function OKgetDataFromSheet()
{
  var dataFromSheet = [];
  var row = OKDATA_ROW_START;
  var lastRow = OKcurrentSheet.getMaxRows();
  var isMainStart = false; 
  var isMainEnd = false; 
  
  for (var i = row; i <= lastRow; i++)
  {
    isMainStart = (OKcurrentSheet.getRange("A" + i).getValue() + "" != "" ? true : false);
    isMainEnd = ((OKcurrentSheet.getRange("A" + (i + 1)).getValue() + "" != "") || (i == lastRow) ? true : false);
    
      dataFromSheet.push
      ({
        "DATA_INDEX"           : i - row,
        "LAST"                 : (i == lastRow ? true : false),
        "MAIN_START"           : isMainStart,
        "MAIN_END"             : isMainEnd,
        "AMAINSTART_INDEX"     : (isMainStart ? i - row : 0),
        "AMAINEND_INDEX"       : (isMainEnd ? i - row : 0),
        "CardConfig"           : OKcurrentSheet.getRange("A" + i).getValue() + "",
        "Size"                 : OKcurrentSheet.getRange("B" + i).getValue() + ""
      });
  }
  
  return dataFromSheet;
}

function processOKWriteJSON()
{
  var ObjectJSON = OKgetDataFromSheet();
  var i = 0;
  var MenuCardsSet = 
      { 
        "MenuCards" :  
        {
          "default" : [ ],
          "wide" : [ ]
        }
      };
  
  for (i = 0; i < ObjectJSON.length; i++)
  {
    MenuCardsSet.
    MenuCards["wide"].
    push
    ( 
      {
        "CardConfig" : ObjectJSON[i].CardConfig,
        "Size" : ObjectJSON[i].Size
      }
    );
    
    MenuCardsSet.
    MenuCards["default"].
    push
    ( 
      {
        "CardConfig" : ObjectJSON[i].CardConfig,
        "Size" : ObjectJSON[i].Size
      }
    );
  }
  
  OKsaveJSONFile(JSON.stringify(MenuCardsSet));
}