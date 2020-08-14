import {Emitter} from "..";
import {Particle} from "../particles/Particle";
import {StardustElement} from "../StardustElement";

export abstract class ParticleHandler extends StardustElement {

    abstract reset(): void;

    stepBegin(emitter: Emitter, particles: Particle[], time: number): void {}

    abstract stepEnd(emitter: Emitter, particles: Particle[], time: number): void;

    abstract particleAdded(particle: Particle): void;

    abstract particleRemoved(particle: Particle): void;
}
