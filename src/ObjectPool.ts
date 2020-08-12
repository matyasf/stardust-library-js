import IDisposable from "./IDisposable";

export default class Pool<T> implements IDisposable {

    private _isDisposed: boolean = false;
    private _factory: (pool: Pool<T>) => T;
    private _itemStore: T[];

    constructor(factory: (pool: Pool<T>) => T) {
        this._factory = factory;
        this._itemStore = [];
    }

    public acquire(): T {
        if (this._itemStore.length > 0) {
            return this._itemStore.pop()!;
        }
        return this._factory(this);
    }

    public release(item: T): void {
        this._itemStore.push(item);
    }

    /**
     * Dispose the whole pool
     */
    public dispose(): void {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        if (this.isIDisposable(T)) {
            while (this._itemStore.length > 0) {
                let disposable = this._itemStore.pop()!;
                (disposable as unknown as IDisposable).dispose();
            }
        }
    }

    public isIDisposable(obj: any): obj is IDisposable {
        return typeof obj.dispose === 'function';
    }

    public get IsDisposed() {
        return this._isDisposed;
    }

}
