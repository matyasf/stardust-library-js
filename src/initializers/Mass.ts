import {Particle} from "../particles/Particle";
import {Initializer} from "./Initializer";
import {RandomBase} from "../mathStuff/RandomBase";

export class Mass extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.mass = this.random!.random();
    }
}
