const chai = require("chai");

const main = require('../app.js');


const expect = chai.expect;

var request = require('request');

describe ('Main page', function() {
it('Main page status', function(done) {
    request('http://localhost:3000/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
});


//describe("Make a human", () => {
//  it("should give me a human", () => {
//    const testHuman = main.makeAHuman();
    //TRUE
//    assert.equal(testHuman.canUseTools, true);
    //FALSE
//    assert.equal(testHuman.bodyparts, ["head","torso","big dick", "arms","legs"]);
    //TRUE
//    assert.deepEqual(testHuman.bodyparts, ["head","torso","big dick", "arms","legs"])
//  })
//})
