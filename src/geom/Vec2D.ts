import {StardustMath} from "..";
import {Pool} from "../Pool";
import {IDisposable} from "../IDisposable";

export class Vec2D implements IDisposable {

    private static readonly pool = new Pool<Vec2D>(pool => new Vec2D())

    static getFromPool(x: number = 0, y: number = 0): Vec2D {
        const vec = this.pool.acquire();
        vec.setTo(x, y);
        return vec;
    }

    static recycleToPool(vec: Vec2D): void {
        this.pool.release(vec);
    }

    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set length(value: number) {
        if (this.x == 0 && this.y == 0) return;
        const factor = value / length;
        this.x = this.x * factor;
        this.y = this.y * factor;
    }

    setTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    dot(vector: Vec2D) {
        return this.x * vector.x + this.y * vector.y;
    }

    project(target: Vec2D): Vec2D {
        const temp = this.clone();
        temp.projectThis(target);
        return temp;
    }

    projectThis(target: Vec2D): void {
        const temp = Vec2D.pool.acquire();
        temp.x = target.x;
        temp.y = target.y;
        temp.length = 1;
        temp.length = this.dot(temp);
        this.x = temp.x;
        this.y = temp.y;
        Vec2D.pool.release(temp);
    }

    rotate(angle: number, useRadian: boolean = false) {
        if (!useRadian) {
            angle = angle * StardustMath.degreeToRadian;
        }
        const originalX = this.x;
        this.x = originalX * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = originalX * Math.sin(angle) + this.y * Math.cos(angle);
    }

    get angle(): number {
        return Math.atan2(this.y, this.x) * StardustMath.radianToDegree;
    }

    set angle(value: number) {
        const originalLength = this.length;
        const rad = value * StardustMath.degreeToRadian;
        this.x = originalLength * Math.cos(rad);
        this.y = originalLength * Math.sin(rad);
    }

    clone(): Vec2D {
        const vClone = Vec2D.pool.acquire();
        vClone.x = this.x;
        vClone.y = this.y;
        return vClone;
    }

    dispose(): void {
        this.x = 0;
        this.y = 0;
        Vec2D.pool.release(this);
    }

    toString(): string {
        return `[X:${this.x} y:${this.y}]`;
    }

}
