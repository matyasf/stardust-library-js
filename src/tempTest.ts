import {Signal} from "typed-signals";

function vmi() {
    let mySignal = new Signal<(n: number, b: boolean, s: string) => void>();
    // not nice..
    let connection = mySignal.connect((n)=> console.log(`ss: ${n}`));
    mySignal.emit(42, true, 'Galactic Gargleblaster');

    connection.disconnect();
    console.log("wea");
}
vmi();
