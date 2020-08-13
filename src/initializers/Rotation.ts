import Initializer from "./Initializer";
import RandomBase from "../mathStuff/RandomBase";
import Particle from "../particles/Particle";

export default class Rotation extends Initializer {

    random?: RandomBase;

    initialize(particle: Particle) {
        particle.rotation = this.random!.random();
    }
}
