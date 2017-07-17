var getPixels = require("get-pixels");
var NodeSynth = require('nodesynth');
var pad = require('pad-left');
require('nodesynth/notes');

var notes = [C4, D4, E4, F4, G4, A5, B5, C5]
var image = process.argv[2];
var width;
var height;

var pixels_map;
getPixels(image, function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return
  }

  var dimensions = pixels.shape;
  var blob_width = Math.floor(pixels.shape[0]/5);
  var blob_height = Math.floor(pixels.shape[1]/5);

for (ii=0;ii<5;ii++)
{
  for (jj=0;jj<5;jj++)
  {
  console.log(pixelatedBlob(pixels, ii, jj,blob_width, blob_height));
  }
}

})

function pixelatedBlob(pixels, x,y, width, height) {
  //playPixels(pixels);
  var red = 0;
  var green = 0;
  var blue = 0;

  var x_start = x*width;
  var x_end = x_start + width;
  var y_start = y*height;
  var y_end = y_start + height;

  for (var xx=x_start; xx<x_end;xx++)
  {
      for (var yy=y_start;yy<y_end;yy++) {
        red += pixels.get(xx,yy,0);
        green += pixels.get(xx,yy,1);
        blue += pixels.get(xx,yy,2);
      }
  }
  return pad(Math.round(red/62500).toString(16),2,'0') + pad(Math.round(green/62500).toString(16),2,'0') +  pad(Math.round(blue/62500).toString(16),2,'0');
}

function playPixels(pixels) {

  var ns = new NodeSynth.Synth({bitDepth: 16, sampleRate: 44100});
  ns.play();
  //ns.source = new NodeSynth.Oscillator('cos', function(t){return notes[pixels.get(Math.ceil(t*10)]*4,0)});
}
