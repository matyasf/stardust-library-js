import RandomBase from "./RandomBase";
import {Expose} from "class-transformer";

export default class UniformRandom extends RandomBase{

    @Expose()
    center: number;
    @Expose()
    radius: number;

    constructor(center: number = 0.5, radius: number = 0) {
        super();
        this.center = center ? center : 0.5;
        this.radius = radius;
    }

    random(): number {
        if (this.radius !== 0) {
            return this.radius * 2 * (Math.random() - 0.5) + this.center;
        }
        return this.center;
    }

    setRange(lowerBound: number, upperBound: number) {
        const diameter: number = upperBound - lowerBound;
        this.radius = 0.5 * diameter;
        this.center = lowerBound + this.radius;
    }

    getRange(): number[] {
        return [this.center - this.radius, this.center + this.radius];
    }
}
