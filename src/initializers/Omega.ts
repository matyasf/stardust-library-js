import {Particle} from "../particles/Particle";
import {Initializer} from "./Initializer";
import {RandomBase} from "../mathStuff/RandomBase";

export class Omega extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.omega = this.random!.random();
    }
}
