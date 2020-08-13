import StardustElement from "../StardustElement";
import Vec2D from "../geom/Vec2D";
import StardustMath from "../mathStuff/StardustMath";

export default abstract class Zone extends StardustElement {
    protected _rotation!: number;
    protected angleCos!: number;
    protected angleSin!: number;
    protected area: number = 0;
    protected _x: number = 0;
    protected _y: number = 0;

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    protected constructor() {
        super();
        this.rotation = 0;
    }

    protected abstract updateArea(): void;

    getPoint(): Vec2D {
        const md2D: Vec2D = this.calculateMotionData2D();
        if (this._rotation !== 0) {
            const originalX = md2D.x;
            md2D.x = originalX * this.angleCos - md2D.y * this.angleSin;
            md2D.y = originalX * this.angleSin + md2D.y * this.angleCos;
        }
        md2D.x = this._x + md2D.x;
        md2D.y = this._y + md2D.y;
        return md2D;
    }

    get rotation(): number {
        return this._rotation;
    }
    set rotation(value: number) {
        const valInRad = value * StardustMath.degreeToRadian;
        this.angleCos = Math.cos(valInRad);
        this.angleSin = Math.sin(valInRad);
        this._rotation = value;
    }

    abstract calculateMotionData2D(): Vec2D;

    getArea(): number {
        return this.area;
    }

    setPosition(xc: number, yc: number): void {
        this.x = xc;
        this.y = yc;
    }

    getPosition(): Vec2D {
        return Vec2D.getFromPool(this.x, this.y);
    }
}
