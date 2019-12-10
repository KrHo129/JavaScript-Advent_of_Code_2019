(function () {
    const inputArray = dataDay01.split("\n");

    // part 2
    let sum2 = 0;
    for (line of inputArray) {
        let counter = 0;
        const max = 1000;
        let mass = parseInt(line);
        while (true) {
            const fuel = Math.floor(mass / 3) - 2;
            if (fuel > 0) {
                sum2 += fuel;
                mass = fuel;
            } else {
                break;
            }

            if (counter++ > max) {
                console.log("wuups");
                break;
            }
        }
    }

    // part 1
    sum1 = 0;
    for (line of inputArray) {
        const val = Math.floor(parseInt(line) / 3) - 2;
        sum1 += val;
    }
    
    const startTime = new Date();
    output("Day 01", startTime, sum1, sum2);

})();