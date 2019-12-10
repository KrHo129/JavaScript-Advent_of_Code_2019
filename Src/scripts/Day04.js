(function () {

    const inputDataStr = dataDay04.split("-");
    const inputData = { start: parseInt(inputDataStr[0]), end: parseInt(inputDataStr[1]) };

    function part1() {
        const results = [];
        for (let pass = inputData.start; pass < inputData.end + 1; pass++) {
            const passStr = pass.toString();
            let hasDuplicate = false;
            let isIncresing = true;

            for (let i = 0; i < passStr.length; i++) {
                char = passStr[i];
                if (i !== 0) {
                    if (parseInt(char) < parseInt(passStr[i - 1])) {
                        isIncresing = false;
                        break;
                    }
                }
                if (!hasDuplicate && i !== 0) {
                    if (char === passStr[i - 1]) {
                        hasDuplicate = true;
                    }
                }
            }
            if (hasDuplicate && isIncresing) {
                results.push(pass);
            }
        }
        return results.length;
    }

    function part2() {
        const results = [];
        for (let pass = inputData.start; pass < inputData.end + 1; pass++) {
            const passStr = pass.toString();
            let hasDuplicate = false;
            let isIncresing = true;

            for (let i = 0; i < passStr.length; i++) {
                char = passStr[i];
                if (i !== 0) {
                    if (parseInt(char) < parseInt(passStr[i - 1])) {
                        isIncresing = false;
                        break;
                    }
                }
                if (!hasDuplicate && i !== 0) {
                    try {
                        if (char === passStr[i - 1] && char !== passStr[i + 1] && char !== passStr[i - 2]) {
                            hasDuplicate = true;
                        }

                    } catch (error) {

                    }
                }
            }
            if (hasDuplicate && isIncresing) {
                results.push(pass);
            }
        }
        return results.length;
    }



    const startTime = new Date();
    output("Day 04", startTime, part1(), part2())
})();