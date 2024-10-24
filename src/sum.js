/**
 * Our default sum is the [Kahan-Babuska algorithm](https://pdfs.semanticscholar.org/1760/7d467cda1d0277ad272deb2113533131dc09.pdf).
 * This method is an improvement over the classical
 * [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm).
 * It aims at computing the sum of a list of numbers while correcting for
 * floating-point errors. Traditionally, sums are calculated as many
 * successive additions, each one with its own floating-point roundoff. These
 * losses in precision add up as the number of numbers increases. This alternative
 * algorithm is more accurate than the simple way of calculating sums by simple
 * addition.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x input
 * @return {number} sum of all input numbers
 * @example
 * sum([1, 2, 3]); // => 6
 */
function sum(x) {
    // If the array is empty, we needn't bother computing its sum
    if (x.length === 0) {
        return 0;
    }

    // Parse all values to numbers, throw error if any value is not parsable
    const parsedX = x.map((num) => {
        const parsedNum = Number.parseFloat(num);
        if (Number.isNaN(parsedNum)) {
            throw new Error(
                "All elements in the array must be numbers or parsable to numbers."
            );
        }
        return parsedNum;
    });

    // Initializing the sum as the first number in the array
    let sum = parsedX[0];

    // Keeping track of the floating-point error correction
    let correction = 0;

    let transition;

    if (typeof sum !== "number") {
        return Number.NaN;
    }

    for (let i = 1; i < parsedX.length; i++) {
        if (typeof parsedX[i] !== "number") {
            return Number.NaN;
        }
        transition = sum + parsedX[i];

        // Here we need to update the correction in a different fashion
        // if the new absolute value is greater than the absolute sum
        if (Math.abs(sum) >= Math.abs(parsedX[i])) {
            correction += sum - transition + parsedX[i];
        } else {
            correction += parsedX[i] - transition + sum;
        }

        sum = transition;
    }

    // Returning the corrected sum
    return sum + correction;
}

export default sum;
