(function () {
    let layerSize = 25 * 6;

    const inputData = [];
    for (let i = 0; i < dataDay08.length; i += layerSize) {
        inputData.push(dataDay08.substring(i, i + layerSize));
    }

    function part1() {
        let minZeroDigits = layerSize + 1;
        let targetIndex = -1;

        for (let i = 0; i < inputData.length; i++) {
            const layer = inputData[i];
            if (layer.match(/0/g).length < minZeroDigits) {
                minZeroDigits = layer.match(/0/g).length;
                targetIndex = i;
            }
        }
        return inputData[targetIndex].match(/1/g).length * inputData[targetIndex].match(/2/g).length;
    }


    function part2() {
        const renderedImage = [];
        for (let i = 0; i < layerSize; i++) {
            renderedImage.push("2");
        }

        for (let l = 0; l < inputData.length; l++) {
            for (let i = 0; i < renderedImage.length; i++) {
                if (renderedImage[i] === "2" && inputData[l][i] !== "2") {
                    renderedImage[i] = inputData[l][i];
                }
            }
        }
        let stringVal = "";
        for (let i = 0; i < renderedImage.length; i++) {
            stringVal += renderedImage[i];
        }
        
        let result = ""
        for (let i = 0; i < 6*25; i += 25) {
            result += "<br>" + stringVal.substr(i,25);
        }

        return result;
    }



    const startTime = new Date();
    const result2 = part2();
    output("Day 08", startTime, part1(), result2);

    const resultElement = document.querySelector(".Day-08");
    const visualElement = document.createElement("div");
    visualElement.style.lineHeight = "11px";
    resultElement.appendChild(visualElement);
    
    for (let i = 0; i < result2.length; i++) {
        if (/[0-1]/.test(result2[i])) {
            const color = result2[i] === "0" ? "black" : "lightgray"            
            const squereElement = document.createElement("div");
            squereElement.classList.add("squere-small");
            squereElement.classList.add(color);
            visualElement.appendChild(squereElement);
            squereElement.style.display = "inline-block";
        } else if (result2[i] === "<") {
            const brakeElement = document.createElement("div");
            brakeElement.style.width = "100%";
            brakeElement.style.height = "1px";

            visualElement.appendChild(brakeElement);
        }
    }


})();