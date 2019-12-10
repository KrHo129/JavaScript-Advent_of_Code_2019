(function () {

    const splitedInput = dataDay06.split("\n");
    const data = {};
    for (row of splitedInput) {
        splitedRow = row.split(")");
        if (typeof (data[splitedRow[0]]) === "undefined") {
            data[splitedRow[0]] = [splitedRow[1]];
        } else {
            data[splitedRow[0]].push(splitedRow[1]);
        }
    }

    let totalOrbits = 0;
    let youPath = "";
    let sanPath = "";
    class map {
        constructor(_name, _depth, _prevPath) {
            this.depth = _depth;
            this.name = _name;
            this.path = _prevPath + "-" + _name;
            this.childs = typeof (data[_name]) !== "undefined" ? data[_name] : null;
            totalOrbits += _depth;
            if (this.childs !== null) {
                for (let i = 0; i < this.childs.length; i++) {
                    this[this.childs[i]] = new map(this.childs[i], this.depth + 1, this.path);
                }
            }
        }

        findPath(targetName) {
            if (this.childs !== null) {
                if (this.childs.indexOf(targetName) >= 0) {
                    return this.path;
                }
                let path = null;
                for (let i = 0; i < this.childs.length; i++) {
                    path = this[this.childs[i]].findPath(targetName);
                    if (path) {
                        return path;
                    }
                }
            }
        }
    }
    const myMap = new map("COM", 0, "");

    function part1() {
        return totalOrbits;
    }

    function part2() {
        // i could just save the needed paths on map creation, but I wanted to parctice recursion
        youPath = getReverseArray(myMap.findPath("YOU").split("-"));
        sanPath = getReverseArray(myMap.findPath("SAN").split("-"));

        let commonOrbit;
        let orbitCount = 0;
        for (let i = 0; i < youPath.length; i++) {
            if (sanPath.indexOf(youPath[i]) >= 0) {
                commonOrbit = youPath[i];
                orbitCount = i;
                break;
            }
        }

        orbitCount += sanPath.indexOf(commonOrbit);

        return orbitCount;        
    }


    const startTime = new Date();
    output("Day 06", startTime, part1(), part2());
})();