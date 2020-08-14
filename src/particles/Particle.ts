/**
 * This class represents a particle and its properties.
 */
export class Particle {

    /**
     * The initial life upon birth.
     */
    initLife: number = 0;

    /**
     * The remaining life of the particle.
     */
    life: number = 0;

    /**
     * The scale of the particle.
     */
    scale: number = 1;

    /**
     * The alpha value of the particle. (0..1)
     */
    alpha: number = 0;

    /**
     * The mass of the particle.
     */
    mass: number = 0;

    /**
     * Whether the particle is marked as dead.
     * Dead particles would be removed from simulation by an emitter.
     */
    isDead: boolean = false;

    /**
     * The collision radius of the particle. Not set currently, but you can set it manually.
     */
    collisionRadius: number = 1;

    /**
     * Custom user data of the particle.
     * Normally, this property contains information for renderers.
     * For instance this property should refer to the graphics object of this particle.
     */
    target: object|null = null;

    /**
     * Current red color component; in the [0,1] range.
     */
    colorR: number = 0;

    /**
     * Current green color component; in the [0,1] range.
     */
    colorG: number = 0;

    colorB: number = 0;

    /**
     * Particle handlers use this property to determine which frame to display if the particle is animated.
     */
    currentAnimationFrame: number = 0;

    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    rotation: number = 0;
    omega: number = 0;
    /**
     * Used by Spawn to determine if this particle is being deflected
     */
    isDeflected: boolean = false;

    // Use PooledParticleFactory to instantiate Particles
    constructor() {}

    /**
     * Initializes properties to default values.
     */
    init(): void {
        this.initLife = this.life = this.currentAnimationFrame = 0;
        this.scale = 1;
        this.alpha = 1;
        this.mass = 1;
        this.isDead = false;
        this.collisionRadius = 0;

        this.colorR = 1;
        this.colorB = 1;
        this.colorG = 1;

        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.rotation = 0;
        this.omega = 0;
    }

    destroy(): void { // is this needed?
        this.target = null;
    }

    static compareFunction(first: Particle, other: Particle) {
        if (first.x < other.x)
        {
            return -1;
        }
        return 1;
    }
}
