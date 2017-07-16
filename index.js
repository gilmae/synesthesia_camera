var getPixels = require("get-pixels");
var NodeSynth = require('nodesynth');
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
  //playPixels(pixels);
  var red = 0;
  var green = 0;
  var blue = 0;

  for (ii=0; ii<250;ii++)
  {
      for (jj=0;jj<250;jj++) {
        red += pixels.get(ii,jj,0);
        green += pixels.get(ii,jj,1);
        blue += pixels.get(ii,jj,2);
      }
  }

  console.log(Math.round(red/62500).toString(16), Math.round(green/62500).toString(16), Math.round(blue/62500).toString(16));
})


function playPixels(pixels) {

  var ns = new NodeSynth.Synth({bitDepth: 16, sampleRate: 44100});
  ns.play();
  //ns.source = new NodeSynth.Oscillator('cos', function(t){return notes[pixels.get(Math.ceil(t*10)]*4,0)});
}
