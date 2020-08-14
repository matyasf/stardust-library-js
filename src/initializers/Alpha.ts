import {Particle, RandomBase} from "..";
import {Initializer} from "./Initializer";


export class Alpha extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.alpha = this.random!.random();
    }
}
