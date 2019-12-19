(function () {

    const split = dataDay10.split("\n");
    const inputData = {
        comets: [],
    }
    for (let y = 0; y < split.length; y++) {
        for (let x = 0; x < split[y].length; x++) {
            if (split[y][x] === "#") {
                inputData.comets.push([x, y]);
            }
        }
    }

    function compareArraysFirstLayer(array1, array2) {
        let match = true;
        if (array1.length === array2.length) {
            for (let i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) {
                    match = false;
                    break;
                }
            }
        } else {
            match = false;
        }
        return match;
    }

    function getAngle(point1, point2) {
        return Math.atan2(point2[1] - point1[1], point2[0] - point1[0]) * 180 / Math.PI;
    }

    let laserLocation = null;
    let anglesResult = null;

    function part1() {
        let maxComets = 0;
        for (let cometCenter of inputData.comets) {
            const angles = {};
            for (let cometTarget of inputData.comets) {
                if (compareArraysFirstLayer(cometCenter, cometTarget)) {
                    continue;
                }

                const angle = getAngle(cometCenter, cometTarget);

                if (typeof (angles[angle]) === "undefined") {
                    angles[angle] = [cometTarget];
                } else {
                    angles[angle].push(cometTarget);
                }
            }
            const currCometsSeen = Object.keys(angles).length;

            if (maxComets < currCometsSeen) {
                maxComets = currCometsSeen;
                anglesResult = angles;
                laserLocation = cometCenter;
            }
        }
        // console.log("number of seen comets: ", maxComets, "target comet: ", laserLocation);

        return maxComets;
    }

    function sortByDistance(a, b) {
        const aDistance = Math.pow(a[0] - laserLocation[0], 2) + Math.pow(a[1] - laserLocation[1], 2);
        const bDistance = Math.pow(b[0] - laserLocation[0], 2) + Math.pow(b[1] - laserLocation[1], 2);

        return aDistance - bDistance;
    }

    function sortByAngle(a, b) {
        let aAng = parseFloat(a) < -90 ? (parseFloat(a) + 360).toString() : a;
        let bAng = parseFloat(b) < -90 ? (parseFloat(b) + 360).toString() : b;
        return parseFloat(aAng) - parseFloat(bAng);
    }

    function part2(cometCount) {
        const keys = Object.keys(anglesResult).sort(sortByAngle);
        for (let i = 0; i < keys.length; i++) {
            anglesResult[keys[i]].sort(sortByDistance);
        }


        let cometsDestroyed = 0;
        let loopCounter = 0;
        while (true) {
            for (let i = 0; i < keys.length; i++) {
                if (anglesResult[keys[i]].length > 0) {
                    if (cometsDestroyed === cometCount - 1) {
                        const targetComet = anglesResult[keys[i]][0];
                        return targetComet[0] * 100 + targetComet[1];
                    }
                    currCom = anglesResult[keys[i]][0];
                    if (currCom[0] == 8 && currCom[1] == 2) {
                    }
                    anglesResult[keys[i]].shift();
                    cometsDestroyed++;
                }
            }

            if (loopCounter++ > 200) {
                console.log("[Error]: Infinite loop detected");
                break;
            }
        }

        return null;
    }


    const startTime = new Date();
    output("Day 10", startTime, part1(), part2(200));
    // console.log(laserLocation, anglesResult);
})();