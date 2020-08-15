
export class ShaderProgram {

    name: WebGLProgram = 0;
    private _vertexShader: string;
    private _fragmentShader: string;
    private vertexShaderId?: WebGLShader;
    private fragmentShaderId?: WebGLShader;

    readonly uniforms = new Map<string, WebGLUniformLocation>();
    readonly attributes = new Map<string, number>();

    constructor(initVertexShader: string, initFragmentShader: string) {
        this._vertexShader = initVertexShader;
        this._fragmentShader = initFragmentShader;
    }

    dispose(gl: WebGL2RenderingContext) {
        gl.detachShader(name, this.vertexShaderId!);
        gl.detachShader(name, this.fragmentShaderId!);

        gl.deleteShader(this._vertexShader);
        gl.deleteShader(this._fragmentShader);
        this.name = 0;
    }

    activate(gl: WebGL2RenderingContext) {
        if (name === 0) {
            this.compile(gl);
        }
        gl.useProgram(this.name);
    }

    description(): string {
        return `[Program ${this.name}\n## VERTEX SHADER: ##\n
                ${this._vertexShader}\n## FRAGMENT SHADER: ##\n
                ${this._fragmentShader}]`;
    }

    compile(gl: WebGL2RenderingContext) {
        const program: WebGLProgram = gl.createProgram()!;

        this.vertexShaderId! = this.compileShader(gl, this._vertexShader, gl.VERTEX_SHADER);
        this.fragmentShaderId! = this.compileShader(gl, this._fragmentShader, gl.FRAGMENT_SHADER);

        gl.attachShader(program, this.vertexShaderId);
        gl.attachShader(program, this.fragmentShaderId);

        gl.linkProgram(program);

        // TODO run this only in debug mode
        const glLog = gl.getProgramInfoLog(program);
        if (glLog != "") {
            console.log("stardust: ERROR linking GL program: " + glLog);
        }

        this.name = program;

        this.updateUniforms(gl);
        this.updateAttributes(gl);

        gl.detachShader(program, this.vertexShaderId);
        gl.detachShader(program, this.fragmentShaderId);

        gl.deleteShader(this.vertexShaderId);
        gl.deleteShader(this.fragmentShaderId);
    }

    compileShader(gl: WebGL2RenderingContext, source: string, type: GLenum): WebGLShader {
        const shader: WebGLShader = gl.createShader(type)!;
        if (shader == 0) {
            return shader;
        }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        // TODO only run if debug mode
        if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
            let info = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw 'Stardust ERROR: Could not compile WebGL program. \n' +
                    info + '\n ' + source;
        }
        return shader;
    }

    updateUniforms(gl: WebGL2RenderingContext) {
        this.uniforms.clear();
        const num = gl.getProgramParameter(this.name, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < num; ++i) {
            const info: WebGLActiveInfo = gl.getActiveUniform(this.name, i)!;
            let location = gl.getUniformLocation(this.name, info.name);
            // if its null its not a shader uniform for example
            // https://jsfiddle.net/greggman/n6mzz6jv/
            if (location) {
                this.uniforms.set(info.name, location);
            }
        }
    }

    updateAttributes(gl: WebGL2RenderingContext) {
        this.attributes.clear();
        const num = gl.getProgramParameter(this.name, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < num; ++i) {
            const info: WebGLActiveInfo = gl.getActiveAttrib(this.name, i)!;
            let location = gl.getAttribLocation(this.name, info.name);
            // if its null its not a shader attribute for example
            // https://jsfiddle.net/greggman/n6mzz6jv/
            if (location && location >= 0) {
                this.attributes.set(info.name, location);
            }
        }
    }
}
