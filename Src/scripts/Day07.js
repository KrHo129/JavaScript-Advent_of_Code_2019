(function () {

    const dataStrArr = dataDay07.split(",");

    function resetInputData() {
        const intData = [];
        for (let i = 0; i < dataStrArr.length; i++) {
            intData[i] = parseInt(dataStrArr[i]);
        }
        return intData;
    }

    function generateParseSettingsArr(min, max) {
        const parseSettings = [];
        const neededChars = [];
        for (let i = min; i < max + 1; i++) {
            neededChars.push(i.toString());
        }

        for (let i = 1000; i < 100000; i++) {
            let str = i.toString();
            if (str.length === 4) {
                str = "0" + str;
            }
            if (str.length !== 5) {
                continue;
            }
            let isValid = true;
            for (char of neededChars) {
                if (str.indexOf(char) < 0) {
                    isValid = false;
                }
            }
            if (isValid) {
                parseSettings.push(str);
            }
        }
        return parseSettings;
    }


    function runProgram(programData) {
        const numericData = programData.data;

        let position = programData.position;
        let counter = 0;

        while (true) {
            let optCodeStr = numericData[position].toString();
            let instruction = 0;
            let parametersStr = "";
            if (optCodeStr >= 2) {
                instruction = parseInt(optCodeStr.substring(optCodeStr.length - 2));
                parametersStr = optCodeStr.substring(0, optCodeStr.length - 2);
            } else {
                instruction = parseInt(optCodeStr);
            }

            if (instruction === 1) {
                const parameterModeArray = getParameterModeArray(parametersStr, 2);

                const paramVal1 = getParameterValue(numericData, parameterModeArray, position, 1);
                const paramVal2 = getParameterValue(numericData, parameterModeArray, position, 2);

                numericData[numericData[position + 3]] = paramVal1 + paramVal2;

                position += 4;
            } else if (instruction === 2) {
                const parameterModeArray = getParameterModeArray(parametersStr, 2);

                const paramVal1 = getParameterValue(numericData, parameterModeArray, position, 1);
                const paramVal2 = getParameterValue(numericData, parameterModeArray, position, 2);

                numericData[numericData[position + 3]] = paramVal1 * paramVal2;

                position += 4;

            } else if (instruction === 3) {
                if (programData.input.length > 0) {
                    numericData[numericData[position + 1]] = programData.input[0];
                    programData.input.shift();
                    position += 2;
                }
                else {
                    programData.data = numericData;
                    programData.position = position;
                    return programData;
                }

            } else if (instruction === 4) {
                const parameterModeArray = getParameterModeArray(parametersStr, 1);

                const val = getParameterValue(numericData, parameterModeArray, position, 1);
                // console.log("[OUTPUT]: ", val);

                programData.output.push(val);

                position += 2;

            } else if (instruction === 5) {
                const parameterModeArray = getParameterModeArray(parametersStr, 2);

                const param1 = getParameterValue(numericData, parameterModeArray, position, 1);
                const param2 = getParameterValue(numericData, parameterModeArray, position, 2);

                if (param1 !== 0) {
                    position = param2;
                } else {
                    position += 3;
                }
            } else if (instruction === 6) {
                const parameterModeArray = getParameterModeArray(parametersStr, 2);

                const param1 = getParameterValue(numericData, parameterModeArray, position, 1);
                const param2 = getParameterValue(numericData, parameterModeArray, position, 2);

                if (param1 === 0) {
                    position = param2;
                } else {
                    position += 3;
                }
            } else if (instruction === 7) {
                const parameterModeArray = getParameterModeArray(parametersStr, 2);

                const param1 = getParameterValue(numericData, parameterModeArray, position, 1);
                const param2 = getParameterValue(numericData, parameterModeArray, position, 2);

                if (param1 < param2) {
                    numericData[numericData[position + 3]] = 1;
                } else {
                    numericData[numericData[position + 3]] = 0;
                }

                position += 4;
            } else if (instruction === 8) {
                const parameterModeArray = getParameterModeArray(parametersStr, 2);

                const param1 = getParameterValue(numericData, parameterModeArray, position, 1);
                const param2 = getParameterValue(numericData, parameterModeArray, position, 2);

                if (param1 === param2) {
                    numericData[numericData[position + 3]] = 1;
                } else {
                    numericData[numericData[position + 3]] = 0;
                }
                position += 4;
            } else if (instruction === 99) {
                // console.log("HALT -> code 99");
                programData.halt = true;

                return programData;
            } else {
                console.log("[ERROR]: unknown instruction value '" + instruction + "'");
                break;

            }

            if (counter++ > 10000) {
                console.log("[ERROR]: max counter reached");
                return 0;
            }
        }
    }

    function part1(inputVal) {
        const parseSettingsArr = generateParseSettingsArr(0, 4);
        let maxOutput = 0;

        for (parseSetting of parseSettingsArr) {
            const programs = [];
            for (let i = 0; i < parseSetting.length; i++) {
                const currProgram = {
                    data: resetInputData(),
                    position: 0,
                    input: [parseInt(parseSetting[i])],
                    output: [],
                    lastOutput: [],
                    halt: false,
                }
                if (i === 0) {
                    currProgram.input.push(inputVal);
                }
                programs.push(currProgram);
            }

            for (let i = 0; i < 5; i++) {
                programs[i] = runProgram(programs[i]);
                if (i < programs.length - 1) {
                    programs[i + 1].input.push(programs[i].output[0]);
                }
            }
            if (programs[4].output[0] > maxOutput) {
                maxOutput = programs[4].output[0];
            }
        }
        return maxOutput;
    }

    function part2(inputVal) {
        const parseSettingsArr = generateParseSettingsArr(5, 9);
        let maxOutput = 0;
        let bestParseSetting = "";

        for (parseSett of parseSettingsArr) {
            const programs = [];
            for (let i = 0; i < parseSett.length; i++) {
                const currProgram = {
                    data: resetInputData(),
                    position: 0,
                    input: [parseInt(parseSett[i])],
                    output: [],
                    lastOutput: [],
                    halt: false,
                }
                if (i === 0) {
                    currProgram.input.push(inputVal);
                }
                programs.push(currProgram);
            }

            let noOutput = false;
            let loopCounter = 0;
            let finalOutput;
            while (true) {
                for (let i = 0; i < programs.length; i++) {
                    if (programs[i].input.length > 0) {

                        programs[i] = runProgram(programs[i]);

                        if (programs[i].halt && i === 4) {
                            finalOutput = programs[i].output[programs[i].output.length - 1];
                            noOutput = true;
                            break;
                        } else {
                            let programIndex = i < programs.length - 1 ? i + 1 : 0;

                            programs[programIndex].input = programs[programIndex].input.concat(programs[i].output);
                            programs[i].lastOutput = programs[i].output;
                            programs[i].output = [];
                        }
                    } else {
                        console.log("No needed input detected");
                        noOutput = true;
                        break;
                    }
                }
                if (noOutput) {
                    break;
                }
                if (loopCounter++ > 50) {
                    console.log("ininite loop");
                    break;
                }
            }
            if (finalOutput !== null && maxOutput < finalOutput) {
                maxOutput = finalOutput;
                bestParseSetting = parseSett;
            }
        }
        return maxOutput;
    }


    const startTime = new Date();
    output("Day 07", startTime, part1(0), part2(0));
})();