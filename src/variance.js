import sumNthPowerDeviations from "./sum_nth_power_deviations.js";

/**
 * The [variance](http://en.wikipedia.org/wiki/Variance)
 * is the sum of squared deviations from the mean.
 *
 * This is an implementation of variance, not sample variance:
 * see the `sampleVariance` method if you want a sample measure.
 *
 * @param {Array<number>} x a population of one or more data points
 * @returns {number} variance: a value greater than or equal to zero.
 * zero indicates that all values are identical.
 * @throws {Error} if x's length is 0
 * @example
 * variance([1, 2, 3, 4, 5, 6]); // => 2.9166666666666665
 */
function variance(x) {
    if (x.length === 0) {
        throw new Error("variance requires at least one data point");
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

    // Find the mean of squared deviations between the
    // mean value and each value.
    return sumNthPowerDeviations(parsedX, 2) / parsedX.length;
}

export default variance;
