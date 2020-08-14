import {Contour} from "./Contour";
import {Vec2D} from "..";

export class SinglePoint extends Contour {

    constructor(x: number, y: number) {
        super();
        this._x = x;
        this._y = y;
        this.updateArea();
    }
    calculateMotionData2D(): Vec2D {
        return Vec2D.getFromPool();
    }

    protected updateArea(): void {
        this.area = this.VirtualThickness * this.VirtualThickness * Math.PI;
    }

}
