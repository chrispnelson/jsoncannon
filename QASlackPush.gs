////////////////////////////////////////////////////////////////////
//
// SlackPush(_message_) - primary messaging caller function for script.
//                      _message_ - string parameter can contain anything e.g. URL, messages, links, or data output.
// 
// sendHttpPost(message, username) - call to send post to SLACK
// 
// SLACK bot had to be configured for this to work.
// 
// Purpose to be defined later.
//
// Author: Christopher Nelson
//
////////////////////////////////////////////////////////////////////

var __SlackUSR = "Config-Bototron";
//var __defaultIMG = "https://playstudios.atlassian.net/secure/attachment/27818/IMG_0093.jpg";
//var __defaultIMG = "http://artfiles.alphacoders.com/372/37211.gif";
var __defaultIMG = "http://www.playstudios.com/wp-content/themes/cockerel_s/images/logo.png";
var __defaultColorMSG = "#bedca8";

var __thisSheetDoc = SpreadsheetApp.getActiveSpreadsheet();
var slackThisSheetName = __thisSheetDoc.getName();

var __thisSheetURL = __thisSheetDoc.getUrl();
var __thisSheetGID = __thisSheetDoc.getActiveSheet().getSheetId();
var __thisSheetInd = __thisSheetDoc.getActiveRange().getSheet().getIndex();

//var __ssUrl = __thisSheetDoc.getUrl()+"#gid="+__thisSheetGID;

var __ssUrl = "https://drive.google.com/open?id=1muk_m5rnIvgIwdfHFS6cCY20_VlpE5uc";

//var __lead = ReadLead();

// mvm-leads
var __channel01 = "#mvm-leads";
var __hook01 = "https://hooks.slack.com/services/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";

// mvm-qa-testplan-docs
var __channel02 = "#mvm-qa-testplan-docs";
var __hook02 = "https://hooks.slack.com/services/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";
// mvm-leads
var __channel03 = "mvm-leads";
var __hook03 = "https://hooks.slack.com/services/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";
// amber-ps
var __channel04 = "amber-ps";
var __hook04 = "https://hooks.slack.com/services/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";

// keywords-ps
var __channel05 = "#keywords-mvm";
var __hook05 = "https://hooks.slack.com/services/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";

var destHook = "";
var destChannel = "";

// Menu Funciton 1
function checkMeNowSlack() 
{
  setDestHook(1);
  SlackPush("Config Link is here for testing");
}

// Menu Funciton 2
function checkMeNowSlack2() 
{
  setDestHook(2);
  SlackPush("Config Link is here for review");
}

// Menu Funciton 3
function checkMeNowSlack3() 
{
  setDestHook(3);
  SlackPush("Config Link is here for review");
}

// Menu Funciton 4
function checkMeNowSlack4() 
{
  setDestHook(4);
  SlackPush("Config Link is here for testing");
}

// Menu Funciton 5
function checkMeNowSlack5() 
{
  setDestHook(5);
  SlackPush("Config Link is here for testing");
}

// Main caller function
function SlackPush(_message_) 
{
  sendHttpPost(_message_, __SlackUSR, __defaultIMG, __ssUrl, "JSON Config File");
  
}// end function SlackPush()

// pick channel for posting checklist stuff to slack bots.
function setDestHook(_destVal_)
{
  if (_destVal_ == 1) 
  {
    destHook = __hook01;
    destChannel = __channel01;
  }
  
  if (_destVal_ == 2)
  {
    destHook = __hook02;
    destChannel = __channel02;    
  }
  
  if (_destVal_ == 3)
  {
    destHook = __hook03;
    destChannel = __channel03;    
  }
  
  if (_destVal_ == 4)
  {
    destHook = __hook04;
    destChannel = __channel04;    
  }
  
  if (_destVal_ == 5)
  {
    destHook = __hook05;
    destChannel = __channel05;    
  }
}

// meat and potatoes
function sendHttpPost(_message_, _username_, _imageURL_, _mainLinkURL_, _mainLinkLabel_)
{
  var __postHookUrl = destHook;
  var __postBotChannel = destChannel;
  
  var jsonData =
  {
    "attachments": [
        {
          "channel"    : __postBotChannel,
          "username"   : _username_,
          "pretext"    : "Config.",
          "title"      : _mainLinkLabel_,
          "title_link" : _mainLinkURL_,
          "image_url"  : _imageURL_,
          "text"       : _message_,
          "color"      : __defaultColorMSG
        } 
      ]
  };// end jsonData 
  
  var payload = JSON.stringify(jsonData);
  
  var options =
  {
    "method"      : "post",
    "contentType" : "application/json",
    "payload"     : payload
  };
 
  UrlFetchApp.fetch(__postHookUrl, options);
  
}// end function sendHttpPost()
