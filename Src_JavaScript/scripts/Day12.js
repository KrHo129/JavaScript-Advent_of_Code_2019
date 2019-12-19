(function () {

    const rowSplit = dataDay12.split("\n");
    const coorKeys = ["x", "y", "z"];


    function parseInputData() {
        const inputData = {}
        // parse input data
        for (rowIndx in rowSplit) {
            inputData[rowIndx] = {
                position: {
                    x: parseInt(rowSplit[rowIndx].split("x=")[1].split(",")[0]),
                    y: parseInt(rowSplit[rowIndx].split("y=")[1].split(",")[0]),
                    z: parseInt(rowSplit[rowIndx].split("z=")[1].split(",")[0]),
                },
                velocity: {
                    x: 0,
                    y: 0,
                    z: 0,
                }
            };
        }
        return inputData;
    }


    function applyGravity(inputData) {
        const moonKeys = Object.keys(inputData);

        for (moonKey1 of moonKeys) {
            const firstMoonData = inputData[moonKey1];
            for (moonKey2 of moonKeys) {
                const secondMoonPostion = inputData[moonKey2].position;
                // if it is the same moon, do nothing
                if (moonKey1 === moonKey2) {
                    continue;
                }

                for (coorKey of coorKeys) {
                    if (firstMoonData.position[coorKey] === secondMoonPostion[coorKey]) {
                        continue;
                    }
                    const velocityModifier = firstMoonData.position[coorKey] < secondMoonPostion[coorKey] ? 1 : -1;
                    inputData[moonKey1].velocity[coorKey] += velocityModifier;
                }
            }
        }
        return inputData;
    }

    function applyVelocity(inputData) {
        const moonKeys = Object.keys(inputData);
        for (moonKey of moonKeys) {
            for (coorKey of coorKeys) {
                inputData[moonKey].position[coorKey] += inputData[moonKey].velocity[coorKey];
            }
        }
        return inputData;
    }

    function calculateTotalEnergy(inputData) {
        const moonKeys = Object.keys(inputData);
        let total = 0;
        for (moonKey of moonKeys) {
            let pot = 0;
            let kin = 0;
            for (coorKey of coorKeys) {
                pot += Math.abs(inputData[moonKey].position[coorKey]);
                kin += Math.abs(inputData[moonKey].velocity[coorKey]);
            }
            total += pot * kin;
        }
        return total;
    }
    function calculateAxisEnergy(inputData, axis) {
        const moonKeys = Object.keys(inputData);
        let total = 0;
        for (moonKey of moonKeys) {
            let pot = Math.abs(inputData[moonKey].position[coorKey]);
            let kin = Math.abs(inputData[moonKey].velocity[coorKey]);
            total += pot * kin;
        }
        return total;
    }

    function part1(numOfCycles) {
        const inputData = parseInputData();
        for (i = 0; i < numOfCycles; i++) {
            applyVelocity(applyGravity(inputData));
        }

        return calculateTotalEnergy(inputData);
    }

    function isPrime(num) {
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                return false;
            }
        } 
        return true;
    }

    function getCommonMultyplier(numArray) {
        const allPrimes = [];
        for (num of numArray) {
            const currNumPrimes = [];
            let i = 2;
            while (num > 1) {
                if (isPrime(i) && num % i === 0) {
                    currNumPrimes.push(i);
                    num /= i;
                } else {
                    i++;
                }
            }
            allPrimes.push(currNumPrimes);
        }

        const commonPrimes = [];
        for (let arrIndx1 = 0; arrIndx1 < allPrimes.length; arrIndx1++) {
            for (let i = 0; i < allPrimes[arrIndx1].length; i++) {
                for (let arrIndx2 = 0; arrIndx2 < allPrimes.length; arrIndx2++) {
                    if (arrIndx1 === arrIndx2) {
                        continue;
                    }
                    const indx2 = allPrimes[arrIndx2].indexOf(allPrimes[arrIndx1][i]);
                    if (indx2 >= 0) {
                        commonPrimes.push(allPrimes[arrIndx1][i]);
                        allPrimes[arrIndx1].splice(i, 1);
                        allPrimes[arrIndx2].splice(indx2, 1);
                    }
                }
            }
        }
        let result = 1;
        for (num of commonPrimes) {
            result *= num;
        }
        for (arr of allPrimes) {
            for (num of arr) {
                result *= num;
            }
        }

        return result;
    }

    function part2() {
        const inputData = parseInputData();

        const repeatData = {
            x: null,
            y: null,
            z: null,
        }

        for (let i = 0; true; i++) {
            if (i > 0) {
                let repeatFound = 0;
                let repeatNums = [];
                for (coorKey of coorKeys) {
                    if (repeatData[coorKey] === null && calculateAxisEnergy(inputData, coorKey) === 0) {
                        repeatData[coorKey] = i;
                    }
                    if (repeatData[coorKey] !== null) {
                        repeatFound++;
                        repeatNums.push(repeatData[coorKey]);
                    }
                }
                if (repeatFound >= coorKeys.length) {
                    return getCommonMultyplier(repeatNums) * 2;
                }
            }

            applyVelocity(applyGravity(inputData));

            if (i > 200000) {
                console.log(repeatData, i);
                console.log("[Error]: Infinite loop detected");
                break;
            }
        }
    }


    const startTime = new Date();
    output("Day 12", startTime, part1(1000), part2());
})();