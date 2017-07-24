var getPixels = require("get-pixels");
var NodeSynth = require('nodesynth');
var pad = require('pad-left');
require('nodesynth/notes');

let notes = [C4, D4, E4, F4, G4, A5, B5, C5]
var notes_to_play = []
var image = process.argv[2];
var width;
var height;
const squares = 5;
var pixels_map;

getPixels(image, function(err, pixels) {

  if(err) {
    console.log("Bad image path")
    return
  }

  var dimensions = pixels.shape;
  var blob_width = Math.floor(pixels.shape[0]/squares);
  var blob_height = Math.floor(pixels.shape[1]/squares);

for (ii=0;ii<squares;ii++)
{
  for (jj=0;jj<squares;jj++)
  {
    blob = pixelatedBlob(pixels, ii, jj,blob_width, blob_height);
    blob_as_percentage = blob / (256*256*256);
    notes_to_play.push(Math.round(notes.length*blob_as_percentage)) ;

  }
}
console.log(notes_to_play);
playPixels(notes_to_play);

})

function pixelatedBlob(pixels, x,y, width, height) {
  //playPixels(pixels);
  var red = 0;
  var green = 0;
  var blue = 0;
  var pixels_in_blob = width*height;

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
  return (Math.round(red/pixels_in_blob) * 65536) + (Math.round(green/pixels_in_blob)* 256) + Math.round(blue/pixels_in_blob);
}

function playPixels(notes)
{
  var ns = new NodeSynth.Synth({bitDepth: 16, sampleRate: 44100});
  ns.play();
  ns.source = new NodeSynth.Oscillator('sin', function(t){return 293 + 29 * notes[Math.floor(t)%(squares*squares)]});
}
