import Initializer from "./Initializer";
import IZoneContainer from "../zones/IZoneContainer";
import Zone from "../zones/Zone";
import {jsonIgnore} from "json-ignore";
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

    @jsonIgnore() // TODO parse this
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
            // TODO
        }
    }

}
