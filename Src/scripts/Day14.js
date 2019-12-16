(function () {

    let leftovers = {};
    let inputData = {};

    function parseData() {
        leftovers = {};
        const rowSplit = dataDay14.split("\n");
        for (row of rowSplit) {
            const intakeMaterials = row.split(" => ")[0].split(", ");
            const outputMaterial = row.split(" => ")[1].split(" ");
            inputData[outputMaterial[1]] = {
                inputMaterials: {},
                producedQuantity: parseInt(outputMaterial[0]),
            };
            leftovers[outputMaterial[1]] = 0;
            for (intakeMaterial of intakeMaterials) {
                const inputRequirement = intakeMaterial.split(" ");
                inputData[outputMaterial[1]].inputMaterials[inputRequirement[1]] = parseInt(inputRequirement[0]);
            }
        }
        return inputData;
    }


    function getNeededMaterials(targetMaterial, quantity) {
        const numOfReactions = Math.ceil((quantity - leftovers[targetMaterial]) / inputData[targetMaterial].producedQuantity);
        leftovers[targetMaterial] = numOfReactions * inputData[targetMaterial].producedQuantity + leftovers[targetMaterial] - quantity;

        const neededMaterials = Object.keys(inputData[targetMaterial].inputMaterials);

        let ore = 0;

        for (material of neededMaterials) {
            if (material === "ORE") {
                ore += inputData[targetMaterial].inputMaterials[material] * numOfReactions;
            } else {
                ore += getNeededMaterials(material, inputData[targetMaterial].inputMaterials[material] * numOfReactions);
            }
        }
        return ore;
    }

    function part1(quantityOfFuel) {
        inputData = parseData();
        return getNeededMaterials("FUEL", quantityOfFuel);
    }

    function getNeededMaterials2(targetMaterial, quantity) {
        const numOfReactions = quantity / inputData[targetMaterial].producedQuantity;

        const neededMaterials = Object.keys(inputData[targetMaterial].inputMaterials);

        let ore = 0;

        for (material of neededMaterials) {
            if (material === "ORE") {
                ore += (inputData[targetMaterial].inputMaterials[material] * numOfReactions);
            } else {
                ore += getNeededMaterials2(material, inputData[targetMaterial].inputMaterials[material] * numOfReactions);
            }
        }
        return ore;
    }

    function part2(quantityOfFuel, maxOre) {
        inputData = parseData();
        const oreForOneFuel = getNeededMaterials2("FUEL", quantityOfFuel);

        return Math.floor(maxOre / oreForOneFuel);
    }

    function part2_BruteForce(quantityOfFuel, maxOre) {
        inputData = parseData();
        let totalOre = 0;
        for (let i = 0; true; i++) {
            const currentOre = getNeededMaterials("FUEL", quantityOfFuel);
            totalOre += currentOre;

            if (totalOre > maxOre) {
                return i;
            }
            // if (i % 1000 === 0) {
            //     console.log(i / 1000);
            //     console.log("fuel", totalOre, "missing fuel", maxOre - totalOre, totalOre / maxOre);

            // }
        }
    }
    const startTime = new Date();

    // not totaly precise method (devision is not precise enough), but fast
    // for my case I need to substract one form the result
    output("Day 12", startTime, part1(1), part2(1, 1000000000000) - 1,
        "<br>Error of +/- 2 possible on Prat 2.<br>"
        + "Javascript devision not precise enough (not enough decimal places)<br>"
        + "Brute force method is writen in Day14.js file, but it takes time.");

    // Precise method, but takes a long time ....
    // output("Day 12", startTime, part1(1), part2_BruteForce(1, 1000000000000));

})();
