import {Particle} from "..";
import {SortableElement} from "../SortableElement";

export class Initializer extends SortableElement {

    doInitialize(particles: Particle[], currentTime: number) {
        if (this.active) {
            for (const particle of particles) {
                this.initialize(particle);
            }
        }
    }

    initialize(particle: Particle) {
    }
}
