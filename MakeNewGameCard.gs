var xallGames_currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var xallGames_CS = allGames_currentSpreadsheet.getActiveSheet();
var or_TABNAME = xallGames_CS.getName() + "";
var xallGames_DATA_ROW_START = 1;

function xsaveJSONFile(json_obj)
{
  var TAB_NAME = SpreadsheetApp.getActiveSheet().getName();
  var fileNameToWrite = TAB_NAME + "GameUnlockOverride.json";
  
  saveFileData(json_obj, fileNameToWrite );
}

function xallGames_getDataFromSheet()
{
  var dataFromSheet = [];
  var row = allGames_DATA_ROW_START;
  var lastRow = allGames_CS.getMaxRows();
  var isMainStart = false; 
  var isMainEnd = false; 
  
  for (var i = row; i <= lastRow; i++)
  {
    isMainStart = (allGames_CS.getRange("A" + i).getValue() + "" != "" ? true : false);
    isMainEnd = ((allGames_CS.getRange("A" + (i + 1)).getValue() + "" != "") || (i == lastRow) ? true : false);
    
      dataFromSheet.push
      ({
        "DATA_INDEX"           : i - row,
        "LAST"                 : (i == lastRow ? true : false),
        "MAIN_START"           : isMainStart,
        "MAIN_END"             : isMainEnd,
        "AMAINSTART_INDEX"     : (isMainStart ? i - row : 0),
        "AMAINEND_INDEX"       : (isMainEnd ? i - row : 0),
        "CardName"             : allGames_CS.getRange("A" + (i + 1)).getValue() + "",
        "UnlockLevel"          : parseInt(allGames_CS.getRange("B" + (i + 1)).getValue() + ""),
        "Element1"             : [],
        "Element2"             : [],
        "Bundle"               : "",
        "BundleToDownload"     : "",
        "Prefab"               : "", 
        "OnClickAction"        : 
        {
        "type" : "",
        "gameID" : "",
        "Event" : "",
        "viewName" : "",
        "sortCategory" : "",
        "groupID" : "",
        "customOfferID" : "",
        "popupName" : "",
        "bundleName" : "",
        "prefabPath" : ""
         },
        "Decorators"           : [],
        "DecoratorMetaData"     : [],
       "ConditionalDecorators" : []
      });
    
  }
  
  return dataFromSheet;
}