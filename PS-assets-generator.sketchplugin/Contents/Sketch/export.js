/*----------------------------------------------------------

author: Pratik Shah
Homepage: https://github.com/pratikjshah/Sketch-assets-generator
license: MIT

----------------------------------------------------------*/


var SIZES = []; // e.g. [16, 32, 128, 256, 512]
var SCALES = [];

function setScale(scales) {
  SCALES = scales;
}

function prepareExportSizes(layer, format) {
  //log('=== ' + layer.name() + ' ===');
  //log('Remove all export sizes of layer \'' + layer.name() + '\'.');
  var sizes = layer.exportOptions().exportFormats();
  layer.exportOptions().removeAllExportFormats();

  SCALES.forEach(function(scale) {
    addExportSize(layer, scale.size, scale.suffix, format);
  });

  // for each (var scale in SCALES) {
  //   addExportSize(layer, scale.size, scale.suffix);
  // }

  // for (var i = 0; i < SCALES.length; i++) {
  //   scale = SCALES[i];
  //   addExportSize(layer, scale.size, scale.suffix);
  // }

  // add and remove a new export size to refresh UI
  layer.exportOptions().addExportFormat();
  layer.exportOptions().removeExportFormat(layer.exportOptions().exportFormats().objectAtIndex(layer.exportOptions().exportFormats().count() -1));
}


function addExportSize(layer, scale, suffix, format) {

  if ( !format || typeof(format) == "undefined") {
    format = "png";
  }
  //log('Add \'' + layer.name() + suffix + '\' (' + scale + 'h' + ')');

  // var size = layer.exportOptions().addExportFormats();
  var size = layer.exportOptions().addExportFormat();
  log('***** size ******');
  //log(size);
  //log(size);
  size.setName(suffix);
  //log('set scale.');
  //log(scale);
  size.setScale(scale);

  size.fileFormat = format;
  // size.name = suffix;
  // size.scale = scale;
  log(size.fileFormat);
  // size.setFormat(format);
  //size.setVisibleScaleType(2); // e.g. 512h
}

function runExportIOS(context) {
  runExport(context);
}

function runExportAndroid(context) {
  runExport(context);
}

function runExportPDF(context) {
  runExport(context, "pdf");
}

function runExportSVG(context) {
  runExport(context, "svg");
}


function runExport(context, format) {

  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();

  if (selectedCount == 0) {
    //log('No layers are selected.');
    return;
  }

  // use this if you want to override default scales for IOS and Android
  //prompt();

  for (var i = 0; i < selectedCount; i++) {
    var layer = selectedLayers[i];
    if (i != 0) {
      log("");
    }
    prepareExportSizes(layer, format);
  }
  context.document.currentPage().deselectAllLayers();
  log("\nDone.");
}

function runClear(context) {
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();
  if (selectedCount == 0) {
    //log('No layers are selected.');
    return;
  }
  for (var i = 0; i < selectedCount; i++) {
    var layer = selectedLayers[i];
    if (i != 0) {
      log("");
    }
    var sizes = layer.exportOptions().exportFormats()
    layer.exportOptions().removeAllExportFormats();
  }
  context.document.currentPage().deselectAllLayers();
}
