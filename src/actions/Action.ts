import SortableElement from "../SortableElement";
import Emitter from "../emitters/Emitter";
import Particle from "../particles/Particle";

export default abstract class Action extends SortableElement {

    /**
     * This method is called once upon each `Emitter.step()` method call,
     * before the `Update()` calls with each particles in the emitter.
     *
     * All setup operations before the `Update()` calls should be done here.
     * @param emitter The associated emitter.
     * @param time The timespan of each emitter's step.
     */
    preUpdate(emitter: Emitter, time: number): void {}

    abstract update(emitter: Emitter, particle: Particle, timeDelta: number, currentTime: number): void;

    postUpdate(emitter: Emitter, time: number): void {
    }

    get needsSortedParticles(): boolean {
        return false;
    }
}
