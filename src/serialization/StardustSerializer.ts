import Emitter from "../emitters/Emitter";
import {TypedJSON} from "typedjson";

// second choice: https://github.com/typestack/class-transformer
// this code uses now https://github.com/JohnWeisz/TypedJSON
export default class StardustSerializer {

    serialize(emitter: Emitter): string {
        const serializer = new TypedJSON(Emitter);
        const res = serializer.stringify(emitter);
        return res;
    }

    deserialize(jsonString: string): Emitter {
        const serializer = new TypedJSON(Emitter);
        const em = serializer.parse(jsonString);
        return em!;
    }
}
