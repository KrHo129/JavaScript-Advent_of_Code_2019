(function () {

    const inputData = dataDay02.split(",");

    function part01() {

        const numericData = [];
        for (let i = 0; i < inputData.length; i++) {
            numericData[i] = parseInt(inputData[i]);
        }
        numericData[1] = 12;
        numericData[2] = 2;


        let position = 0;
        let counter = 0;
        while (true) {
            const opCode = numericData[position];
            if (opCode === 1) {
                const newVal = numericData[numericData[position + 1]] + numericData[numericData[position + 2]];
                numericData[numericData[position + 3]] = newVal;

            } else if (opCode === 2) {
                const newVal = numericData[numericData[position + 1]] * numericData[numericData[position + 2]];
                numericData[numericData[position + 3]] = newVal;
            } else if (opCode === 99) {
                return numericData[0];
            }
            position += 4;

            if (counter++ > 10000) {
                console.log("[error]: max counter reached");
                return 0;
            }
        }
    }

    function part02() {
        const numericData = [];
        function resetVlaues(_noun, _verb) {
            for (let i = 0; i < inputData.length; i++) {
                numericData[i] = parseInt(inputData[i]);
            }

            numericData[1] = _noun;
            numericData[2] = _verb;
        }
        const outputResult = 19690720;

        for (let noun = 0; noun < 100; noun++) {
            for (let verb = 0; verb < 100; verb++) {

                let position = 0;
                let counter = 0;
                resetVlaues(noun, verb);
                while (true) {
                    const opCode = numericData[position];
                    if (opCode === 1) {
                        const newVal = numericData[numericData[position + 1]] + numericData[numericData[position + 2]];
                        numericData[numericData[position + 3]] = newVal;

                    } else if (opCode === 2) {
                        const newVal = numericData[numericData[position + 1]] * numericData[numericData[position + 2]];
                        numericData[numericData[position + 3]] = newVal;
                    } else if (opCode === 99) {
                        if (numericData[0] == outputResult) {
                            return 100 * noun + verb;
                        }

                        break;

                    }
                    position += 4;

                    if (counter++ > 10000) {
                        console.log("[error]: max counter reached");
                        break;
                    }
                }
            }
        }
        return 0;
    }

    const startTime = new Date();
    output("Day 02", startTime, part01(), part02());
})();