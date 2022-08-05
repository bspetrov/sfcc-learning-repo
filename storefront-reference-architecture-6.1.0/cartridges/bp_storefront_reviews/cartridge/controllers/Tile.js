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
            viewData.reviewUrl = dw.web.URLUtils.url('Product-GiveReview');
            viewData.loggedIn = true;
        }
        res.setViewData(viewData);
        next();

    }
);

module.exports = server.exports();