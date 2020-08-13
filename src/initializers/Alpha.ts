import Initializer from "./Initializer";
import RandomBase from "../mathStuff/RandomBase";
import Particle from "../particles/Particle";

export default class Alpha extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.alpha = this.random!.random();
    }
}
