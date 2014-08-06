// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var InvalidDollars = require("./invalid_dollars.js");
var ValidDollars = require("./valid_dollars.js");
var __RenderTargetStub = require("./__render_target_stub.js");

describe("InvalidDollars", function() {

	var invalid = new InvalidDollars();
	var valid = new ValidDollars(20);

	describe("logic", function() {
		it("is never valid", function() {
			expect(invalid.isValid()).to.be(false);
		});

		it("addition is always invalid", function() {
			expect(invalid.plus(valid)).to.eql(invalid);
			expect(invalid.plus(invalid)).to.eql(invalid);
		});

		it("subtraction is always invalid", function() {
			expect(invalid.minus(valid)).to.eql(invalid);
			expect(invalid.minus(invalid)).to.eql(invalid);
		});

		it("subtracting to zero is always invalid", function() {
			expect(invalid.subtractToZero(valid)).to.eql(invalid);
			expect(invalid.subtractToZero(invalid)).to.eql(invalid);
		});

		it("flipping the sign is always invalid", function() {
			expect(invalid.flipSign(valid)).to.eql(invalid);
			expect(invalid.flipSign(invalid)).to.eql(invalid);
		});

		it("percentage is always invalid", function() {
			expect(invalid.percentage(20)).to.eql(invalid);
		});

		it("min is always invalid", function() {
			expect(invalid.min(valid)).to.eql(invalid);
			expect(invalid.min(invalid)).to.eql(invalid);
		});
	});


	describe("string conversion", function() {
		it("uses question marks", function() {
			expect(invalid + "").to.equal("$???");
		});
	});


	describe("rendering", function() {
		var target = new __RenderTargetStub();

		beforeEach(function() {
			target.reset();
			invalid.renderTo(target);
		});

		it("has no text", function() {
			expect(target.text).to.equal(undefined);
		});

		it("is never negative", function() {
			expect(target.negative).to.equal(false);
		});

		it("is always invalid", function() {
			expect(target.invalid).to.equal(true);
			expect(target.tooltip).to.equal("Invalid dollar amount");
		});
	});


});