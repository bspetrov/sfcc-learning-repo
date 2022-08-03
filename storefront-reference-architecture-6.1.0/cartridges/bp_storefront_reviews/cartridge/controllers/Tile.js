'use strict';

var server = require('server');

var page = module.superModule;
server.extend(page);
var OrderMgr = require('dw/order/OrderMgr');
var OrderHistory = require('dw/customer/OrderHistory');
/**
 * Tile-Show : This customization of the Tile-Show controller is created in order to pop up contiu
 * @name Tile-Show
 * 
 */

server.append(
    'Show',
    function(req, res, next) {
        var viewData = res.getViewData();
        if (req.currentCustomer.profile) {
            var customerNo = req.currentCustomer.profile.customerNo;
            var customerOrdersQuery = OrderMgr.queryOrders('customerNo = {0}', null, customerNo);
            var customerProducts = [];

            while (customerOrdersQuery.hasNext()) {
                var order = customerOrdersQuery.next();
                var orderItems = order.productLineItems;
                for (var item in orderItems) {
                    var productId = orderItems[item].productID;
                    customerProducts.push(productId)
                }
            }
            viewData.reviewUrl = dw.web.URLUtils.url('Product-GiveReview')
            viewData.loggedIn = true;
        }
        res.setViewData(viewData);
        next();

    }
);

module.exports = server.exports();