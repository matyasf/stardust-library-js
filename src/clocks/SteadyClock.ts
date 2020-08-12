import Clock from "./Clock";
import RandomBase from "../mathStuff/RandomBase";
import UniformRandom from "../mathStuff/UniformRandom";
import StardustMath from "../mathStuff/StardustMath";

export default class SteadyClock extends Clock {

    ticksPerCall: number;
    private _initialDelay!: RandomBase;
    private currentInitialDelay!: number;
    private currentTime: number;

    constructor(ticksPerCall: number = 1, initDelay?: RandomBase) {
        super();
        this.ticksPerCall = ticksPerCall;
        this.initialDelay = !initDelay ? new UniformRandom(0, 0) : initDelay;
        this.currentTime = 0;
    }

    get initialDelay(): RandomBase {
        return this._initialDelay;
    }
    set initialDelay(value: RandomBase) {
        this._initialDelay = value;
        this.setCurrentInitialDelay();
    }

    getTicks(time: number): number {
        this.currentTime += time;
        if (this.currentTime > this.currentInitialDelay)
        {
            return StardustMath.randomFloor(this.ticksPerCall * time);
        }
        return 0;
    }

    reset(): void {
        this.currentTime = 0;
        this.setCurrentInitialDelay();
    }

    private setCurrentInitialDelay() {
        const val = this._initialDelay.random();
        this.currentInitialDelay = val > 0 ? val : 0;
    }

}
