const {
    calcMode,
    calcMean,
    calcMedian
} = require("./calc");

describe("#calcMedian", function(){
    it("find the median of an even length array of numbers", function(){ 
        expect(calcMedian([1, 80, 5, 15])).toEqual(10)
    })
    it("find the median of an odd length array of numbers", function () { 
        expect(calcMedian([1, 80, 5])).toEqual(5)
    })
})

describe("#calcMean", function () {
    it("find the mean of an empty array", function () { 
        expect(calcMean([])).toEqual(0)
    })
    it("finds the mean of an array of numbers", function () { 
        expect(calcMean([1, 80, 5, 14])).toEqual(25)
    })
})

describe("#calcMode", function () {
    it("find the mode of an array of numbers", function () { 
        expect(calcMode([1,2,2,3,3,3])).toEqual([3])
    })
    it("find the mode of an array of numbers with more than one value that appears with the same frequency", function () { 
        expect(calcMode([1,2,2,2,3,3,3])).toEqual([2,3])
    })
})