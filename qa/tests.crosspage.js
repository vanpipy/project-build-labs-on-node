'use strict';

const Browser = require('zombie')
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

let browser;

suite('Cross page Tests', function() {
    setup(function() {
        browser = new Browser()
    })

    test('requesting a group rate quote from the hood river page should populate the referrer field', function(done) {
        const referrer = 'http://localhost:9090/tours/hood-river';
        browser.visit(referrer, function() {
            browser.clickLink('.request-group-rate', function() {
                expect(browser.field('referrer').value).to.equal(referrer)
                done()
            })
        })
    })

    test('requesting a group rate quote from the oregon coast page should populate the referrer field', function(done) {
        const referrer = 'http://localhost:9090/tours/oregon-coast';
        browser.visit(referrer, function() {
            browser.clickLink('.request-group-rate', function() {
                assert(browser.field('referrer').value === referrer)
                done()
            })
        })
    })

    test('requesting a group rate quote directly should result in an empty referrer filed', function(done) {
        const referrer = 'http://localhost:9090/tours/request-group-rate';
        browser.visit(referrer, function() {
            assert(browser.field('referrer').value === '')
            done()
        })
    })
})
