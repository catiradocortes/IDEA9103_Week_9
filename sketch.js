let img; // mona lisa image

let fit = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  new_property: 67
};

let segments = [];

let numSegments = 50;


let drawSegmetns = true;

function preload(){
  img = loadImage("/assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateFit();

  for (let row = 0; row < numSegments; row++){
    for (let col = 0; col < numSegments; col++){
      let segment = new ImageSegment(row, col);
      segments.push(segment);
    }
  }
}

function draw() {
  background(220);

  if (drawSegmetns){
    for (const segment of segments){
      segment.draw();
    }
  } else{
    image(img, fit.x, fit.y, fit.w, fit.h);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  calculateFit();
}

function calculateFit(){
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  if (imgAspect > canvasAspect){
    fit.w = width;
    fit.h = width/ imgAspect;
  } else{
    fit.h = height;
    fit.w = height * imgAspect;
  }

  fit.x = (width - fit.w) / 2;
  fit.y = (height - fit.h) / 2;

}


class ImageSegment {
  constructor(row, col){
    this.row = row;
    this.col = col;

    this.color = this.sampleColour();

  }

sampleColour(){
  let sampleW = img.width/numSegments;
  let sampleH = img.height / numSegments;

  let x = this.col * sampleW + sampleW / 2;
  let y = this.row * sampleH + sampleH / 2;

  return img.get(x, y);
}

draw(){
  let w = fit.w / numSegments;
  let h = fit.h / numSegments;

  let x = fit.x + this.col * w;
  let y = fit.y + this.row * h;

  stroke(0);
  fill(this.color);
  rect(x, y, w, h);
}

}

