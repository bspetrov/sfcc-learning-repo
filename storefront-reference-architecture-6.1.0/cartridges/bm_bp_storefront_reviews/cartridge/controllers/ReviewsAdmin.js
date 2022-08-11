'use strict';

var server = require('server');

var Site = require('dw/system/Site');
var Transaction = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');  


/**
 * Render the reviews submitted for all products
 */

server.get(
    "Reviews",
    function (req, res, next) {
        var allReviewsQuery = CustomObjectMgr.getAllCustomObjects('ProductReview');
        var allReviews = [];
    
        while (allReviewsQuery.hasNext()) {
            var currentReview = allReviewsQuery.next();
            allReviews.push(currentReview);
        }

        res.render('reviewsTemplate', {
            allReviews: allReviews
        });
        next();
    }
);



/**
 * Edit review, enable/disable the review based on if it has cursed words
 */

server.get(
    "EditReview",
    function(req, res, next) {

    }
)

module.exports = server.exports();