import StardustElement from "../StardustElement";

export default abstract class Clock extends StardustElement {

    abstract getTicks(time: number): number;

    abstract reset(): void;
}
