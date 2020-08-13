import 'reflect-metadata';
import Emitter from "./emitters/Emitter";
import SteadyClock from "./clocks/SteadyClock";
import UniformRandom from "./mathStuff/UniformRandom";
import StardustSerializer from "./serialization/StardustSerializer";

function vmi() {
    console.log("test");
    debugger
    const emitter: Emitter = new Emitter();
    const cl: SteadyClock = new SteadyClock();
    cl.ticksPerCall = 222;
    const r1: UniformRandom = new UniformRandom();
    r1.radius = 10;
    r1.center = 5;
    cl.initialDelay = r1;
    emitter.clock = cl;

    const ser = new StardustSerializer();
    const str = ser.serialize(emitter);
    const newEm = ser.deserialize(str);

    const dc = 4;
}
vmi();
