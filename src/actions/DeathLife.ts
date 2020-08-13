import Action from "./Action";
import Emitter from "../emitters/Emitter";
import Particle from "../particles/Particle";

// TODO: merge this into the emitter for better UX
export default class DeathLife extends Action {

    update(emitter: Emitter, particle: Particle, timeDelta: number, currentTime: number): void {
        if (particle.life <= 0) {
            particle.isDead = true;
        }
    }


}
