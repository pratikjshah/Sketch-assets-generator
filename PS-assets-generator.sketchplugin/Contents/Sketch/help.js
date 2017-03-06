/*----------------------------------------------------------

author: Pratik Shah
Homepage: https://github.com/pratikjshah/Sketch-assets-generator
license: MIT

----------------------------------------------------------*/

var reportIssue = function(context) {
    openUrlInBrowser("https://github.com/pratikjshah/Sketch-assets-generator/issues/");
}

var aboutPratikShah = function(context) {
  openUrlInBrowser("http://pratikshah.website");
}

function openUrlInBrowser(url) {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
}

function getRemoteJson(url) {
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
    var content = NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding);
    return JSON.parse(content);
}

function createDownloadWindow(context) {
  // Setup the window
  var alert = COSAlertWindow.new();
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("PS-export.png").path()));
  alert.setMessageText("New version available");
  alert.setInformativeText("Export Generator "+ context.plugin.version() + " is out of date!");
  alert.addButtonWithTitle("Download");
  alert.addButtonWithTitle("Cancel");
  return [alert];
}

function showAvailableUpdateDialog(context) {
  //context.document.showMessage("inside showAvailableUpdateDialog");
  var window = createDownloadWindow(context);
  var alert = window[0];
  // When “Ok” is clicked
  var response = alert.runModal();
  if (response == "1000") {
    //context.document.showMessage("Go to download");
    openUrlInBrowser("https://github.com/pratikjshah/Sketch-assets-generator/archive/master.zip");
  }
}

function checkForUpdate(context) {
  //context.document.showMessage("inside update:");

    var remoteManifestUrl = "https://raw.githubusercontent.com/pratikjshah/Sketch-assets-generator/master/PS%20assets%20generator.sketchplugin/Contents/Sketch/manifest.json";
    //var remoteManifestUrl = "https://raw.githubusercontent.com/pratikjshah/Sketch-assets-generator/master/PS-assets-generator.sketchplugin/Contents/Sketch/manifest.json";
    var remoteManifest = getRemoteJson(remoteManifestUrl);
    //context.document.showMessage("remoteManifest: " + remoteManifest.version);
    if (remoteManifest.version) {
        if (context.plugin.version() == remoteManifest.version) {
          context.document.showMessage(configData.pluginName+" " + configData.localVersion + " is currently the newest version available.");
        } else {
          //context.document.showMessage("need update:");
          showAvailableUpdateDialog(context);
        }
    } else {
      //context.document.showMessage("can not check:");
      showAvailableUpdateDialog(context);
    }
}
