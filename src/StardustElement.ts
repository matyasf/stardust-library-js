/**
 * All Stardust elements are subclasses of this class.
 */
import {Expose} from "class-transformer";


export default abstract class StardustElement
{
    private static elementCounter = new Map<string, number>();

    @Expose()
    name: string;

    protected constructor() {
        const str = this.constructor.name;
        if (!StardustElement.elementCounter.has(str)) {
            StardustElement.elementCounter.set(str, 0);
        }
        else {
            const curr = StardustElement.elementCounter.get(str);
            StardustElement.elementCounter.set(str, curr! + 1);
        }
        this.name = str + "_" + StardustElement.elementCounter.get(str);
    }
}
