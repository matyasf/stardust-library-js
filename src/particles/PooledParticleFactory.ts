import Pool from "../Pool";
import Particle from "./Particle";
import SortableCollection from "../SortableCollection";
import Initializer from "../initializers/Initializer";

export default class PooledParticleFactory {

    static readonly pool: Pool<Particle> = new Pool<Particle>((p => new Particle()));

    private readonly _initializerCollection: SortableCollection<Initializer>;

    constructor() {
        this._initializerCollection = new SortableCollection<Initializer>();
    }

    createParticles(count: number, currentTime: number, toList: Particle[]): Particle[] {
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                let particle = PooledParticleFactory.pool.acquire();
                particle.init();
                toList.push(particle);
            }

            let initializers = this._initializerCollection.elems;
            const len = initializers.length;
            for (let i = 0; i < len; i++) {
                const init = initializers[i];
                init.doInitialize(toList, currentTime);
            }
        }
        return toList;
    }

    addInitializer(initializer: Initializer) {
        this._initializerCollection.add(initializer);
    }

    removeInitializer(initializer: Initializer) {
        this._initializerCollection.remove(initializer);
    }

    clearInitializer() {
        this._initializerCollection.clear();
    }

    get initializerCollection() : SortableCollection<Initializer> {
        return this._initializerCollection;
    }

    recycle(particle: Particle) {
        PooledParticleFactory.pool.release(particle);
    }
}
