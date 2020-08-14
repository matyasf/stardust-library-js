import {Zone} from "./Zone";

/**
 * Zone with no thickness
 */
export abstract class Contour extends Zone {

    protected virtualThicknessVal: number;

    protected constructor() {
        super()
        this.virtualThicknessVal = 1;
    }

    /**
     * Used to calculate "virtual area" for the `CompositeZone` class,
     * since contours have zero thickness.
     * The larger the virtual thickness, the larger the virtual area.
     */
    get VirtualThickness(): number {
        return this.virtualThicknessVal;
    }

    set VirtualThickness(value: number) {
        this.virtualThicknessVal = value;
        this.updateArea();
    }
}
