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

        return Math.floor(maxOre / oreForOneFuel) - 1;
    }

    const startTime = new Date();
    output("Day 12", startTime, part1(1), part2(1, 1000000000000), "nenatančno deljenje v js ... premalo decimalk");


    const oreLog = {};
    function getNeededMaterials3(targetMaterial, quantity) {
        const numOfReactions = Math.ceil((quantity - leftovers[targetMaterial]) / inputData[targetMaterial].producedQuantity);
        leftovers[targetMaterial] = numOfReactions * inputData[targetMaterial].producedQuantity + leftovers[targetMaterial] - quantity;

        const neededMaterials = Object.keys(inputData[targetMaterial].inputMaterials);

        let ore = 0;

        for (material of neededMaterials) {
            if (material === "ORE") {
                if (typeof (oreLog[targetMaterial]) === "undefined") {
                    oreLog[targetMaterial] = {
                        oreSequence: "",
                        pattern: "",
                        foundAtIndex: -1,
                    }
                }
                const oreVal = inputData[targetMaterial].inputMaterials[material] * numOfReactions;
                ore += oreVal;

                oreLog[targetMaterial].oreSequence += oreVal.toString() + ",";
            } else {
                ore += getNeededMaterials3(material, inputData[targetMaterial].inputMaterials[material] * numOfReactions);
            }
        }
        return ore;
    }


    function test() {
        inputData = parseData();
        let totalOre = 0;
        for (let i = 0; true; i++) {
            const currentOre = getNeededMaterials("FUEL", 1);
            totalOre += currentOre;

            if (totalOre > 1000000000000) {
                return totalOre - currentOre;
            }
            if (i%1000 === 0) {
                console.log(i/1000);
                console.log("fuel", totalOre, "missing fuel", 1000000000000 - totalOre, totalOre / 1000000000000);
                
            }
            if (i > 5000000) {
                console.log("ininite break");
                break;
            }
        }
        for (ore of Object.keys(oreLog)) {
            console.log(oreLog[ore].oreSequence);
            
        }
    }

    test();

})();
