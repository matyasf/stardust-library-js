import Initializer from "./Initializer";
import RandomBase from "../mathStuff/RandomBase";
import Particle from "../particles/Particle";

export default class Life extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.initLife = particle.life = this.random!.random();
    }
}
