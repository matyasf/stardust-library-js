import {deserialize, serialize} from "class-transformer";
import {Emitter} from "..";

// This code uses https://github.com/typestack/class-transformer
export class StardustSerializer {

    serializeEmitter(emitter: Emitter): string {
        //const serializer = new TypedJSON(Emitter);
        const res = serialize(emitter, {excludeExtraneousValues: true});
        return res;
    }

    deserializeEmitter(jsonString: string): Emitter {
        //const serializer = new TypedJSON(Emitter);
        const em = deserialize(Emitter, jsonString);
        return em!;
    }
}
