import {Emitter, Particle, ParticleHandler} from "..";
import {WebGLRenderer} from "./WebGLRenderer";

export class WebGLHandler extends ParticleHandler {

    private _blendMode: string = "normal"; // TODO use stronly typed value in Sparrow-sharp
    private _spriteSheetAnimationSpeed: number;
    private _smoothing: number = 0; // TODO strongly type it
    private _isSpriteSheet: boolean = false;
    private _premultiplyAlpha: boolean = true;
    private _spriteSheetStartAtRandomFrame: boolean = false;
    private _totalFrames: number = 0;
    //private _textures: SubTexture[];
    private _renderer?: WebGLRenderer;
    private _timeSinceLastStep: number;

    constructor() {
        super();
        this._timeSinceLastStep = 0;
        this._spriteSheetAnimationSpeed = 1;
    }

    reset(): void {
        this._timeSinceLastStep = 0;
        this._renderer!.advanceTime([]);
    }

    set container(value: HTMLElement) {
        this.createRendererIfNeeded();
        value.appendChild(this._renderer!.canvas);
    }

    createRendererIfNeeded() {
        if (!this._renderer) {
            this._renderer = new WebGLRenderer();
            this._renderer.blendMode = this._blendMode;
            this._renderer.texSmoothing = this._smoothing;
            this._renderer.premultiplyAlpha = this._premultiplyAlpha;
        }
    }

    stepEnd(emitter: Emitter, particles: Particle[], time: number): void {
        // TODO add code for sprite sheets
        this._renderer!.advanceTime(particles);
    }

    particleAdded(particle: Particle): void {
        // TODO add code for sprite sheets
        particle.currentAnimationFrame = 0;
    }

    particleRemoved(particle: Particle): void {
    }

    // TODO sprite sheet, setters, texture sheets

}
