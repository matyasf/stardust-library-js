import {Particle} from "../particles/Particle";
import {Initializer} from "./Initializer";
import {RandomBase} from "../mathStuff/RandomBase";

export class Rotation extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.rotation = this.random!.random();
    }
}
