(function () {

    const inputDataWires = dataDay03.split("\n");
    const inputData = [inputDataWires[0].split(","), inputDataWires[1].split(",")];

    const grid = {
        steps: {},
    };
    const intersections = [];

    function part1() {
        
        for (wire in inputData) {
            grid.steps[wire] = {};
            let x = 0;
            let y = 0;
            let stepCoount = 0;
            grid[wire] = {};
            for (move of inputData[wire]) {
                const direction = move[0];
                let moveSize = parseInt(move.substring(1));
                while (moveSize > 0) {
                    stepCoount++;
                    if (direction === "R") {
                        x++;
                    } else if (direction === "L") {
                        x--;
                    } else if (direction === "U") {
                        y++;
                    } else if (direction === "D") {
                        y--;
                    }

                    if (typeof(grid[wire][x]) === "undefined") {
                        grid[wire][x] = [y];
                    } else {
                        grid[wire][x].push(y);
                    }
                    const currCoor = x.toString() + "/" + y.toString();
                    if (typeof (grid.steps[wire][currCoor]) === "undefined") {
                        grid.steps[wire][currCoor] = stepCoount;
                    }
                    moveSize--;
                }
            }
        }
        
        let count = 0;

        const xVals = Object.keys(grid[0]);
        
        for (x1 of xVals) {
            for (y1 of (grid[0][x1])){
                if (typeof(grid[1][x1]) !== "undefined" && grid[1][x1].indexOf(y1) >= 0) {
                    intersections.push([parseInt(x1), y1]);
                }
            }
        }

        let minDistance = null;
        for (intersectoin of intersections) {
            const startDistance = Math.abs(intersectoin[0]) + Math.abs(intersectoin[1]);
            
            if (minDistance === null || startDistance < minDistance) {
                minDistance = startDistance;
            }
        }
        
        return minDistance;
    }

    function part2() {
        let minSteps = null;

        for (intersectoin of intersections) {
            const currCoor = intersectoin[0].toString() + "/" + intersectoin[1].toString();
            
            const totalDistance = grid.steps[0][currCoor] + grid.steps[1][currCoor];
            if (minSteps == null || minSteps > totalDistance) {
                minSteps = totalDistance;
            }
        }
        return minSteps;
    }

    const startTime = new Date();
    output("Day 03", startTime, part1(), part2());
})();