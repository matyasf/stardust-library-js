import Initializer from "./Initializer";
import IZoneContainer from "../zones/IZoneContainer";
import Zone from "../zones/Zone";
import Vec2D from "../geom/Vec2D";
import ZoneCollection from "../zones/ZoneCollection";
import Particle from "../particles/Particle";

export default class PositionAnimated extends Initializer implements IZoneContainer{

    protected zoneCollection: ZoneCollection;

    get zones() {
        return this.zoneCollection.zones;
    }
    set zones(value: Zone[]) {
        this.zoneCollection.zones = value;
    }

    inheritVelocity: boolean = false;

    positions: Vec2D[]|null = null;

    private _prevPos: number = 0;
    private _currentPos: number = 0;

    constructor() {
        super();
        this.zoneCollection = new ZoneCollection();
    }

    doInitialize(particles: Particle[], currentTime: number) {
        if (this.positions != null) {
            this._currentPos = (currentTime % this.positions.length);
            this._prevPos = (this._currentPos > 0) ? this._currentPos - 1 : this.positions.length - 1;
        }
        super.doInitialize(particles, currentTime);
    }

    initialize(particle: Particle) {
        const vec2D = this.zoneCollection.getRandomPointInZones();
        if (vec2D != null) {
            particle.x = vec2D.x;
            particle.y = vec2D.y;

            if (this.positions != null)
            {
                particle.x = vec2D.x + this.positions[this._currentPos].x;
                particle.y = vec2D.y + this.positions[this._currentPos].y;

                if (this.inheritVelocity)
                {
                    particle.vx += this.positions[this._currentPos].x - this.positions[this._prevPos].x;
                    particle.vy += this.positions[this._currentPos].y - this.positions[this._prevPos].y;
                }
            }
            else {
                particle.x = vec2D.x;
                particle.y = vec2D.y;
            }
            Vec2D.recycleToPool(vec2D);
        }
    }

    get currentPosition(): Vec2D|null
    {
        if (this.positions != null) {
            return this.positions[this._currentPos];
        }
        return null;
    }

}
