import Action from "./Action";
import Emitter from "../emitters/Emitter";
import Particle from "../particles/Particle";

// TODO: merge this into the emitter for better UX?
export default class Move extends Action {

    public multiplier: number;
    private _factor: number = 0;

    constructor(multiplier:number = 1) {
        super();
        this._priority = -4;
        this.multiplier = multiplier;
    }

    preUpdate(emitter: Emitter, time: number): void {
        this._factor = time * this.multiplier;
    }

    update(emitter: Emitter, particle: Particle, timeDelta: number, currentTime: number): void {
        particle.x += particle.vx * this._factor;
        particle.y += particle.vy * this._factor;
    }

}
