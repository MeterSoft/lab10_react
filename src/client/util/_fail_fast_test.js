// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
"use strict";

var failFast = require("./fail_fast.js");
var FailFastException = failFast.FailFastException;

describe("FailFastException", function() {

	it("looks like this", function() {
		try {
			throw new FailFastException(function() {}, "foo");
		}
		catch(e) {
			expect(e.name).to.equal("FailFastException");
			expect(e.constructor).to.equal(FailFastException);
			expect("" + e).to.equal("FailFastException: foo");
		}
	});

});

describe("FailFast", function() {

	it("checks if variable is defined", function() {
		expect(unlessDefined("foo")).to.not.throwException();
		expect(unlessDefined(null)).to.not.throwException();
		expect(unlessDefined(undefined)).to.throwException(/Required variable was not defined/);
		expect(unlessDefined(undefined, "myVariable")).to.throwException(/Required variable \[myVariable\] was not defined/);

		function unlessDefined(variable, variableName) {
			return function() {
				failFast.unlessDefined(variable, variableName);
			};
		}
	});

	it("checks if variable is number", function() {
		expect(unlessNumber(0)).to.not.throwException();
		expect(unlessNumber("foo")).to.throwException(/Expected variable to be number, but was string/);
		expect(unlessNumber({})).to.throwException(/Expected variable to be number, but was object/);
		expect(unlessNumber([])).to.throwException(/Expected variable to be number, but was array/);
		expect(unlessNumber(undefined)).to.throwException(/Expected variable to be number, but was undefined/);
		expect(unlessNumber(null)).to.throwException(/Expected variable to be number, but was null/);
		expect(unlessNumber(NaN)).to.throwException(/Expected variable to be number, but was NaN/);

		expect(unlessNumber("foo", "name")).to.throwException(/Expected variable \[name\] to be number, but was string/);

		function unlessNumber(variable, variableName) {
			return function() {
				failFast.unlessNumber(variable, variableName);
			};
		}
	});

	it("checks if condition is true", function() {
		expect(unlessTrue(true)).to.not.throwException();
		expect(unlessTrue(false)).to.throwException(/Expected condition to be true/);
		expect(unlessTrue(false, "a message")).to.throwException(/a message/);
		expect(unlessTrue("foo")).to.throwException(/Expected condition to be true or false/);
		expect(unlessTrue("foo", "ignored")).to.throwException(/Expected condition to be true or false/);

		function unlessTrue(variable, message) {
			return function() {
				failFast.unlessTrue(variable, message);
			};
		}
	});

	it("fails when unreachable code is executed", function() {
		expect(unreachable()).to.throwException(/Unreachable code executed/);
		expect(unreachable("foo")).to.throwException(/foo/);

		function unreachable(message) {
			return function() {
				failFast.unreachable(message);
			};
		}
	});

});