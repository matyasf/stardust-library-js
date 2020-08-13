import Zone from "./Zone";
import Vec2D from "../geom/Vec2D";

export default class ZoneCollection {

    zones: Zone[] = [];

    /**
     * Returns `null` if there are no zones
     */
    getRandomPointInZones(): Vec2D|null {
        let md2D: Vec2D|null = null;
        const numZones = this.zones.length;
        if (numZones > 1)
        {
            let sumArea = 0;
            const areas: number[] = [];
            for (let i = 0; i < numZones; i++)
            {
                sumArea += this.zones[i].getArea();
                areas.push(sumArea);
            }
            let position = Math.random() * sumArea;
            for (let i = 0; i < areas.length; i++)
            {
                if (position <= areas[i])
                {
                    md2D = this.zones[i].getPoint();
                    break;
                }
            }
        }
        else if (numZones == 1)
        {
            md2D = this.zones[0].getPoint();
        }
        return md2D;
    }
}
