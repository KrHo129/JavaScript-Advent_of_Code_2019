// For Intcode computer:
function getParameterModeArray(parametersString, len) {
    let resultArray = getReverseArray(parametersString.split(""));
    for (let l = resultArray.length; l < len; l++) {
        resultArray.push("0");
    }
    return resultArray;
}
function getParameterValue(dataArr, paramModeArr, pos, parameterIndex) {
    return paramModeArr[parameterIndex - 1] === "0" ? dataArr[dataArr[pos + parameterIndex]] : dataArr[pos + parameterIndex];
}

// common
function getReverseArray(array) {
    let rArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
        rArray.push(array[i]);
    }
    return rArray;
}


// output results
function output(dayIdentifier, timeStart = new Date(), result1 = "null", result2 = "null", comment = "") {
    const resultsElement = document.querySelector(".js-results");

    const timeNedded = new Date() - timeStart;
    const headerElement = document.createElement("h2");
    headerElement.innerHTML = dayIdentifier;
    resultsElement.appendChild(headerElement);

    const dayResultElement = document.createElement("div");
    dayResultElement.classList.add(dayIdentifier.replace(" ", "-"));
    dayResultElement.innerHTML = ("<b>Part 1: </b>" + result1 +
        "<br><b>Part 2: </b>" + result2 +
        "<br>" + comment +
        "<br><br>Finished in: " + timeNedded / 1000 + "s");
    resultsElement.appendChild(dayResultElement);
}
