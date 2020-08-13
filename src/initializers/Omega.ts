import Initializer from "./Initializer";
import RandomBase from "../mathStuff/RandomBase";
import Particle from "../particles/Particle";

export default class Omega extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.omega = this.random!.random();
    }
}
