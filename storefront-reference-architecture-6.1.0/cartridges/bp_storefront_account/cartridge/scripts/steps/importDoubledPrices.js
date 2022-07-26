'use strict';

const xmlns = 'http://www.w3.org/2001/XMLSchema-instance';
const loc = 'http://api.trade-server.net/schema/all_in_one/tb-cat_1_2_import.xsd';
const xsi = 'xsi:noNamespaceSchemaLocation';

const File = require('dw/io/File');
const FileReader = require('dw/io/FileReader');;
const XMLStreamReader = require('dw/io/XMLStreamReader');
const Logger = require('dw/system/Logger');
const XMLStreamConstants = require('dw/io/XMLStreamConstants');


/**
 * Get the pricebook XML from Impex, double prices on products in the pricebook
 * @param {string} pricebookXML - Pricebook file
 * @returns {string} - pricebookID - Processed pricebook ID
 */

function doublePrices(parameters) {
    try {
        var pricebookXML = parameters.pricebookXML;
        var xmlFile = new File(File.IMPEX + '/src/Pricebooks/' + pricebookXML);
        var xmlFileReader = new FileReader(xmlFile);

        var x = xmlFileReader.read();

        if (x === '<') {
            xmlFileReader.close();
            xmlFileReader = new FileReader(xmlFile);
        }

        var xmlReader = new XMLStreamReader(xmlFileReader);

        while (xmlReader.hasNext()) {
            if (xmlReader.next() === XMLStreamConstants.START_ELEMENT) {
                var localElementName = xmlReader.getLocalName();

                if (localElementName === 'priceTable') {
                    var myObject = xmlReader.getXMLObject();
                    var myValue = myObject.amount.toString();
                }
            }
        }
        return null;
    } catch (e) {
        Logger.error('importDoublePrices.js has failed reading the pricebook XML with the following error: ' + e.message);
    };
};

module.exports = {
    doublePrices: doublePrices
};




