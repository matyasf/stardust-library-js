
export class WebGLParticleBuffers {

    static indexBuffer: WebGLBuffer|null;
    private static _vertexBuffers: WebGLBuffer[];
    private static _indices: Uint16Array;
    private static _sNumberOfVertexBuffers: number = 0;
    private static _vertexBufferIdx = -1;

    static createBuffers(gl: WebGL2RenderingContext, maxNumParticles: number, numberOfVertexBuffers: number) {
        this._sNumberOfVertexBuffers = numberOfVertexBuffers;
        this._vertexBufferIdx = -1;
        if (this._vertexBuffers != null)
        {
            gl.deleteBuffer(this._vertexBuffers); // likely not OK
        }
        if (this.indexBuffer)
        {
            gl.deleteBuffer(this.indexBuffer);
            this.indexBuffer = null;
        }
        this._vertexBuffers = [];
        for (let i = 0; i < this._sNumberOfVertexBuffers; ++i)
        {
            this._vertexBuffers[i] = gl.createBuffer()!;
        }
        if (this._indices == null)
        {
            this._indices = new Uint16Array(maxNumParticles * 6);
            let numVertices = 0;
            let indexPosition = -1;
            for (let i = 0; i < maxNumParticles; ++i)
            {
                this._indices[++indexPosition] = numVertices;
                this._indices[++indexPosition] = (numVertices + 1);
                this._indices[++indexPosition] = (numVertices + 2);

                this._indices[++indexPosition] = (numVertices + 1);
                this._indices[++indexPosition] = (numVertices + 3);
                this._indices[++indexPosition] = (numVertices + 2);
                numVertices += 4;
            }
            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.DYNAMIC_DRAW);
        }
    }

    static switchVertexBuffer() {
        this._vertexBufferIdx = ++this._vertexBufferIdx % this._sNumberOfVertexBuffers;
    }

    static get vertexBuffer() {
        return WebGLParticleBuffers._vertexBuffers[WebGLParticleBuffers._vertexBufferIdx];
    }

    static get vertexBufferIdx() {
        return WebGLParticleBuffers._vertexBufferIdx;
    }

    static get buffersCreated() {
        if (this._vertexBuffers != null && this._vertexBuffers.length > 0) {
            return true;
        }
        return false;
    }
}
