import {StardustElement} from "../StardustElement";

export abstract class Clock extends StardustElement {

    abstract getTicks(time: number): number;

    abstract reset(): void;
}
