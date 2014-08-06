#!/usr/local/bin/node

// Automatically runs Jake when files change.
//
// Thanks to Davide Alberto Molin for contributing this code.
// See http://www.letscodejavascript.com/v3/comments/live/7 for details.
//
// NOTE: The "COMMAND" variable must be changed for this to work on Windows.

(function() {
	"use strict";

	var gaze = require("gaze");
	var spawn = require("child_process").spawn;

	var WATCH = "src/**/*.js";

	var COMMAND = "./jake.sh";   // Mac/Unix
//	var COMMAND = "jake.bat";                 // Windows
	var COMMAND_ARGS = [];

	var buildRunning = false;

	gaze(WATCH, function(err, watcher) {
		console.log("Will run " + COMMAND + " when " + WATCH + " changes.");
		watcher.on("all", run);
		run();    // Always run after startup

		function run(evt, filepath) {
			if (buildRunning) return;
			buildRunning = true;

			console.log("\n> " + COMMAND + " " + COMMAND_ARGS.join(" "));
			var jake = spawn(COMMAND, COMMAND_ARGS, { stdio: "inherit" });

			jake.on("exit", function(code) {
				buildRunning = false;
			});
		}
	});

}());
