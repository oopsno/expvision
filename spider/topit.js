/**
 * File: topit.js
 */

'use strict';

var Fetcher = require("./fetcher").Fetcher;
var url = "http://www.topit.me";

function genurl (p) {
    return url + '?p=' + p;
}

function TopitFetcher (superagent, cheerio, callback) {
    Fetcher.call(this, superagent, cheerio, genurl, callback);
    this.blocksize = 12;
}

TopitFetcher.prototype = Object.create(Fetcher.prototype);
TopitFetcher.prototype.constructor = TopitFetcher;

TopitFetcher.prototype.fetch = function ($) {
    var srcs = [];
    var _page = this.currentpage;
    $('div .e .m > a > img').each(function (i, e) {
        var original = e.attribs['original-data'];
        var i = 0;
        if (original) {
            console.log("Page " + _page + ", item " + i++ + ": " + original);
            srcs.push(original);
        }
    });
    this._callback(srcs);
};

exports.TopitFetcher = TopitFetcher;
