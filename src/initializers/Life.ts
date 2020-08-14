import {Particle} from "../particles/Particle";
import {Initializer} from "./Initializer";
import {RandomBase} from "../mathStuff/RandomBase";

export class Life extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.initLife = particle.life = this.random!.random();
    }
}
