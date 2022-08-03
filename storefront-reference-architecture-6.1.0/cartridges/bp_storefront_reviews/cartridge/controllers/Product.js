'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);


/**
 * Product-GiveReview : This endpoint is when the shopped selects "Give review" on a product he has ordered already.
 * @name Product-GiveReview
 * @function
 */

server.get(
    "GiveReview",
    function (req, res, next) {



        next();

    }
);


server.post(
    "GiveReviewHandler",
    function (req, res, next) {


        next();
    }
);

module.exports = server.exports();