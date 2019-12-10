(function () {

    const inputData = dataDay05.split(",");


    

    function part01(userInput) {

        const numericData = [];
        for (let i = 0; i < inputData.length; i++) {
            numericData[i] = parseInt(inputData[i]);
        }

        let position = 0;
        let counter = 0;
        let lastOutput;
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
                numericData[numericData[position + 1]] = userInput;

                position += 2;

            } else if (instruction === 4) {
                const parameterModeArray = getParameterModeArray(parametersStr, 1);

                const val = getParameterValue(numericData, parameterModeArray, position, 1);
                // console.log("[OUTPUT]: " + val)
                lastOutput = val;

                position += 2;

            } else if (instruction === 99) {
                // console.log("HALT -> code 99");
                return lastOutput;
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

    function part02(userInput) {

        const numericData = [];
        for (let i = 0; i < inputData.length; i++) {
            numericData[i] = parseInt(inputData[i]);
        }

        let position = 0;
        let counter = 0;
        let lastOutput;
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
                numericData[numericData[position + 1]] = userInput;

                position += 2;

            } else if (instruction === 4) {
                const parameterModeArray = getParameterModeArray(parametersStr, 1);

                const val = getParameterValue(numericData, parameterModeArray, position, 1);
                // console.log("[OUTPUT]: " + val)
                lastOutput = val;

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
                return lastOutput;
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

    const startTime = new Date();
    output("Day 05", startTime, part01(1), part02(5));
})();