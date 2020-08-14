import {Particle, RandomBase} from "..";
import {Initializer} from "./Initializer";

export class Life extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.initLife = particle.life = this.random!.random();
    }
}
