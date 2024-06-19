let shapes = [];
let canvas;

function setup() {
  // 
}

function draw() {
  if (!canvas && windowWidth > 0 && windowHeight > 0) {
    canvas = createCanvas(windowWidth, windowHeight);
    console.log(windowWidth, windowHeight);
    canvas.elt.style.zIndex = "-1";
  } else {
    blendMode(HARD_LIGHT);
    drawShapes();
    if (shapes.length >= 10) {
      noLoop();
    }
  }
}

function drawShapes() {
  push();
  translate(
    random(width * 0.1, width * 0.9),
    random(height * 0.1, height * 0.9)
  );
  imageMode(CENTER);
  // tint(255, 180);
  let size = (width + height) / 2;
  if (width < 800) {
    let adj = map(width, 400, 800, 2.0, 1.0);
    size *= adj;
  }

  let shape = new ShapeImage(size * random(0.2, 1.0));
  shape.show();
  pop();

  shapes.push(shape);
}

window.addEventListener("resize", () => {
  if (p5) {
    canvas = createCanvas(windowWidth, windowHeight);
    shapes = [];
    loop();
  }
});