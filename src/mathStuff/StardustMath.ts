
export class StardustMath {

    static twoPi = 2 * Math.PI;
    static degreeToRadian = Math.PI / 180;
    static radianToDegree = 180 / Math.PI;

    /**
     * Returns 0 or 1 with a probability based on the non-integer digits.
     */
    static randomFloor(num: number): number {
        const floor = Math.floor(num);
        return floor + (((num - floor) > Math.random()) ? 1 : 0);
    }

    /**
     * Interpolates linearly between two values.
     */
    static interpolate(x1: number, y1: number, x2: number, y2: number, x3: number) {
        return y1 - ((y1 - y2) * (x1 - x3) / (x1 - x2));
    }
}
