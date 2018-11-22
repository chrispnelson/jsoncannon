/////////////////////////////////////////////////////////////////////
//
// Script Meant to make it easier to generate Empowered lite event configs
// 
// Select <MENU> then <?> 
//
// Future: Write Files to AVA without needing to copy paste (BIG ASK)
//
// Author: Christopher Nelson
// Created: 2018-09-18
// Updated: 2018-11-08 07.57.35
//
/////////////////////////////////////////////////////////////////////

var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var currentSheet = currentSpreadsheet.getActiveSheet();
var DATA_ROW_START = 2;

// set default structure of JSON data
var JSONDataObj = 
{
  "LiteEvents": [ ]
};

function saveJSONFile(json_obj)
{
  var TAB_NAME = SpreadsheetApp.getActiveSheet().getName();
  var fileNameString = (TAB_NAME + "_EmpoweredLiteEventOutput.json").trim();
  saveFileData(json_obj, fileNameString);
}

function getDataFromSheet()
{
  var dataFromSheet = [];
  var row = DATA_ROW_START;
  var lastRow = currentSheet.getMaxRows();
  var isMainStart = false; 
  var isMainEnd = false; 
  
  for (var i = row; i <= lastRow; i++)
  {
    isMainStart = (currentSheet.getRange("A" + i).getValue() + "" != "" ? true : false);
    isMainEnd = ((currentSheet.getRange("A" + (i + 1)).getValue() + "" != "") || (i == lastRow) ? true : false);
    
      dataFromSheet.push
      ({
        "DATA_INDEX"           : i - row,
        "LAST"                 : (i == lastRow ? true : false),
        "MAIN_START"           : isMainStart,
        "MAIN_END"             : isMainEnd,
        "AMAINSTART_INDEX"     : (isMainStart ? i - row : 0),
        "AMAINEND_INDEX"       : (isMainEnd ? i - row : 0),
        "Id"                   : currentSheet.getRange("A" + i).getValue() + "",
        "ChainTo"              : currentSheet.getRange("B" + i).getValue() + "",
        "SegmentId"            : currentSheet.getRange("C" + i).getValue() + "",
        "StartDate"            : currentSheet.getRange("D" + i).getValue() + "",
        "EndDate"              : currentSheet.getRange("E" + i).getValue() + "",
        "MinBet"               : currentSheet.getRange("F" + i).getValue() + "",
        "AccumulationGoal"     : currentSheet.getRange("G" + i).getValue() + "",
        "AwardChips"           : currentSheet.getRange("H" + i).getValue() + "",
        "CounterType"          : currentSheet.getRange("I" + i).getValue() + "",
        "RewardType"           : currentSheet.getRange("J" + i).getValue() + "",
        "GamesList"            : currentSheet.getRange("K" + i).getValue() + "",
        "BoosterAccumulations" : currentSheet.getRange("L" + i).getValue() + "",
        "Repeatable"           : (currentSheet.getRange("M" + i).getValue() + "").toLowerCase(),
        "IsFirst"              : (currentSheet.getRange("N" + i).getValue() + "").toLowerCase(),
        "Icon"                 : currentSheet.getRange("T" + i).getValue() + "",
        "PowerUpIcon"          : currentSheet.getRange("U" + i).getValue() + "",
        "BlockerURLS"          : 
        [
        currentSheet.getRange("V" + i).getValue() + "",
        currentSheet.getRange("W" + i).getValue() + "",
        currentSheet.getRange("X" + i).getValue() + "",
        currentSheet.getRange("Y" + i).getValue() + "",
        currentSheet.getRange("Z" + i).getValue() + ""
        ],
        "BoostData"            : 
        [
        currentSheet.getRange("O" + i).getValue() + "",
        currentSheet.getRange("P" + i).getValue() + "",
        currentSheet.getRange("Q" + i).getValue() + "",
        currentSheet.getRange("R" + i).getValue() + "",
        currentSheet.getRange("S" + i).getValue() + ""
        ]
      });
    
  }
  
  return dataFromSheet;
}

function getBlockerObject(
  segmentID, 
  blockerIndex, 
  buttonTxt, 
  actionType, 
  actionData,
  imgURL,
  BLOCKER_TYPE_ISPS2D
)
{
  var BT = BLOCKER_TYPE_ISPS2D == true || BLOCKER_TYPE_ISPS2D == "true" ? true : false;
  
  var outPutJSONOBJ = 
      {
        "SegmentId": segmentID,
        "BlockerIndex": blockerIndex,
        "BlockerCloseButtonXPos": "-100",
        "BlockerCloseButtonYPos": "0",
        "BlockerActionButtonText": buttonTxt.toUpperCase(),
        "BlockerActionButtonYPos": "0",
        "BlockerActionType": actionType,
        "BlockerActionData": actionData,
        "BlockerImage":  BT ? "" : imgURL,
        "Ps2dZipFile": BT ? imgURL : ""
      };
  
  return outPutJSONOBJ;
}

function getFireUpObject(sourceOBJ, fiureUpProductIndex)
{
  var outPutJSONOBJ =
      {
        "SegmentId": "main",
        "ProductIndex": fiureUpProductIndex,
        "NumPowerUps": sourceOBJ
      };
  
  return outPutJSONOBJ;
}

function getMainJSONobj(sourceOBJ, BLOCKER_TYPE_ISPS2D)
{
  var BT = BLOCKER_TYPE_ISPS2D == true || BLOCKER_TYPE_ISPS2D == "true" ? true : false;
  
  var blockerList = 
      [
            getBlockerObject
            (
              sourceOBJ.SegmentId,
              0, 
              (sourceOBJ.CounterType + " NOW!"), 
              (sourceOBJ.GamesList == "allgames" || sourceOBJ.GamesList.search(",") > 0) ? "" : "game", 
              (sourceOBJ.GamesList == "allgames" || sourceOBJ.GamesList.search(",") > 0) ? "" : sourceOBJ.GamesList,
              sourceOBJ.BlockerURLS[0],
              BT
            ),
        
            getBlockerObject
            (
              sourceOBJ.SegmentId,
              1,
              "BUY NOW!",
              "store",
              "",
              sourceOBJ.BlockerURLS[1],
              BT
            ),
        
            getBlockerObject
            (
              sourceOBJ.SegmentId,
              2,
              "TEST!",
              "store",
              "",
              sourceOBJ.BlockerURLS[2],
              BT
            )
        
      ];
          
  var outPutJSONOBJ = {   
          "Id" : sourceOBJ.Id,
          "ChainTo" : sourceOBJ.ChainTo,
          "SegmentId": "main",
          "StartDate" : sourceOBJ.StartDate,
          "EndDate": sourceOBJ.EndDate,
          "AccumulationGoal": sourceOBJ.AccumulationGoal,
          "MinBet": sourceOBJ.MinBet,
          "AwardChips": sourceOBJ.AwardChips,
          "CounterType": sourceOBJ.CounterType,
          "RewardType": sourceOBJ.RewardType,
          "BoosterAccumulations": sourceOBJ.BoosterAccumulations,
          "GamesList": sourceOBJ.GamesList,
          "Repeatable": sourceOBJ.Repeatable,
          "IsFirst": sourceOBJ.IsFirst,
          "Icon": sourceOBJ.Icon,
          "PowerUpIcon": sourceOBJ.PowerUpIcon,
          "Blockers": 
          [
            blockerList[0],
            blockerList[1],
            blockerList[2]
          ],
          "BoostersAvailable": 
          [
            getFireUpObject(sourceOBJ.BoostData[0], 2),
            getFireUpObject(sourceOBJ.BoostData[1], 3),
            getFireUpObject(sourceOBJ.BoostData[2], 4),
            getFireUpObject(sourceOBJ.BoostData[3], 5),
            getFireUpObject(sourceOBJ.BoostData[4], 6)
          ],
          "SegmentedData" : []
  };
  
  return outPutJSONOBJ;
}

function getSegmentedJOSNobj(sourceOBJ, BLOCKER_TYPE_ISPS2D)
{
  var BT = BLOCKER_TYPE_ISPS2D == true || BLOCKER_TYPE_ISPS2D == "true" ? true : false;
  
  var blockerList = 
      [
        
            getBlockerObject
            (
              sourceOBJ.SegmentId,
              0, 
              (sourceOBJ.CounterType + " NOW!"), 
              (sourceOBJ.GamesList == "allgames" || sourceOBJ.GamesList.search(",") > 0) ? "" : "game", 
              (sourceOBJ.GamesList == "allgames" || sourceOBJ.GamesList.search(",") > 0) ? "" : sourceOBJ.GamesList,
              sourceOBJ.BlockerURLS[0],
              BT
            ),
        
            getBlockerObject
            (
              sourceOBJ.SegmentId,
              1,
              "BUY NOW!",
              "store",
              "",
              sourceOBJ.BlockerURLS[1],
              BT
            ),
        
            getBlockerObject
            (
              sourceOBJ.SegmentId,
              2,
              "TEST!",
              "store",
              "",
              sourceOBJ.BlockerURLS[2],
              BT
            )
        
      ];
  
  
  var outPutJSONOBJ =
      {
        "SegmentId": sourceOBJ.SegmentId,
        "AccumulationGoal": sourceOBJ.AccumulationGoal,
        "MinBet": sourceOBJ.MinBet,
        "AwardChips": sourceOBJ.AwardChips,
        "CounterType": sourceOBJ.CounterType,
        "RewardType": sourceOBJ.RewardType,
        "GamesList": sourceOBJ.GamesList,
        "Repeatable": sourceOBJ.Repeatable,
        "Icon": sourceOBJ.Icon,
        "PowerUpIcon": sourceOBJ.PowerUpIcon,
        "Blockers": 
        [
          blockerList[0],
          blockerList[1],
          blockerList[2]
        ]
      }
  
  return outPutJSONOBJ;
}



function pushDataToJSONOBJ(BLOCKER_TYPE_ISPS2D)
{
  var dataFromSheet = getDataFromSheet();
  var mainDataFromSheetLength = dataFromSheet.length;
  var SegmentedData = { "LiteEvents": [ ]  };
  var countersDataObj = 
      {
        "thisSegmentInChainIndex" : 0,
        "ChainCounterIndex" : 0
      };
  
  for (countersDataObj.thisSegmentInChainIndex = 0; countersDataObj.thisSegmentInChainIndex < mainDataFromSheetLength; countersDataObj.thisSegmentInChainIndex++)
  {
    if (dataFromSheet[countersDataObj.thisSegmentInChainIndex].MAIN_START) 
    {
      /// Start new link in chain
      SegmentedData.LiteEvents.push(getMainJSONobj(dataFromSheet[countersDataObj.thisSegmentInChainIndex], BLOCKER_TYPE_ISPS2D));
            
      /// add first segment of data
      SegmentedData.LiteEvents[countersDataObj.ChainCounterIndex].SegmentedData.push(getSegmentedJOSNobj(dataFromSheet[countersDataObj.thisSegmentInChainIndex], BLOCKER_TYPE_ISPS2D));
    }
    else if (dataFromSheet[countersDataObj.thisSegmentInChainIndex].MAIN_END)
    {
      SegmentedData.LiteEvents[countersDataObj.ChainCounterIndex].SegmentedData.push(getSegmentedJOSNobj(dataFromSheet[countersDataObj.thisSegmentInChainIndex], BLOCKER_TYPE_ISPS2D));

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //// Only increment ChainCounterIndex if progressing to next link in the chain. Insuring segmentation data dropping into correct chains 
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      countersDataObj.ChainCounterIndex++;
    }
    else
    {
      // fill in the segments between start and end
      SegmentedData.LiteEvents[countersDataObj.ChainCounterIndex].SegmentedData.push(getSegmentedJOSNobj(dataFromSheet[countersDataObj.thisSegmentInChainIndex], BLOCKER_TYPE_ISPS2D));
    }
  }
  
  saveFileData(JSON.stringify(SegmentedData),"EmpoweredLiteEventOutput.json");
}

function processLiteEvent()
{
  pushDataToJSONOBJ(false);
}

function processLiteEventLiteConfigPS2D()
{
  pushDataToJSONOBJ(true);
}

///////////////////////////////////////////////////////////////
///////////////////// Test Functions //////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////// Test Functions //////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////// Test Functions //////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////// Test Functions //////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////// Test Functions //////////////////////////
///////////////////////////////////////////////////////////////