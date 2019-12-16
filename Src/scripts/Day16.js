(function () {
    const basePattern = [0, 1, 0, -1];

    function part1(numOfPhases) {
        let data = dataDay16.split("");
        let outputData = [];

        for (let n = 0; n < numOfPhases; n++) {
            outputData = [];
            const dataLen = data.length;
            let tempData = JSON.parse(JSON.stringify(data));
            for (let i = 0; i < dataLen; i++) {
                let patternElementRepeatCount = 0;
                let patternElementIndex = 1;
                let currentOutputNum = 0;
                for (let j = 0; j < tempData.length; j++) {
                    if (patternElementRepeatCount >= i + 1) {
                        patternElementRepeatCount = 0;
                        patternElementIndex = patternElementIndex < basePattern.length - 1 ? patternElementIndex + 1 : 0;
                    }
                    patternElementRepeatCount++;
                    if (patternElementIndex === 0 || patternElementIndex === 2) {
                        continue;
                    }
                    currentOutputNum += tempData[j] * basePattern[patternElementIndex];

                }
                tempData.shift();
                outputData.push(Math.abs(currentOutputNum % 10));
            }
            data = outputData;
        }

        return outputData.toString().replace(/,/g, "").substr(0, 8);
    }

    function part2(numOfPhases) {
        let input = dataDay16;
        const offset = parseInt(input.substr(0, 7));
        const neededDigits = input.length * 10000 - offset;

        input = input.repeat(Math.ceil(neededDigits / input.length));
        let data = input.split("");

        for (let n = 0; n < numOfPhases + 1; n++) {
            const outputData = [];
            let lastOutputNum = 0;
            for (let i = data.length - 1; i >= 0; i--) {
                lastOutputNum = (lastOutputNum + data[i]) % 10;
                outputData.push(lastOutputNum);
            }
            outputData.reverse();
            data = outputData;
        }

        const result = data.toString().replace(/,/g, "");

        return result.substr(result.length - neededDigits, 8);
    }


    const startTime = new Date();
    output("Day 16", startTime, part1(100), part2(100));
})();