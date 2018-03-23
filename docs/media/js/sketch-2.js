let { Material2, Smudge, SmudgeUI } = smudge;

// create a smudge instance
const s = new Smudge(undefined, 512, 512);

// show the ui
const ui = new SmudgeUI(s, document.getElementById('example-2'));

// clear the drawing
s.clear();

// draw a rect
const simpleRed = new Material2();
simpleRed.albedo.color = [1, 1, 0];
s.rect(0, 0, 200, 200, simpleRed);

// show albedo in ui
s.show();
ui.updatePBR();