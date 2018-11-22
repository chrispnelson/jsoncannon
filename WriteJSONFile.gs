function myTrim(x) 
{
    return x.replace(/\s/gm,'');
}

function scanFolders()
{
  var folders = DriveApp.searchFolders('starred = true and "me" in owners');
  while (folders.hasNext()) {
    var folder = folders.next();
    Logger.log(folder.getName());
  }
}

function saveFileData(json_obj,json_fileName) 
{
  var folders = DriveApp.getFoldersByName("JSON");
  
  if (folders.hasNext()) {
    var folder = folders.next();
    saveData(folder, json_fileName, json_obj);
  }
}

// write the configuration data to JSON document on the Google Drive
function saveData(folder, fileName, contents) 
{
  var _fn_ = myTrim(fileName);
  var children = folder.getFilesByName(_fn_);
  var file = null;
  
  if (children.hasNext()) 
  {
    file = children.next();
    file.setContent(contents);
  } 
  else 
  {
    file = folder.createFile(_fn_, contents);
  }
}
