const express = require('express');
const ExpressError = require('./expressError');

const app = express();

//average
app.get('/mean', function(req, res, next) {
    try {
        const nums = req.query;
        if(Object.keys(nums).length === 0) throw new ExpressError(`Numbers are required`, 400);

        const num_array = nums.nums.split(',').map(Number);
        if(num_array.includes(NaN)) throw new ExpressError(`Please use only number values for calculator`, 400);
        if(num_array.length === 0) throw new ExpressError(`Numbers are required`, 400);

        let sum = 0;
        for(let num of num_array) {
            sum += num;
        }
        const mean = sum/num_array.length;
    
        const mean_res = {response: {
            operation: 'mean',
            value: mean
        }}

        return res.json(mean_res);
    } catch (err) {
        return next(err);
    }
})

//midpoint
app.get('/median', (req, res, next) => {
    try {
        const nums = req.query;
        if(Object.keys(nums).length === 0) throw new ExpressError(`Numbers are required`, 400);

        const num_array = nums.nums.split(',').map(Number);
        if(num_array.includes(NaN)) throw new ExpressError(`Please use only number values for calculator`, 400);
        if(num_array.length === 0) throw new ExpressError(`Numbers are required`, 400);

        num_array.sort((a, b) => a - b);
        let median;
        if(num_array.length % 2 === 1) { //odd length array
            median = num_array[Math.round(num_array.length / 2) - 1];
        } else {
            median = (num_array[(num_array.length / 2) - 1] + num_array[(num_array.length / 2)]) / 2;
        }

        const median_res = {response: {
            operation: 'median',
            value: median
        }}

        return res.json(median_res);
    } catch (err) {
        return next(err);
    }
})

// most frequent
app.get('/mode', (req, res, next) => {
    try {
        const nums = req.query;
        if(Object.keys(nums).length === 0) throw new ExpressError(`Numbers are required`, 400);

        const num_array = nums.nums.split(',').map(Number);
        if(num_array.includes(NaN)) throw new ExpressError(`Please use only number values for calculator`, 400);
        if(num_array.length === 0) throw new ExpressError(`Numbers are required`, 400);

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

        let mode_res;
        if(mode.length === 1) {
            mode_res = {response: {
                operation: 'mode',
                value: mode[0]
            }}
        } else {
            mode_res = {response: {
                operation: 'mode',
                value: mode
            }}
        }

        return res.json(mode_res);
    } catch (err) {
        return next(err);
    }    
})


// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

  // generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error: {message, status}
    });
});

// start the server
app.listen(3000, function () {
    console.log('App running on port 3000');
})