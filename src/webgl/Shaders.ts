import {ShaderProgram} from "./ShaderProgram";

export class Shaders {

    private static _program: ShaderProgram|null;

    static getProgram() {
        if (!this._program) {
            const vertexShader = `version 300 es
                in vec4 aPosition;
                in vec4 aColor;
                in vec2 aTexCoords;
            
                uniform mat4 uMvpMatrix;
                uniform vec4 uAlpha;
            
                out lowp vec4 vColor;
                out lowp vec2 vTexCoords;
                
                void main() {
                  gl_Position = uMvpMatrix * aPosition;
                  vColor = aColor * uAlpha;
                  vTexCoords  = aTexCoords;
                }`;

            const fragmentShader = `version 300 es
                in lowp vec4 vColor;
                in lowp vec2 vTexCoords;
                uniform lowp sampler2D uTexture;
                out lowp vec4 fragColor;
                
                void main() {
                  fragColor = texture(uTexture, vTexCoords) * vColor;
                }`;
            this._program = new ShaderProgram(vertexShader, fragmentShader);
        }
        return this._program;
    }

}
