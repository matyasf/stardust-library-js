import {Particle, RandomBase} from "..";
import {Initializer} from "./Initializer";

export class Rotation extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.rotation = this.random!.random();
    }
}
