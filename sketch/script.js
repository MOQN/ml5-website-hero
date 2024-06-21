const IMAGE_SIZE = 180;
const MAX_ATTEMPTS = 100;
let imgFolderPath = "images/color/"
let imgPaths = [
  'black-box.png',
  'body-segmentation.png',
  'bodypose.png',
  'classification.png',
  'contribute.png',
  'contributor-notes.png',
  'facemesh.png',
  'facemesh-for-fun.png',
  'faq.png',
  'getting-started.png',
  'handpose.png',
  'image-classifier.png',
  'neural-network-01.png',
  'neural-network-02.png',
  'next-steps.png',
  'overview.png',
  'sentiment.png',
  'sound-classifier.png',
  'teachable-machine.png'
];

let canvas;
let images = [];
let positions = [];
let minDistance = IMAGE_SIZE;
let maxAttempts = 100; // maximum number of attempts to find a valid position

function preload() {
  for (let i = 0; i < imgPaths.length; i++) {
    images[i] = loadImage(imgFolderPath + imgPaths[i]);
  }
}

function setup() {
  // 
}

function draw() {
  if (!canvas && windowWidth > 0 && windowHeight > 0) {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.elt.style.zIndex = "-1";
  } else {
    for (let img of images) {
      let validPosition = false;
      let pos;
      let attempts = 0;

      while (!validPosition && attempts < MAX_ATTEMPTS) {
        let x = random(IMAGE_SIZE / 2, width - IMAGE_SIZE / 2);
        let y = random(IMAGE_SIZE / 2, height - IMAGE_SIZE / 2);
        pos = createVector(x, y);
        validPosition = true;
        for (let existingPos of positions) {
          if (p5.Vector.dist(pos, existingPos) < minDistance) {
            validPosition = false;
            break;
          }
        }
        attempts++;
      }
      if (validPosition) {
        positions.push(pos);
        drawImage(img, pos.x, pos.y);
      } else {
        console.log("Could not place image after " + MAX_ATTEMPTS + " attempts.");
      }
    }
    noLoop();
  }
}

function drawImage(img, x, y) {
  push();
  translate(x, y);
  imageMode(CENTER);
  scale(random(0.8, 1.2));
  rotate(random(-PI / 8, PI / 8));
  image(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
  pop();
}

window.addEventListener("resize", () => {
  if (p5) {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.elt.style.zIndex = "-1";
    loop();
  }
});