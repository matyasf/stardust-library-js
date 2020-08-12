import Pool from "../Pool";
import Particle from "./Particle";

export default class PooledParticleFactory {

    static readonly pool: Pool<Particle> = new Pool<Particle>((p => new Particle()));

}
