export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });    
    }   

    get<T>(key: string) {
        return this.#cache.get(key)?.val;
    }

    #reap() {
        for (const key of this.#cache.keys()){
            const entry = this.#cache.get(key);
            if (!entry?.createdAt)
                continue;
            if (entry?.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalID = setInterval(() =>
            this.#reap(),
            this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalID);
        this.#reapIntervalID = undefined;
    }

}

