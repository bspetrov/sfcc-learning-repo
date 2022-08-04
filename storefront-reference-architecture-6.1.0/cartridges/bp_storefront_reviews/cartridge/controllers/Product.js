'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var URLUtils = require('dw/web/URLUtils');


/**
 * Product-GiveReview : This endpoint is when the shopped selects "Give review" on a product he has ordered already.
 * @name Product-GiveReview
 * @function
 */

server.get(
    "GiveReview",
    server.middleware.https,
    function (req, res, next) {
        var actionUrl = dw.web.URLUtils.url('Product-GiveReviewHandler');
        var reviewForm = server.forms.getForm('review');
        reviewForm.clear();

        res.render('review/writeReview', {
            actionUrl: actionUrl,
            reviewForm: reviewForm
        });

        next();

    }
);


server.post(
    "GiveReviewHandler",
    server.middleware.https,
    function (req, res, next) {
        var reviewForm = server.forms.getForm('review');
        var continueUrl = dw.web.URLUtils.utl('Home-Show');
        
        // TODO -> Process form and create the custom object

        if (reviewForm.valid) {
            try {
                var reviewCustomObject = CustomObjectMgr.createCustomObject('ProductReview', )
            } catch (e) {
                var err = e;
                res.setStatusCode(500);
                res.json({
                    error: true,
                    redirectUrl: URLUtils.url('Error-Start').toString()
                });
            }
        }
        next();
    }
);

module.exports = server.exports();