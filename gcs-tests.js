// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by gcs.js.
import { name as packageName } from "meteor/flynn:gcs";

// Write your tests here!
// Here is an example.
Tinytest.add('gcs - example', function (test) {
  test.equal(packageName, "gcs");
});
