function setPosition(shape, x, y) {
  shape.setAttributeNS(null, 'cx', x);
  shape.setAttributeNS(null, 'cy', y);
}

shapes = [];
lastAdded = 0;

function createShape(frame) {
  var shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  var r = 5 + Math.random() * 15;
  var effect;
  var a = 0.1 + Math.random() * 0.2;

  shape.setAttributeNS(null, 'r',  r);
  shape.setAttributeNS(null, 'fill',  '#000');
  shape.setAttributeNS(null, 'opacity', a);
  shape.setAttributeNS(null, 'filter', r > 12 ? 'url(#blur-effect-1)' : 'url(#blur-effect-2)');

  return {
      shape: shape,
      start: frame,
      duration: 6 + Math.random() * 4,
      velocity: 50 + Math.random() * 100,
      x: Math.random() * 500,
      y: 20 + Math.random() * 1000
    };
}


function loop(svg, frame) {
  // remove old circles
  for (var i = 0; i < shapes.length; i++) {
    if (frame > shapes[i].start + shapes[i].duration) {
      svg.removeChild(shapes[i].shape);
      shapes.splice(i, 1);
      i--;
    }
  }

  // add new circle every time interval
  if (frame - lastAdded > 0.3) {
    var shape = createShape(frame);

    svg.appendChild(shape.shape);
    shapes.push(shape);

    lastAdded = frame;
  }

  // update positions
  for (var i = 0; i < shapes.length; i++) {
    var s = shapes[i];
    setPosition(s.shape, s.x + (frame - s.start) * s.velocity, s.y);
  }
}

function main() {
  var svg = document.getElementById('svg');
  var start = new Date().getTime();

  // create many circles
  for (var i = 0; i < 10; i++) {
    var shape = createShape(0);

    svg.appendChild(shape.shape);
    shapes.push(shape);
  }

  setInterval(function() {
    loop(svg, (new Date().getTime() - start) / 1000);
  }, 30);
}
