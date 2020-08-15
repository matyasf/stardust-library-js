import {Particle} from "..";

export class WebGLRenderer {

    texSmoothing?: number; // TODO strongly type it
    blendMode: string = "normal"; // TODO strongly type it
    premultiplyAlpha: boolean = true;
    canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = document.createElement('canvas');
        const gl = this.canvas.getContext("webgl"); // Needs "webgl2" for OpenGL ES 3.0

        // Only continue if WebGL is available and working
        if (gl === null) {
            console.log("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
        // Set clear color to black, fully opaque
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    advanceTime(mParticles: Particle[]) {

    }

    setTextures() {

    }
}
