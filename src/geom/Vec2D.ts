import IDisposable from "../IDisposable";
import Pool from "../Pool";

export default class Vec2D implements IDisposable {

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
        return this.x * vector.x + y * vector.y;
    }


}
