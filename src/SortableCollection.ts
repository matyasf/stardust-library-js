import SortableElement from "./SortableElement";

export default class SortableCollection<T extends SortableElement> {

    private readonly _elems: T[];

    constructor() {
        this._elems = [];
    }

    get elems(): T[] {
        return this._elems;
    }

    add(elem: T): void {
        if (this._elems.includes(elem)) {
            return;
        }
        this._elems.push(elem);
        elem.priorityChange.connect(this.sortElements);
        this.sortElements();
    }

    remove(elem: T): void {
        const index = this._elems.indexOf(elem);
        if (index > -1) {
            this._elems.splice(index, 1);
            elem.priorityChange.disconnect(this.sortElements);
        }
    }

    clear(): void {
        for (const elem of this._elems) {
            this.remove(elem);
        }
    }

    private sortElements(): void {
        this._elems.sort(this.priorityComparison);
    }

    private priorityComparison(el1: T, el2: T): number {
        if (el1.priority > el2.priority) {
            return -1;
        }
        else if (el1.priority < el2.priority) {
            return 1;
        }
        return 0;
    }
}
