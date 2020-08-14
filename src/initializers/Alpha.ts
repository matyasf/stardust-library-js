import {Particle} from "../particles/Particle";
import {Initializer} from "./Initializer";
import {RandomBase} from "../mathStuff/RandomBase";


export class Alpha extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.alpha = this.random!.random();
    }
}
