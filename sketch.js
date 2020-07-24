var mic;
var fft;
var recordHighLevel = 0;

var recordHighLevel = 5;
var video;
var vScale = 16;

var particles = [];
let font;
function preload(){
font= loadFont('data/qigong-regular.otf');
}

var slider;

function setup() {
 var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent=('sketchholder');
  bg=loadImage('data/sky.jpg');
  //Start mic/ FFT
  mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT();
	fft.setInput(mic);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  for (var i = 0; i < 200; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  slider = createSlider(0, 255, 127);
  background(bg);
}

function draw() {
  background(bg);
  fft.analyze();
  video.loadPixels();
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
     var midEnergy = fft.getEnergy('mid');
    textSize(midEnergy);
    frameRate(15);
    noStroke();
    textLeading(40);
    textFont(font);
    textAlign(CENTER);
  text('Meta\nCortex',width/2,height/2);
  }
}
