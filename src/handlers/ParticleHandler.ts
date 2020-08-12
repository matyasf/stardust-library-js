import StardustElement from "../StardustElement";
import Emitter from "../emitters/Emitter";
import Particle from "../particles/Particle";

export default abstract class ParticleHandler extends StardustElement {

    abstract reset(): void;

    stepBegin(emitter: Emitter, particles: Particle[], time: number): void {}

    abstract stepEnd(emitter: Emitter, particles: Particle[], time: number): void;

    abstract particleAdded(particle: Particle): void;

    abstract particleRemoved(particle: Particle): void;
}
