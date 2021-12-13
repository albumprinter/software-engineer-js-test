import { fitImagesToCanvas } from "./canvas";

const canvas = { width: 1000, height: 1000 };
const images = [
  { width: 60, height: 50 },
  { width: 400, height: 500 },
  { width: 300, height: 500 },
  { width: 1400, height: 1000 }
];

 // the method result
 const result = fitImagesToCanvas(canvas, images);

// print to dom element
 document.getElementById("output").innerHTML = result ? JSON.stringify(result, null, 4) : "no value is given yet";