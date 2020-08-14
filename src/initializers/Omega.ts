import {Particle, RandomBase} from "..";
import {Initializer} from "./Initializer";

export class Omega extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.omega = this.random!.random();
    }
}
