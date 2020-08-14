import {Initializer} from "./Initializer";
import {Particle, RandomBase} from "..";

export class Scale extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.scale = this.random!.random();
    }
}
