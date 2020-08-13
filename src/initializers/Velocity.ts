import Initializer from "./Initializer";
import Particle from "../particles/Particle";
import ZoneCollection from "../zones/ZoneCollection";
import Zone from "../zones/Zone";

export default class Velocity extends Initializer {

    protected readonly zoneCollection: ZoneCollection;

    get zones(): Zone[] {
        return this.zoneCollection.zones;
    }
    set zones(value: Zone[]) {
        this.zoneCollection.zones = value;
    }

    constructor() {
        super();
        this.zoneCollection = new ZoneCollection();
    }

    initialize(particle: Particle) {
        const vec2D = this.zoneCollection.getRandomPointInZones();
        if (vec2D != null)
        {
            particle.vx += vec2D.x;
            particle.vy += vec2D.y;
            vec2D.dispose();
        }
    }
}
