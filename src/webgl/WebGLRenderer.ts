import {Frame, Particle, ShaderProgram, Shaders, StardustMath, WebGLParticleBuffers} from "..";

export class WebGLRenderer {

    texSmoothing?: number; // TODO strongly type it
    blendMode: string = "normal"; // TODO strongly type it
    premultiplyAlpha: boolean = true;
    canvas: HTMLCanvasElement;
    private static _initCalled: boolean = false;
    private static _numberOfVertexBuffers: number = 0;
    private static _maxParticles: number = 0;
    static readonly maxPossibleParticles = 50000;
    private _mNumParticles: number = 0;
    private _vertexes: Float32Array|undefined;
    private _frames: Frame[] = [];

    static readonly sCosLut: number[] = []; // lookup tables TODO figure out if this is worth it
    static readonly sSinLut: number[] = [];

    constructor() {
        this.canvas = document.createElement('canvas');
        const gl = this.canvas.getContext("webgl2"); // Needs "webgl2" for OpenGL ES 3.0

        // Only continue if WebGL is available and working
        if (gl === null) {
            console.log("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
        /*
        // Set clear color to black, fully opaque
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);
        */
        if (!WebGLRenderer._initCalled) {
            WebGLRenderer.init(gl);
        }
    }

    static init(gl: WebGL2RenderingContext, numberOfBuffers = 2, maxParticlesPerBuffer = WebGLRenderer.maxPossibleParticles) {
        WebGLRenderer._initCalled = true;
        WebGLRenderer._numberOfVertexBuffers = numberOfBuffers;
        if (maxParticlesPerBuffer > WebGLRenderer.maxPossibleParticles)
        {
            console.log("Stardust WARNING: Tried to render more than possible max amount of particles (" +
                maxParticlesPerBuffer + ", setting value to max");
            maxParticlesPerBuffer = WebGLRenderer.maxPossibleParticles;
        }
        WebGLRenderer._maxParticles = maxParticlesPerBuffer;
        WebGLParticleBuffers.createBuffers(gl, maxParticlesPerBuffer, numberOfBuffers);

        if (!this._initCalled)
        {
            for (let i = 0; i < 0x800; ++i)
            {
                this.sCosLut[i & 0x7FF] = Math.cos(i * 0.00306796157577128245943617517898); // 0.003067 = 2PI/2048
                this.sSinLut[i & 0x7FF] = Math.sin(i * 0.00306796157577128245943617517898);
            }
            //TODO handle a lost device context?
            //SparrowSharp.ContextCreated += SparrowSharpOnContextCreated;
            WebGLParticleBuffers.createBuffers(gl, this._maxParticles, this._numberOfVertexBuffers);
            this._initCalled = true;
        }
    }

    setTextures() {
        // TODO
    }

    advanceTime(mParticles: Particle[]) {
        this._mNumParticles = mParticles.length;
        this._vertexes = new Float32Array(this._mNumParticles * 32); // this is a bottleneck
        for (let i = 0; i < this._mNumParticles; ++i) {
            const vertexId = i << 2;
            const particle = mParticles[i];
            // color & alpha
            const particleAlpha = particle.alpha;
            let red;
            let green;
            let blue;
            if (this.premultiplyAlpha) {
                red = particle.colorR * particleAlpha;
                green = particle.colorG * particleAlpha;
                blue = particle.colorB * particleAlpha;
            } else {
                red = particle.colorR;
                green = particle.colorG;
                blue = particle.colorB;
            }
            // position & rotation
            const rotation = particle.rotation * StardustMath.degreeToRadian;
            const x = particle.x;
            const y = particle.y;
            // texture
            const frame = this._frames[particle.currentAnimationFrame];
            const bottomRightX = frame.bottomRightX;
            const bottomRightY = frame.bottomRightY;
            const topLeftX = frame.topLeftX;
            const topLeftY = frame.topLeftY;
            const xOffset = frame.particleHalfWidth * particle.scale;
            const yOffset = frame.particleHalfHeight * particle.scale;

            let position = vertexId << 3;
            if (rotation !== 0)
            {
                const angle = ((rotation * 325.94932345220164765467394738691) & 2047);
                const cos = WebGLRenderer.sCosLut[angle];
                const sin = WebGLRenderer.sSinLut[angle];
                const cosX = cos * xOffset;
                const cosY = cos * yOffset;
                const sinX = sin * xOffset;
                const sinY = sin * yOffset;

                this._vertexes[position] = x - cosX + sinY;  // 0,1: position (in pixels)
                this._vertexes[++position] = y - sinX - cosY;
                this._vertexes[++position] = red;// 2,3,4,5: Color and Alpha [0-1]
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = topLeftX; // 6,7: Texture coords [0-1]
                this._vertexes[++position] = topLeftY;

                this._vertexes[++position] = x + cosX + sinY;
                this._vertexes[++position] = y + sinX - cosY;
                this._vertexes[++position] = red;
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = bottomRightX;
                this._vertexes[++position] = topLeftY;

                this._vertexes[++position] = x - cosX - sinY;
                this._vertexes[++position] = y - sinX + cosY;
                this._vertexes[++position] = red;
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = topLeftX;
                this._vertexes[++position] = bottomRightY;

                this._vertexes[++position] = x + cosX - sinY;
                this._vertexes[++position] = y + sinX + cosY;
                this._vertexes[++position] = red;
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = bottomRightX;
                this._vertexes[++position] = bottomRightY;
            }
            else {
                this._vertexes[position] = x - xOffset;
                this._vertexes[++position] = y - yOffset;
                this._vertexes[++position] = red;
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = topLeftX;
                this._vertexes[++position] = topLeftY;

                this._vertexes[++position] = x + xOffset;
                this._vertexes[++position] = y - yOffset;
                this._vertexes[++position] = red;
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = bottomRightX;
                this._vertexes[++position] = topLeftY;

                this._vertexes[++position] = x - xOffset;
                this._vertexes[++position] = y + yOffset;
                this._vertexes[++position] = red;
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = topLeftX;
                this._vertexes[++position] = bottomRightY;

                this._vertexes[++position] = x + xOffset;
                this._vertexes[++position] = y + yOffset;
                this._vertexes[++position] = red;
                this._vertexes[++position] = green;
                this._vertexes[++position] = blue;
                this._vertexes[++position] = particleAlpha;
                this._vertexes[++position] = bottomRightX;
                this._vertexes[++position] = bottomRightY;
            }
        }
    }

    isStateChange() { // TODO
        return false;
    }

    render(gl: WebGL2RenderingContext) {
        if (this._mNumParticles > 0)
        {
            //let mNumBatchedParticles = batchNeighbours();
            //float parentAlpha = Parent != null ? Parent.Alpha : 1;
            this.renderCustom(gl, this._mNumParticles);
        }
    }

    renderCustom(gl: WebGL2RenderingContext, mNumBatchedParticles: number) {
        if (this._mNumParticles == 0 || !WebGLParticleBuffers.buffersCreated)
        {
            return;
        }
        if (mNumBatchedParticles > WebGLRenderer._maxParticles)
        {
            console.log("Over " + WebGLRenderer._maxParticles + " particles! Aborting rendering");
            return;
        }
        WebGLParticleBuffers.switchVertexBuffer();

        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        const program = Shaders.getProgram();
        program.activate(gl);

        let uAlpha = program.uniforms.get("uAlpha")!;
        gl.uniform4f(uAlpha, 1, 1, 1, 1);

        let uMvpMatrix = program.uniforms.get("uMvpMatrix")!;
        // TODO: make a MVP matrix
       // gl.uniformMatrix4fv(uMvpMatrix, false, MvpMatrix3D.RawData);

        gl.bindBuffer(gl.ARRAY_BUFFER, WebGLParticleBuffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertexes!, gl.DYNAMIC_DRAW);

        const attribPosition = program.attributes.get("aPosition")!;
        gl.enableVertexAttribArray(attribPosition);
        gl.vertexAttribPointer(attribPosition, 2, gl.FLOAT, false, 32, 0);

        const attribColor = program.attributes.get("aColor")!;
        gl.enableVertexAttribArray(attribColor);
        gl.vertexAttribPointer(attribColor, 4, gl.FLOAT, false, 32, 8);

        const aTexCoords = program.attributes.get("aTexCoords")!;
        gl.enableVertexAttribArray(aTexCoords);
        gl.vertexAttribPointer(aTexCoords, 2, gl.FLOAT, false, 32, 24);
        gl.activeTexture(gl.TEXTURE0);
        //TODO RenderUtil.SetSamplerStateAt(_mTexture.Base, _mTexture.NumMipMaps > 0, TexSmoothing);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, WebGLParticleBuffers.indexBuffer);

        // TODO limit max number of particles
        gl.drawElements(gl.TRIANGLES, (this._mNumParticles + mNumBatchedParticles) * 6, gl.UNSIGNED_SHORT, 0);

        gl.disableVertexAttribArray(attribPosition);
        gl.disableVertexAttribArray(attribColor);
        gl.disableVertexAttribArray(aTexCoords);
        gl.bindTexture(gl.TEXTURE_2D, 0); // TODO last param is a WebGLTexture!
    }


}
