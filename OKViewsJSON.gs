var OKViewsCurSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var OKViewsCurSheet = OKViewsCurSpreadsheet.getActiveSheet();
var OKVIEWS_ROW_START = 2;

function OKViewsSaveJSONFile(json_obj)
{
  var TAB_NAME = SpreadsheetApp.getActiveSheet().getName();
  saveFileData(json_obj,TAB_NAME + "_OKViews.json");
}

function processOKViewsOutputJSON()
{
  var outputJSON = getVIEWSJSONObj();
  
  OKViewsSaveJSONFile(outputJSON);
}

function getVIEWSJSONObj()
{
   var SheetDataOBJ = getOKViewsDataFromSheet();
   var OKViewsOBJ = getOKViewsObject();
   var defaultMenuDecorators = getDefaultGamesMenuDecoratorsArray();
   var currentSheetDataID = "";
  
   /// Loop until getSheetDataOBJ[index].LAST is true, & update OKViewsOBJ with data from SheetDataOBJ
   /// if first row, then start assembling arrays 
   /// if cell is empty, stop pushign data to array 
   /// if cell is a scrollview object and = "null", don't make the views object 
   /// if SheetDataIDS is at end, checked all sheet columns
  
   return OKViewsOBJ;
}

function getMenuObject(SheetDataOBJ)
{
  var MenuObjectFromData = {};
  
  /// assemble a single menu from the arrays and scroll view object
  
  return MenuObjectFromData;
}

function getAnObjectsArray(SheetDataOBJ)
{
  var AnObjectsArray = [];
  
  /// return an array of objects
  /// Arrays for menus currently MenuCards, HudElements, Decorators, Decor (usually just the one object)
  
  return AnObjectsArray;
}

function getAScrollViewObject(SheetDataOBJ)
{
  var ScrollViewObject = 
      {
        "ViewType" : "",
        "ScrollView" :
        {
          "LeftCardDistancePercent" : "",
          "RightCardDistancePercent" : "",
          "Transform" : 
          {
            "Position" : ""
          }
        }
      };
   
  return ScrollViewObject;
}

function getArrayOfMenuKEYS()
{
  /// get an array of Keys for all of the Menus in the Views object
  //    0    "PromoMenu",
  //    1    "GamesMenu",
  //    2    "JourneysMenu",
  //    3    "RewardsMenu",
  //    4    "WalletMenu"

  var MenuKEYS = 
      [
        "PromoMenu",
        "GamesMenu",
        "JourneysMenu",
        "RewardsMenu",
        "WalletMenu"
      ];
  
  return MenuKEYS;
}

function getArrayOfMenuSubObjectKEYS()
{
  /// get an array of Keys for the menu's strings, objects, & arrays
  /// primarily for sorting after assembly, but also for other short hand methods of assembling the object
  /// may not be useful, maybe useful /shrug
  //     0   "ViewType",
  //     1   "ScrollView",
  //     2   "HudElements",
  //     3   "Decorators",
  //     4   "Decor",
  //     5   "MenuCards"
  
  var MenuObjectKEYS = 
      [
        "ViewType",
        "ScrollView",
        "HudElements",
        "Decorators",
        "Decor",
        "MenuCards"
      ];
  
  return MenuObjectKEYS;
}

function getArrayOfSheetDataKEYS()
{
  //// array indexing calls by JSON Keys for object returned by OKVIEWSgetDataFromSheet()
  //// asserts that names are matching
  
  var SheetDataKEYS = 
      [
        ////////// Game Menu //////////
        "GameMenuCardConfig",
        "GameMenuCardSize",
        "GameMenuHud",
        "GameMenuViewData",
        "GameMenuDecorTheme",
        ////////// Journey Menu //////////
        "JourneyCardConfig",
        "JourneyCardSize",
        "JourneyMenuHud",
        "JourneyMenuViewData",
        "JourneyMenuDecorTheme",
        ////////// Reward Menu //////////
        "RewardCardConfig",
        "RewardCardSize",
        "RewardMenuHud",
        "RewardMenuViewData",
        "RewardMenuDecorTheme",
        ////////// Wallet Menu //////////
        "WalletCardConfig",
        "WalletCardSize",
        "WalletMenuHud",
        "WalletMenuViewData",
        "WalletMenuDecorTheme",
        ////////// Promo Menu //////////
        "PromoCardConfig",
        "PromoCardSize",
        "PromoMenuHud",
        "PromoMenuViewData",
        "PromoMenuDecorTheme"
      ];
  
  return SheetDataKEYS;
}

function getOKViewsDataFromSheet()
{
  var dataFromSheet = [];
  var row = OKVIEWS_ROW_START;
  var lastRow = OKViewsCurSheet.getMaxRows();
  var isMainStart = false; 
  var isMainEnd = false; 
  
  for (var i = row; i <= lastRow; i++)
  {
    isMainStart = (OKViewsCurSheet.getRange("A" + i).getValue() + "" != "" ? true : false);
    isMainEnd = ((OKViewsCurSheet.getRange("A" + (i + 1)).getValue() + "" != "") || (i == lastRow) ? true : false);
    
      dataFromSheet.push
      ({
        "DATA_INDEX"            : i - row,
        "LAST"                  : (i == lastRow ? true : false),
        "MAIN_START"            : isMainStart,
        "MAIN_END"              : isMainEnd,
        "AMAINSTART_INDEX"      : (isMainStart ? i - row : 0),
        "AMAINEND_INDEX"        : (isMainEnd ? i - row : 0),
        ////////// Game Menu //////////
        "GameMenuCardConfig"    : OKViewsCurSheet.getRange("A"  + i).getValue() + "",
        "GameMenuCardSize"      : OKViewsCurSheet.getRange("B"  + i).getValue() + "",
        "GameMenuHud"           : OKViewsCurSheet.getRange("C"  + i).getValue() + "",
        "GameMenuViewData"      : OKViewsCurSheet.getRange("E"  + i).getValue() + "",
        "GameMenuDecorTheme"    : OKViewsCurSheet.getRange("G"  + i).getValue() + "",
        ////////// Journey Menu //////////
        "JourneyCardConfig"     : OKViewsCurSheet.getRange("H"  + i).getValue() + "",
        "JourneyCardSize"       : OKViewsCurSheet.getRange("I"  + i).getValue() + "",
        "JourneyMenuHud"        : OKViewsCurSheet.getRange("J"  + i).getValue() + "",
        "JourneyMenuViewData"   : OKViewsCurSheet.getRange("L"  + i).getValue() + "",
        "JourneyMenuDecorTheme" : OKViewsCurSheet.getRange("N"  + i).getValue() + "",
        ////////// Reward Menu //////////
        "RewardCardConfig"      : OKViewsCurSheet.getRange("O"  + i).getValue() + "",
        "RewardCardSize"        : OKViewsCurSheet.getRange("P"  + i).getValue() + "",
        "RewardMenuHud"         : OKViewsCurSheet.getRange("Q"  + i).getValue() + "",
        "RewardMenuViewData"    : OKViewsCurSheet.getRange("S"  + i).getValue() + "",
        "RewardMenuDecorTheme"  : OKViewsCurSheet.getRange("U"  + i).getValue() + "",
        ////////// Wallet Menu //////////
        "WalletCardConfig"      : OKViewsCurSheet.getRange("V"  + i).getValue() + "",
        "WalletCardSize"        : OKViewsCurSheet.getRange("W"  + i).getValue() + "",
        "WalletMenuHud"         : OKViewsCurSheet.getRange("X"  + i).getValue() + "",
        "WalletMenuViewData"    : OKViewsCurSheet.getRange("Z"  + i).getValue() + "",
        "WalletMenuDecorTheme"  : OKViewsCurSheet.getRange("AB" + i).getValue() + "",
        ////////// Promo Menu //////////
        "PromoCardConfig"       : OKViewsCurSheet.getRange("AC" + i).getValue() + "",
        "PromoCardSize"         : OKViewsCurSheet.getRange("AD" + i).getValue() + "",
        "PromoMenuHud"          : OKViewsCurSheet.getRange("AE" + i).getValue() + "",
        "PromoMenuViewData"     : OKViewsCurSheet.getRange("AG" + i).getValue() + "",
        "PromoMenuDecorTheme"   : OKViewsCurSheet.getRange("AI" + i).getValue() + ""
      });
  }
  
  return dataFromSheet;
}

function getOKViewsObject()
{
  var VIEWS_Object =  
      {
        "Landing": "GamesMenu",
        "Views": 
        {
          "PromoMenu": 
          {
            "ViewType": "default",
            "ScrollView": 
            {
              "LeftCardDistancePercent": 3.3,
              "RightCardDistancePercent": 3.3,
              "Transform": {
                "Position": "-333,-333,-333"
              },
            },
            "HudElements": [],
            "Decorators": [],
            "Decor": [],
            "MenuCards": 
            {
              "default": [],
              "wide": []
            }
          },
          "GamesMenu": 
          {
            "ViewType": "default",
            "ScrollView": 
            {
              "LeftCardDistancePercent": 4.4,
              "RightCardDistancePercent": 4.4,
              "Transform": {
                "Position": "-444,-444,-444"
              },
            },
            "HudElements": [],
            "Decorators": [],
            "Decor": [],
            "MenuCards": 
            {
              "default": [],
              "wide": []
            }
          },
          "JourneysMenu" : 
          {
            "ViewType": "default",
            "ScrollView": 
            {
              "LeftCardDistancePercent": 5.5,
              "RightCardDistancePercent": 5.5,
              "Transform": {
                "Position": "-555,-555,-555"
              },
            },
            "HudElements": [],
            "Decorators": [],
            "Decor": [],
            "MenuCards": 
            {
              "default": [],
              "wide": []
            }
          },
          "RewardsMenu" : 
          {
            "ViewType": "default",
            "ScrollView": 
            {
              "LeftCardDistancePercent": 6.6,
              "RightCardDistancePercent": 6.6,
              "Transform": {
                "Position": "-666,-666,-666"
              },
            },
            "HudElements": [],
            "Decorators": [],
            "Decor": [],
            "MenuCards": 
            {
              "default": [],
              "wide": []
            }
          },
          "WalletMenu": 
          {
            "ViewType": "default",
            "ScrollView": 
            {
              "LeftCardDistancePercent": 7.7,
              "RightCardDistancePercent": 7.7,
              "Transform": {
                "Position": "-777,-777,-777"
              },
            },
            "HudElements": [],
            "Decorators": [],
            "Decor": [],
            "MenuCards": 
            {
              "default": [],
              "wide": []
            }            
          }
        }
    };
  
  return VIEWS_Object;
}

function getDefaultGamesMenuDecoratorsArray()
{
  /// only decorator filled for now, setting as a flexable default for later use.
  
  var DGMDA = 
      [
        {
          "Key": "CouponRedemption",
          "MetaData": {
            "Menu": "GamesMenu"
          }
        },
        {
          "Key": "EarlyAccess",
          "MetaData": {
            "Menu": "GamesMenu"
          }
        },
        {
          "Key": "Leanplum",
          "MetaData": {
            "Menu": "GamesMenu"
          }
        }
      ];
  
  return DGMDA;
}