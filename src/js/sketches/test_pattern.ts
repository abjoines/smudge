import PBR from '../pbr2';
import {Material} from '../pbr2';

export default function draw() {

    let pbr = new PBR(undefined, 128, 128, 8);

    const clear = new Material(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0);

    const red = new Material(1.0, 0.0, 0.0, 1.0);
    red.height = .25;
    red.metallic = 1.0;
    red.smoothness = .5;
    red.emission_red = 1.0;
    

    const green = new Material(0.0, 1.0, 0.0, 1.0);
    green.height = .5;
    green.metallic = 1.0;
    green.smoothness = .5;

    const blue = new Material(0.0, 0.0, 1.0, 1.0);
    blue.height = 1.0;
    blue.metallic = 1.0;
    blue.smoothness = .5;


    pbr.clear();


    // anti-alias check
    pbr.rect(10, 10, 10, 10, blue); // clean edges
    pbr.rect(30.25, 10, 10, 10, red); // .75 left, .25 right
    pbr.rect(50.5, 10, 10, 10, green); // .5 left/right

    // corners
    pbr.rect(0, 0, 1, 1);
    pbr.rect(1, 1, 1, 1);

    pbr.rect(127, 0, 1, 1);
    pbr.rect(126, 1, 1, 1);

    pbr.rect(127, 127, 1, 1);
    pbr.rect(126, 126, 1, 1);

    pbr.rect(0, 127, 1, 1);
    pbr.rect(1, 126, 1, 1);


    // hdr test
    // draws a red bar and covers it with many layers of very transparent black
    // in HDR, left side should become pure black
    // in LDR, left side will get stuck at dark red due to LDR rounding
    const black_fade = new Material(0.0, 0.0, 0.0, .01);

    pbr.rect(10, 30, 100, 10, red);
    for (let x = 0; x < 400; x++) {
        pbr.rect(10, 30, x / 4, 10, black_fade);
    }



    // channel skip test
    let makeBlank = function() {
        return new Material(
        undefined, undefined, undefined, undefined,
        undefined, undefined,
        undefined,
        undefined, undefined, undefined);
    }

    let rgbm_mat = makeBlank();
    rgbm_mat.red = 1.0;
    rgbm_mat.green = 0.0;
    rgbm_mat.blue = 0.0;
    rgbm_mat.metallic = .5;
    rgbm_mat.transparency = 1.0;
    pbr.rect(10, 50, 10, 10, rgbm_mat);


    let m_mat = makeBlank();
    m_mat.red = undefined;
    m_mat.green = 1.0;
    m_mat.blue = undefined;
    m_mat.metallic = 1.0;  
    m_mat.transparency = 1.0;  
    pbr.rect(12, 52, 10, 10, m_mat);
    // this rectangle should overwrite the metalic + green values, 
    // but skip the red and blue values (and all others)


    // test dithering (not implemented)
    // to hard to see bands as is. need a tone mapper to bring it out.
    // const green_gradient = new Material(0.0, 0.1, 0.0, 1.0);
    // for (let x = 0; x < 100; x++) {
    //     green_gradient.green += .002;
    //     pbr.rect(10 + x, 50, 1, 10, green_gradient);
    // }



    pbr.show();


}
