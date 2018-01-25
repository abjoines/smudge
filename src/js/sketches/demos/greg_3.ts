import { PBR, Material, BlendMode } from '../../index';
import { mat4 } from 'gl-matrix';
import * as voronoi from 'voronoi-diagram';

let pbr:PBR;
let pScale = 4; //512 is 1
export async function draw() {
     pbr = new PBR(undefined, 512*pScale, 512*pScale);

    //Tree Bark
    let baseMat = new Material();
    let baesCol = hexToRGB('#ff9e16');
    baseMat.red = baesCol.r;
    baseMat.green = baesCol.g;
    baseMat.blue = baesCol.b;
    baseMat.transparency = 1;
    baseMat.height = .8;
    baseMat.metallic = .2;
    baseMat.smoothness = .6;

    pbr.rect(0, 0, pbr.width,pbr.height, baseMat);

    let dotMat = new Material();
    // let dotCol = hexToRGB('#ffbe28');
    // dotMat.red = dotCol.r;
    // dotMat.green = dotCol.g;
    // dotMat.blue = dotCol.b;
    dotMat.red = undefined;
    dotMat.green = undefined;
    dotMat.blue = undefined;
    dotMat.emission_red = undefined;
    dotMat.emission_green = undefined;
    dotMat.emission_blue = undefined;
    dotMat.transparency = 1;
    dotMat.metallic = undefined;
    dotMat.smoothness = undefined;
    dotMat.height = undefined;

    let crackMat = new Material();
    let col = hexToRGB('#3a3a3a');
    crackMat.red = col.r;
    crackMat.green = col.g;
    crackMat.blue = col.b;
    // crackMat.red = undefined;
    // crackMat.green = undefined;
    // crackMat.blue = undefined;
    crackMat.emission_red = undefined;
    crackMat.emission_green = undefined;
    crackMat.emission_blue = undefined;

    crackMat.transparency = .9;
    crackMat.metallic = undefined;
    crackMat.smoothness = undefined;
    crackMat.height = .5;

    let deepCrackMat = new Material(crackMat);
    deepCrackMat.height = .3;

    let points:number[][] = [
        [.01,.01],[.01,.99],[.99,.99],[.99,.01]
    ];
/*
    for(let i=0; i<100; i++){
        let x = rRange(.1, .9);
        let y = rRange(.1, .9);
        points.push([x, y]);

        //dots
        // for(let d=0; d<rRange(20, 100); d++){
        //     let tempDot = new Material(dotMat);
        //     let col:string = dotColors[Math.floor(rRange(0, dotColors.length))];
        //     tempDot.red = hexToRGB(col).r;
        //     tempDot.green = hexToRGB(col).g;
        //     tempDot.blue = hexToRGB(col).b;

        //     let range = 60*pScale;
        //     let size = rRange(2,8)*pScale;
        //     pbr.ellipse(x *pbr.width + rRange(-range, range), y *pbr.height + rRange(-range, range) , size, size, tempDot);
        // }

    }
    */

    //make a bunch of lines, use the points from those for the voronoi
    let lCount:number = 8;
    for(let i=0; i<lCount; i++){
        let vLinePoints:number[][] =  getRiverLines(i/lCount, 0, 0, 1, .25, 10, 0, .1)[0];
        points = points.concat(vLinePoints);
    }


    //make a bunch of dots all around the center points


    let v = voronoi(points);
    console.log(v.positions);
    let scaleY=1;

    for(let i=0; i<v.cells.length; ++i){
        let linePoints:number[][] = [];
        let cell:number[] = v.cells[i];
        console.log(cell);

        // let size = 10;
        // let centerX = points[i][0]*pbr.width - size*.5;
        // let centerY = points[i][1]*pbr.height *scaleY- size*.5;

        // pbr.ellipse(centerX, centerY, size, size, crackMat);

        if(cell.indexOf(-1) >=0 ){
            console.log("found infinity");
            //ignore cells on the edge
            continue;
        };

        linePoints.push([v.positions[cell[0]][0] * pbr.width, v.positions[cell[0]][1] * pbr.height *scaleY]);
        for(var j=1; j<cell.length; ++j){

            let x = v.positions[cell[j]][0];
            let y = v.positions[cell[j]][1];

            linePoints.push([x * pbr.width, y * pbr.height*scaleY]);
        }

        let col:string = dotColors[Math.floor(rRange(0, dotColors.length))];
        dotMat.red = hexToRGB(col).r;
        dotMat.green = hexToRGB(col).g;
        dotMat.blue = hexToRGB(col).b;
        dotMat.smoothness = rRange(.2, .9);
        //draw the cell border
        pbr.line(linePoints,
            {width: 40*pScale,
            align: 'right',
            close: true},
            dotMat);

        pbr.line(linePoints,
            {width: 2*pScale,
            align: 'right',
            close: true},
            crackMat);

            //rRange(2, 9)*pScale

        // pbr.line(linePoints,
        //     {width: 7*pScale,
        //     align: 'right',
        //     close: true},
        //     deepCrackMat);


        //draw lines in to center
        // for(let n=0; n<linePoints.length; n++){
        //     let centerLine:number[][] = [];
        //     centerLine.push(linePoints[n]);
        //     centerLine.push( [points[i][0]*pbr.width, points[i][1]*pbr.height] );
        //     pbr.line(centerLine,
        //         {width: 3*pScale,
        //         align: 'center',
        //         close: false},
        //         deepCrackMat);
        // }


    }
    pbr.show();
    // pbr.show('height');
}
function drawBark(){



    //draw some narrower ones with some green
}
let dotColors:string[] = [
    '#ffbe28', '#dda011', '#efa510', '#f9be27', '#ffc942', '#ffd641',
    '#ffb641', '#ffac41', '#ffc67f'
];

function getRiverLines(startX:number, startY:number, dirX:number, dirY:number, maxLength:number, pointCount:number, branching=0, meander=.5){

    let x = startX;
    let y = startY;
    let lines:number[][][] = [];
    let points:number[][] = [[x,y]];


    let angle = Math.atan2(dirY, dirX);
    for(let p=0; p<pointCount; p++){
        let l = rRange(maxLength*.2, maxLength);
        x = x + l * Math.cos(angle);
        y = y + l * Math.sin(angle);
        points.push([x,y]);
        angle+= rRange(-meander,meander);
        if(Math.random()<branching){
            //add a branch
            let branchAngle = angle+((Math.random()*meander)-(meander*.5));
            let branchLines = getRiverLines(x, y, rRange(-1,1), rRange(-1,1), maxLength*.5,  10, rRange(0, branching*.5), meander);
            for(let b=0; b<branchLines.length; b++){
                //add each branch into the line list
                lines.push(branchLines[b]);
            }
        }
    }
    lines.push(points);
    //return all the lines trunk and branches
    return lines;
}

//utils
function rRange(_min:number, _max:number){
    return _min + (Math.random()*(_max-_min));
}
 function hexToRGB(hex:string, bit8=false){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(bit8){
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    return result ? {
        r: parseInt(result[1], 16)/255,
        g: parseInt(result[2], 16)/255,
        b: parseInt(result[3], 16)/255
    } : null;
 }


function resolveQuickly() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1);
    });
}
