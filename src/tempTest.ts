
import 'reflect-metadata'; // !!! THIS NEEDS TO BE IMPORTED FIRST !!!
import SteadyClock from "./clocks/SteadyClock";
import UniformRandom from "./mathStuff/UniformRandom";
import StardustSerializer from "./serialization/StardustSerializer";
import Emitter from "./emitters/Emitter";
import Age from "./actions/Age";

function vmi() {
    console.log("test");
    const emitter: Emitter = new Emitter();
    emitter.fps = 43;
    const cl: SteadyClock = new SteadyClock();
    cl.ticksPerCall = 222;
    const r1: UniformRandom = new UniformRandom();
    r1.radius = 10;
    r1.center = 5;
    cl.initialDelay = r1;
    emitter.clock = cl;
    const ac1 = new Age(345);
    emitter.addAction(ac1);

    const ser = new StardustSerializer();
    const str = ser.serializeEmitter(emitter);
    const newEm: Emitter = ser.deserializeEmitter(str);
    const dc = 4;
}

vmi();
console.log("ended");
