import {Emitter, Particle} from "..";
import {Action} from "./Action";

// TODO: merge this into the emitter for better UX
export class DeathLife extends Action {

    update(emitter: Emitter, particle: Particle, timeDelta: number, currentTime: number): void {
        if (particle.life <= 0) {
            particle.isDead = true;
        }
    }

}
