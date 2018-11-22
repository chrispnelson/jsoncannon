function createAMenu() 
{
   // Checklist Menu
   var menu = SpreadsheetApp.getUi().createMenu("MVM-Config-Output-Menu");
  
   menu.addItem('[1] Write Lite Event, JSON OUTPUT File', 'processLiteEvent');
   menu.addItem('[2] Write Lite Event with PS2D, JSON OUTPUT File', 'processLiteEventLiteConfigPS2D');
   
   menu.addSeparator();
   menu.addItem('[3] [Card Config] Write GamesMenu, JSON Object', 'processOKWriteJSON');
   menu.addItem('[4] [Card Config] Write OK Views, JSON Object', 'processOKViewsOutputJSON');
   
   menu.addSeparator();
   menu.addItem('[5] [Override] Write Game Card , JSON OUTPUT File', 'processOverride');
  
   menu.addToUi();
  
  //////////////////////////////////////////////////////////////////////
  //   menu.addSeparator().addSubMenu(_lm_);
  //////////////////////////////////////////////////////////////////////
  

}