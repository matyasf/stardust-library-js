import {Signal} from "typed-signals";
import {Expose, Type} from "class-transformer";
import {Action, Clock, Initializer, Particle, ParticleHandler, PooledParticleFactory, SortableCollection} from "..";
import {StardustElement} from "../StardustElement";

/**
 * This class takes charge of the actual particle simulation of the Stardust particle system.
 */
export class Emitter extends StardustElement {

    emitterStepEnd: Signal<(e: Emitter) => {}> = new Signal<(e: Emitter) => {}>();

    get particles(): Particle[] {
        return this._particles;
    }

    particleHandler?: ParticleHandler;
    @Expose()
    active: boolean;
    @Expose()
    currentTime: number = 0;
    @Expose()
    @Type(() => Clock)
    clock?: Clock;

    /**
     * While the max. fps is usually 60, the actual value fluctuates a few ms.
     * Thus using the real value would cause lots of frame skips
     * To take this into account Stardust uses internally a slightly smaller value to compensate.
     */
    readonly timeStepCorrectionOffset: number = 0.004;
    private readonly _particles: Particle[] = [];
    private readonly _factory: PooledParticleFactory = new PooledParticleFactory();
    private readonly _actionCollection = new SortableCollection<Action>();
    private readonly _activeActions: Action[] = [];
    private _invFps = 1 / 60 - this.timeStepCorrectionOffset;
    private _timeSinceLastStep: number = 0;
    private _fps!: number;

    // null values need to be allowed otherwise deserialization will fail
    constructor(clock?: Clock, particleHandler?: ParticleHandler) {
        super();
        this.clock = clock;
        this.active = true;
        this.particleHandler = particleHandler;
        this.fps = 60;
    }

    @Expose()
    get fps(): number {
        return this._fps;
    }

    set fps(value: number) {
        if (value > 60) {
            value = 60;
        }
        this._fps = value;
        this._invFps = 1 / value - this.timeStepCorrectionOffset;
    }

    reset(): void {
        this.currentTime = 0;
        this.clearParticles();
        this.clock!.reset();
    }

    /**
     * This method is the main simulation loop of the emitter.
     * In order to keep the simulation go on, this method should be called continuously.
     * It is recommended that you call this method every frame.
     * @param time The time elapsed since the last step in milliseconds
     */
    step(time: number): void {
        if (time <= 0) {
            return;
        }
        time = time / 1000;
        this._timeSinceLastStep = this._timeSinceLastStep + time;
        this.currentTime = this.currentTime + time;
        if (this._timeSinceLastStep < this._invFps) {
            return;
        }
        this.particleHandler!.stepBegin(this, this._particles, this._timeSinceLastStep);

        if (this.active) {
            this.createParticles(this.clock!.getTicks(this._timeSinceLastStep));
        }

        //filter out active actions
        this._activeActions.length = 0;
        for (let action of this.actions) {
            if (action.active) {
                this._activeActions.push(action);
            }
        }

        // sorting
        for (let activeAction of this._activeActions) {
            if (activeAction.needsSortedParticles) {
                this._particles.sort(Particle.compareFunction);
                break;
            }
        }
        //invoke action preupdates
        for (let action of this._activeActions) {
            action.preUpdate(this, this._timeSinceLastStep);
        }
        //update the remaining particles
        const deadParticles: Particle[] = []; // do not instantiate here
        for (let particle of this._particles) {
            for (let activeAction of this._activeActions) {
                activeAction.update(this, particle, this._timeSinceLastStep, this.currentTime);
            }

            if (particle.isDead) {
                deadParticles.push(particle);
            }
        }
        for (let deadParticle of deadParticles) {
            this.particleHandler!.particleRemoved(deadParticle);

            deadParticle.destroy();
            this._factory.recycle(deadParticle);

            this._particles.splice(this._particles.indexOf(deadParticle));
        }

        // postUpdate
        for (let activeAction of this._activeActions) {
            activeAction.postUpdate(this, this._timeSinceLastStep);
        }

        this.emitterStepEnd.emit(this);

        this.particleHandler!.stepEnd(this, this._particles, this._timeSinceLastStep);

        this._timeSinceLastStep = 0;
    }

    @Expose()
    @Type(() => Action)
    get actions(): Action[] {
        return this._actionCollection.elems;
    }

    set actions(value: Action[]) {
        for (const action of value) {
            this.addAction(action);
        }
    }

    addAction(action: Action) {
        this._actionCollection.add(action);
        action.added.emit();
    }

    removeAction(action: Action) {
        this._actionCollection.remove(action);
        action.removed.emit();
    }

    clearActions(): void {
        let actions = this._actionCollection.elems;
        let len = actions.length;
        for (let i = 0; i < len; ++i) {
            actions[i].removed.emit();
        }
        this._actionCollection.clear();
    }

    addInitializer(initializer: Initializer) {
        this._factory.addInitializer(initializer);
        initializer.added.emit();
    }

    removeInitializer(initializer: Initializer) {
        this._factory.removeInitializer(initializer);
        initializer.removed.emit();
    }

    clearInitializer(): void {
        let initializers = this._factory.initializerCollection.elems;
        let len = initializers.length;
        for (let i = 0; i < len; ++i) {
            initializers[i].removed.emit();
        }
        this._factory.clearInitializer();
    }

    get numParticles(): number {
        return this._particles.length;
    }

    private static readonly newParticles: Particle[] = [];

    createParticles(pCount: number): void {
        Emitter.newParticles.length = 0;
        this._factory.createParticles(pCount, this.currentTime, Emitter.newParticles);
        this.addParticles(Emitter.newParticles);
    }

    addParticles(particles: Particle[]) {
        for (const particle of particles) {
            this._particles.push(particle);
            // handle adding
            this.particleHandler!.particleAdded(particle);
        }
    }

    clearParticles() {
        for (const particle of this._particles) {
            this.particleHandler!.particleRemoved(particle);
            particle.destroy();
            this._factory.recycle(particle);
        }
        this._particles.length = 0;
    }

}
