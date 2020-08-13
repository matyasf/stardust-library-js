import Contour from "./Contour";
import Vec2D from "../geom/Vec2D";
import RandomBase from "../mathStuff/RandomBase";
import StardustMath from "../mathStuff/StardustMath";

/**
 * Line segment zone.
 */
export default class Line extends Contour {

    random?: RandomBase;

    set x(value: number) {
        this._x = value;
        this.updateArea();
    }

    set y(value: number) {
        this._y = value;
        this.updateArea();
    }

    private _x2: number;
    get x2(): number {
        return this._x2;
    }
    set x2(value: number) {
        this._x2 = value;
        this.updateArea();
    }

    private _y2:number;
    get y2(): number {
        return this._y2;
    }
    set y2(value: number) {
        this._y2 = value;
        this.updateArea();
    }

    constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, random?: RandomBase) {
        super();
        this._x = x1;
        this._y = y1;
        this._x2 = x2;
        this._y2 = y2;
        this.random = random
    }

    calculateMotionData2D(): Vec2D {
        this.random!.setRange(0, 1);
        const rand = this.random!.random();
        const vec = Vec2D.getFromPool();
        vec.setTo(StardustMath.interpolate(0, 0, 1, this._x2 - this._x, rand),
            StardustMath.interpolate(0, 0, 1, this._y2 - this._y, rand));
        return vec;
    }

    protected updateArea(): void {
        const dx = this._x - this._x2;
        const dy = this._y - this._y2;
        this.area = Math.sqrt(dx * dx + dy * dy) * this.virtualThicknessVal;
    }

}
