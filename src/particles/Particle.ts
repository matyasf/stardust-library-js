/**
 * This class represents a particle and its properties.
 */
export default class Particle {

    /**
     * The initial life upon birth.
     */
    public initLife: number = 0;

    /**
     * The remaining life of the particle.
     */
    public life: number = 0;

    /**
     * The scale of the particle.
     */
    public scale: number = 1;

    /**
     * The alpha value of the particle. (0..1)
     */
    public alpha: number = 0;

    /**
     * The mass of the particle.
     */
    public mass: number = 0;

    /**
     * Whether the particle is marked as dead.
     * Dead particles would be removed from simulation by an emitter.
     */
    public isDead: boolean = false;

    /**
     * The collision radius of the particle. Not set currently, but you can set it manually.
     */
    public collisionRadius: number = 1;

    /**
     * Custom user data of the particle.
     * Normally, this property contains information for renderers.
     * For instance this property should refer to the graphics object of this particle.
     */
    public target: object|null = null;

    /**
     * Current red color component; in the [0,1] range.
     */
    public colorR: number = 0;

    /**
     * Current green color component; in the [0,1] range.
     */
    public colorG: number = 0;

    public colorB: number = 0;

    /**
     * Particle handlers use this property to determine which frame to display if the particle is animated.
     */
    public currentAnimationFrame: number = 0;

    public x: number = 0;
    public y: number = 0;
    public vx: number = 0;
    public vy: number = 0;
    public rotation: number = 0;
    public omega: number = 0;
    /**
     * Used by Spawn to determine if this particle is being deflected
     */
    public isDeflected: boolean = false;

    // Use PooledParticleFactory to instantiate Particles
    constructor() {}

    /**
     * Initializes properties to default values.
     */
    public init(): void {
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

    public destroy(): void { // is this needed?
        this.target = null;
    }

    // TODO this part of an interface in C#
    public compareTo(other: Particle) {
        if (this.x < other.x)
        {
            return -1;
        }
        return 1;
    }
}
