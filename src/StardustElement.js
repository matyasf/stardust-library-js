var StardustElement = /** @class */ (function () {
    function StardustElement() {
        var str = this.constructor.name;
        if (!StardustElement.elementCounter.ContainsKey(str)) {
            StardustElement.elementCounter[str] = 0;
        }
        else {
            StardustElement.elementCounter[str]++;
        }
        this.name = str + "_" + StardustElement.elementCounter[str];
    }
    StardustElement.elementCounter = new Map();
    return StardustElement;
}());
