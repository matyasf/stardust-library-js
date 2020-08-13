import Action from "./Action";
import Particle from "../particles/Particle";
import Emitter from "../emitters/Emitter";

// TODO: merge this into the emitter for better UX
export default class Age extends Action {

    multiplier: number;

    constructor(multiplier:number = 1) {
        super();
        this.multiplier = multiplier;
    }

    update(emitter: Emitter, particle: Particle, timeDelta: number, currentTime: number) {
        particle.life -= timeDelta * this.multiplier;
    }

}
