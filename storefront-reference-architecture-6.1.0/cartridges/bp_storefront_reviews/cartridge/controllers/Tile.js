'use strict';

var server = require('server');

var page = module.superModule;
server.extend(page);


var OrderMgr = require('dw/order/OrderMgr');
var OrderHistory = require('dw/customer/OrderHistory');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var getOrderedProducts = require('*/cartridge/scripts/helpers/orderedProducts')



/**
 * Tile-Show : This customization of the Tile-Show controller is created in order to pop up contiu
 * @name Tile-Show
 * 
 */

server.append(
    'Show',
    function(req, res, next) {
        var viewData = res.getViewData();
        viewData.reviewGiven = false;
        viewData.productOrdered = false;

        if (req.currentCustomer.profile) {
            var customer = req.currentCustomer.profile;
            var productID = viewData.product.id;
            var coKey = customer.customerNo + '-' + productID;
            var customerProducts = getOrderedProducts.getOrderedProducts(customer.customerNo);

            if (customerProducts.includes(productID)) {
                viewData.productOrdered = true;
            }

            var checkForReviewQuery = CustomObjectMgr.getCustomObject("ProductReview", coKey);

            if (checkForReviewQuery) {
                viewData.reviewGiven = true;
            }

            viewData.reviewUrl = dw.web.URLUtils.url('Product-GiveReview');
            viewData.loggedIn = true;
        }
        
        res.setViewData(viewData);
        next();

    }
);

module.exports = server.exports();