import {StardustElement} from "../StardustElement";

export abstract class RandomBase extends StardustElement {

    abstract random(): number;

    abstract setRange(lowerBound: number, upperBound: number): void;

    abstract getRange(): number[];

}
