import StardustElement from "./StardustElement";
import {Signal} from "typed-signals";

export default abstract class SortableElement extends StardustElement {

    protected _priority: number;
    priorityChange = new Signal<() => void>();
    added = new Signal<() => void>();
    removed = new Signal<() => void>();

    /**
     * Denotes if its is active, true by default.
     */
    active: boolean;

    protected constructor() {
        super();
        this._priority = 0;
        this.active = true;
    }

    get priority(): number {
        return this._priority;
    }

    set priority(value: number) {
        this._priority = value;
        this.priorityChange.emit();
    }
}
