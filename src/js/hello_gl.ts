// declare var require: any;

// import {mat4} from 'gl-matrix';



// var gl;
// function initGL(canvas) {
//     try {
//         console.log("try", canvas);
//         gl = canvas.getContext('webgl');
//         console.log("gl", gl);
//         gl.viewportWidth = canvas.width;
//         gl.viewportHeight = canvas.height;
//     } catch (e) {
//     }
//     if (!gl) {
//         alert("Could not initialise WebGL, sorry :-(");
//     }



// }
// // function getShader(gl, id) {
// //     var shaderScript = document.getElementById(id);
// //     if (!shaderScript) {
// //         return null;
// //     }
// //     var str = "";
// //     var k = shaderScript.firstChild;
// //     while (k) {
// //         if (k.nodeType == 3) {
// //             str += k.textContent;
// //         }
// //         k = k.nextSibling;
// //     }
// //     var shader;
// //     if (shaderScript.type == "x-shader/x-fragment") {
// //         shader = gl.createShader(gl.FRAGMENT_SHADER);
// //     } else if (shaderScript.type == "x-shader/x-vertex") {
// //         shader = gl.createShader(gl.VERTEX_SHADER);
// //     } else {
// //         return null;
// //     }
// //     gl.shaderSource(shader, str);
// //     gl.compileShader(shader);
// //     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
// //         alert(gl.getShaderInfoLog(shader));
// //         return null;
// //     }
// //     return shader;
// // }
// var shaderProgram;
// function initShaders() {
//     // var fragmentShader = getShader(gl, "shader-fs");
//     // var vertexShader = getShader(gl, "shader-vs");
//     var vertexShaderSource = require("../glsl/basic_vertex.glsl");
//     var fragmentShaderSource = require("../glsl/basic_fragment.glsl");


//     let vertexShader = gl.createShader(gl.VERTEX_SHADER);
//     gl.shaderSource(vertexShader, vertexShaderSource);
//     gl.compileShader(vertexShader);

//     let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
//     gl.shaderSource(fragmentShader, fragmentShaderSource);
//     gl.compileShader(fragmentShader);



//     shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//         alert("Could not initialise shaders");
//     }
//     gl.useProgram(shaderProgram);
//     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
//     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
//     shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
//     shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
// }
// var mvMatrix = mat4.create();
// var pMatrix = mat4.create();
// function setMatrixUniforms() {
//     gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
//     gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
// }
// var triangleVertexPositionBuffer;
// var squareVertexPositionBuffer;
// function initBuffers() {
//     triangleVertexPositionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
//     var vertices = [
//         0.0, 1.0, 0.0,
//         -1.0, -1.0, 0.0,
//         1.0, -1.0, 0.0
//     ];
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//     triangleVertexPositionBuffer.itemSize = 3;
//     triangleVertexPositionBuffer.numItems = 3;
//     squareVertexPositionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
//     vertices = [
//         1.0, 1.0, 0.0,
//         -1.0, 1.0, 0.0,
//         1.0, -1.0, 0.0,
//         -1.0, -1.0, 0.0
//     ];
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//     squareVertexPositionBuffer.itemSize = 3;
//     squareVertexPositionBuffer.numItems = 4;
// }
// function drawScene() {
//     gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
//     mat4.identity(mvMatrix);
//     mat4.translate(mvMatrix, mvMatrix, [-1.5, 0.0, -7.0]);
//     gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
//     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
//     setMatrixUniforms();
//     gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
//     mat4.translate(mvMatrix, mvMatrix, [3.0, 0.0, 0.0]);
//     gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
//     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
//     setMatrixUniforms();
//     gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
// }


// export function webGLStart() {
//     var canvas = document.getElementById("gl-canvas");
//     initGL(canvas);
//     initShaders();
//     initBuffers();
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.enable(gl.DEPTH_TEST);
//     drawScene();
// }
