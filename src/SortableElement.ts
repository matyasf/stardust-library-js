import StardustElement from "./StardustElement";
import {Signal} from "./Signal";

export default abstract class SortableElement extends StardustElement {

    protected _priority: number;
    public priorityChange = new Signal<() => void>();
    public added = new Signal<() => void>();
    public removed = new Signal<() => void>();

    /**
     * Denotes if its is active, true by default.
     */
    public active: boolean;

    protected constructor() {
        super();
        this._priority = 0;
        this.active = true;
    }

    public get priority(): number {
        return this._priority;
    }

    public set priority(value: number) {
        this._priority = value;
        this.priorityChange.dispatch();
    }
}
