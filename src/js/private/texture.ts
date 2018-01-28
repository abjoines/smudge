import { consoleTrace, consoleReport, consoleError } from '../logging';

export class Texture {
    public readonly texture: WebGLTexture;
    public loaded: boolean;
    private image: HTMLImageElement;

    constructor(readonly name = "unnamed", readonly gl: WebGLRenderingContext) {
        this.texture = gl.createTexture();
    }

    public load(src: string) {
        return new Promise((resolve, reject) => {
            this.image = new Image();

            this.image.onload = () => {
                consoleTrace(`${this} Loaded Succeeded: ${src}`);
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
                this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
                this.gl.bindTexture(this.gl.TEXTURE_2D, null);
                this.loaded = true;
                resolve();
            };

            this.image.onerror = (error) => {
                consoleError(`${this} Loaded Failed: ${src}`, error);
                this.loaded = false;
                resolve(); // image couldn't be found, but carry on anyway
            };

            // this.image.src = "images/a.png";
            this.image.src = src;
        });
    }

    public toString(): string {
        return `Texture "${this.name}"`;
    }

}
