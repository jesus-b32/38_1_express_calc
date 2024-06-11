const express = require('express');
const ExpressError = require('./expressError');
const {calcMode, calcMean, calcMedian, convertAndValidateNums } = require('./calc');

const app = express();

//average
app.get('/mean', function(req, res, next) {
    try {
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        const nums = req.query.nums;
        const num_array = convertAndValidateNums(nums);
        if(num_array instanceof Error) {
            throw new ExpressError(num_array.message);
        }
    
        const mean_res = {response: {
            operation: 'mean',
            value: calcMean(num_array)
        }}

        return res.json(mean_res);
    } catch (err) {
        return next(err);
    }
})

//midpoint
app.get('/median', (req, res, next) => {
    try {
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        const nums = req.query.nums;
        const num_array = convertAndValidateNums(nums);
        if(num_array instanceof Error) {
            throw new ExpressError(num_array.message);
        }

        const median_res = {response: {
            operation: 'median',
            value: calcMedian(num_array)
        }}

        return res.json(median_res);
    } catch (err) {
        return next(err);
    }
})

// most frequent
app.get('/mode', (req, res, next) => {
    try {
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        const nums = req.query.nums;
        const num_array = convertAndValidateNums(nums);
        if(num_array instanceof Error) {
            throw new ExpressError(num_array.message, 400);
        }

        const mode = calcMode(num_array);
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