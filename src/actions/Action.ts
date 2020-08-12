import SortableElement from "../SortableElement";
import Emitter from "../emitters/Emitter";
import {jsonIgnore} from "json-ignore";
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
    public abstract preUpdate(emitter: Emitter, time: number): void;

    public abstract update(emitter: Emitter, particle: Particle, timeDelta: number, currentTime: number): void;

    public postUpdate(emitter: Emitter, time: number): void {
    }

    @jsonIgnore()
    public get needsSortedParticles(): boolean {
        return false;
    }
}
