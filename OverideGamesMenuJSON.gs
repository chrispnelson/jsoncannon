var allGames_currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var allGames_CS = allGames_currentSpreadsheet.getActiveSheet();
var allGames_DATA_ROW_START = 1;

function saveJSONFile(json_obj)
{
  var TAB_NAME = SpreadsheetApp.getActiveSheet().getName();
  saveFileData(json_obj,TAB_NAME + "_GameUnlockOverride.txt");
}

function allGames_getDataFromSheet()
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
        "CardConfig"           : allGames_CS.getRange("A" + (i + 1)).getValue() + "",
        "UnlockLevel"          : parseInt(allGames_CS.getRange("B" + (i + 1)).getValue() + ""),
        "Size"                 : parseInt(allGames_CS.getRange("C" + (i + 1)).getValue() + "")
      });
    
  }
  
  return dataFromSheet;
}

/// for writing data for updated card settings
function getJSONOBJ(RAW_DATA_OBJ, POSITION)
{
//  var JSON_OBJ_START   = '{';
  var JSON_OBJ_STRING  = '"' + RAW_DATA_OBJ.CardConfig + '" : {';
  var JSON_POSITION    = '"position" : ' + POSITION + ","
  var JSON_OBJ_MENUCRD = '"MenuCard": {';
  var JSON_CARD_STRING = '"CardConfig": "' + RAW_DATA_OBJ.CardConfig + '",';
  var JSON_SIZE_STRING = '"Size": ' + RAW_DATA_OBJ.Size + ',';
  var JSON_META_STRING = '"MetaData": { "UnlockLevel": ' + RAW_DATA_OBJ.UnlockLevel + '}}}';
//  var JSON_OBJ_END     = '}';
    
  var OUTPUT_STR = 
//      JSON_OBJ_START   + 
      JSON_OBJ_STRING  +
      JSON_POSITION    + 
      JSON_OBJ_MENUCRD + 
      JSON_CARD_STRING + 
      JSON_SIZE_STRING + 
      JSON_META_STRING  
//      JSON_OBJ_END
      ;
  
  return OUTPUT_STR;
}

function getOverrideDataFromSheet()
{
  var DATA_OBJ = allGames_getDataFromSheet();
  var DATA_LEN = DATA_OBJ.length;
  
  var OUTPUT_OBJ = "";
  
  for (var i = 0; i < DATA_LEN - 1; i++)
  {
    OUTPUT_OBJ = OUTPUT_OBJ.concat( getJSONOBJ(DATA_OBJ[i], i) );

    
      if (!DATA_OBJ[i].LAST)
      {
        OUTPUT_OBJ = OUTPUT_OBJ.concat( ',' );
      }
  }
  
  OUTPUT_OBJ = ('{"Replace": {').concat(OUTPUT_OBJ.concat( '{END}}}' )).replace(",{END}", "");
  
//  Logger.log(JSON.stringify(OUTPUT_OBJ));
  
  saveJSONFile(OUTPUT_OBJ);
}

function processOverride()
{
  getOverrideDataFromSheet();
}