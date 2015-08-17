/**
 * File: fetcher.js
 */

'use strict';

function Fetcher(supreagent, cheerio, genurl, callback) {
    this.blocksize   = 0;
    this.pagecount   = 0;
    this.currentpage = 0;
    this._superagent = supreagent;
    this._cheerio    = cheerio;
    this._genurl     = genurl;
    this._callback   = callback;
}

Fetcher.prototype.fetch = function ($) {
    console.error("ERROR: running Fetcher.fetch");
    this._callback();
};

Fetcher.prototype.access = function (url, callback) {
    this._superagent.get(url)
        .set('Cookie', 'is_click="Hi, there~"')
        .end(callback);
};

Fetcher.prototype.elemsAtPage = function (page) {
    var url = this._genurl(page);
    var cheerio = this._cheerio;
    var fetch = this.fetch;
    var callback = function(err, res) {
        if (!err) {
            fetch(cheerio.load(res.text));
        }
    };
    this.access(url, callback);
};

Fetcher.prototype.nextpage = function () {
    this.elemsAtPage(++this.pagecount);
};

exports.Fetcher = Fetcher;
