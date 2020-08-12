import SortableElement from "../SortableElement";
import Particle from "../particles/Particle";

export default class Initializer extends SortableElement{

    doInitialize(particles: Particle[], currentTime: number) {
        if (this.active) {
            for (const particle of particles) {
                this.initialize(particle);
            }
        }
    }

    initialize(particle: Particle) {}
}
