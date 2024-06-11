/**
 * FInd the mean of a number array
 * @param {Array} num_array 
 * @returns {float}
 */
function calcMean(num_array) {
    if(num_array.length === 0) return 0;
    
    let sum = 0;
    for(let num of num_array) {
        sum += num;
    }
    return sum/num_array.length;
}

/**
 * Find the median of a number array
 * @param {Array} num_array 
 * @returns {float}
 */
function calcMedian(num_array) {
    num_array.sort((a, b) => a - b);
    let middleIndex = Math.floor(num_array.length / 2);

    if(num_array.length % 2 === 1) { //odd length array
        return num_array[middleIndex];
    } else {
        return (num_array[middleIndex] + num_array[middleIndex - 1]) / 2;
    }
}

/**
 * Find the mode of a number array
 * @param {Array} num_array 
 * @returns {float}
 */
function calcMode(num_array) {
        // make an object with number in arraybeing keys and
        //the number of occurances being the value
        let modeObj = num_array.reduce((obj, num) => {
            obj[num] = (obj[num] || 0) + 1;
            return obj;
        }, {});

        const mode = []; //in an array in case there is more than one mode value
        let occurance = 0;
        for(const key of Object.keys(modeObj)) {
            if (modeObj[key] > occurance) {
                occurance = modeObj[key];
                mode.length = 0;
                mode.push(parseInt(key));
            } else if (modeObj[key] === occurance) {
                mode.push(parseInt(key));
            }
        }
        return mode;
}

/**
 * Attempt to convert a string of numbers to an array. Return an error if NaN is in array or array length is 0. Otherwise return the numArray
 * @param {string} nums 
 * @returns {Array|Error}
 */
function convertAndValidateNums (nums) {
    const num_array = nums.split(',').map(Number);
    if(num_array.includes(NaN)) {
        return new Error(`Please use only number values for calculator`);
    } 
    if(num_array.length === 0) {
        return new Error(`Numbers are required`);
    }
    return num_array;
}



module.exports = {
    calcMean,
    calcMedian,
    calcMode,
    convertAndValidateNums
};