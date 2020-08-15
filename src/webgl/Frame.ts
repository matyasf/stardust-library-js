
export class Frame {

    particleHalfWidth: number;
    particleHalfHeight: number;
    topLeftX: number;
    topLeftY: number;
    bottomRightX: number;
    bottomRightY: number;

    constructor(topLeftX: number,
                topLeftY: number,
                bottomRightX: number,
                bottomRightY: number,
                halfWidth: number,
                halfHeight: number)
{
    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    this.bottomRightX = bottomRightX;
    this.bottomRightY = bottomRightY;
    this.particleHalfWidth = halfWidth;
    this.particleHalfHeight = halfHeight;
}
}
