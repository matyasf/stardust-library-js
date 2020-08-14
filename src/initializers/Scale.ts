import {Initializer} from "./Initializer";
import {RandomBase} from "../mathStuff/RandomBase";
import {Particle} from "../particles/Particle";

export class Scale extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.scale = this.random!.random();
    }
}
