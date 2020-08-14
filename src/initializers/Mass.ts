import {Particle, RandomBase} from "..";
import {Initializer} from "./Initializer";

export class Mass extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.mass = this.random!.random();
    }
}
