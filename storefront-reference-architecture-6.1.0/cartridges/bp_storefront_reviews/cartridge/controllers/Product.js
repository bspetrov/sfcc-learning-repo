'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var URLUtils = require('dw/web/URLUtils');
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');


/**
 * Product-GiveReview : This endpoint is when the shopped selects "Give review" on a product he has ordered already.
 * @name Product-GiveReview
 * @function
 */

server.get(
    "GiveReview",
    server.middleware.https,
    function (req, res, next) {
        if (req.currentCustomer.profile) {
            try {
                var customerNo = req.currentCustomer.profile.customerNo;
                var customerOrdersQuery = OrderMgr.queryOrders('customerNo = {0}', null, customerNo);
                var customerProducts = [];
                var totalOrders = customerOrdersQuery.hasNext();
                if (totalOrders) {
                    while (customerOrdersQuery.hasNext()) {
                        var order = customerOrdersQuery.next();
                        var orderItems = order.productLineItems;
                        for (var item in orderItems) {
                            var product = orderItems[item].product;
                            var productID = null;
                            if (product.variant == true) {
                                productID = product.masterProduct.ID;
                                customerProducts.push(productID);
                            } else {
                                productID = product.ID;
                                customerProducts.push(productID);   
                            }
                        }
                    }

                } else {
                    res.json({
                        "ERROR": 'You have no orders!'
                    });
                }
                var requestID = req.querystring.id;
                if (customerProducts.includes(requestID)) {
                    var actionUrl = dw.web.URLUtils.url('Product-GiveReviewHandler');
                    var reviewForm = server.forms.getForm('review');
                    reviewForm.clear();
            
                    res.render('review/writeReview', {
                        actionUrl: actionUrl,
                        reviewForm: reviewForm
                    });
                } else {
                    res.json({
                        "ERROR": 'You can review a product once you have purchased it!'
                    });
                }
            } catch (e) {
                res.json({
                    "ERROR": e
                })
            }

        } else {
            res.redirect("Login-Show");
        }
        next();

    }
);

/**
 * Product-GiveReviewHandler : This endpoint processes the form and submits the data to a Reviews CO instance.
 * @name Product-GiveReviewHandler
 * @function
 */

server.post(
    "GiveReviewHandler",
    server.middleware.https,
    function (req, res, next) {
        var reviewForm = server.forms.getForm('review');
        var continueUrl = dw.web.URLUtils.utl('Home-Show');
        var productID = req.querystring.id;
        var reviewCustomer = req.currentCustomer.profile.id;
        var reviewDescription = reviewForm.reviewDescription.value;
        var reviewGrade = reviewForm.reviewGrade.value;
        var reviewTitle = reviewForm.reviewTitle.value;

        if (reviewForm.valid) {
            try {
                Transaction.wrap(function(){
                    var reviewCustomObject = CustomObjectMgr.createCustomObject('ProductReview', productID);
                    reviewCustomObject.reviewCustomer = reviewCustomer;
                    reviewCustomObject.reviewDescription - reviewDescription;
                    reviewCustomObject.reviewGrade = reviewGrade;
                    reviewCustomObject.reviewTitle = reviewTitle;
    
                });
            } catch (e) {
                var err = e;
                res.setStatusCode(500);
                res.json({
                    error: true,
                    redirectUrl: URLUtils.url("Error-Start").toString()
                });
            }
        }
        next();
    }
);

module.exports = server.exports();