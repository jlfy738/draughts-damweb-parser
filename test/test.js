var DamWebParser = require('../src/DamWebParser');

var dwp = new DamWebParser("WMWP263132373839404142BP071012172223242935", "3933354426211726322823434238433237082646080229380205");
dwp.parse();

console.log("WP = " + dwp.getWPList());
console.log("WK = " + dwp.getWKList());
console.log("BP = " + dwp.getBPList());
console.log("BK = " + dwp.getBKList());
console.log("Moves = " + dwp.getMoveList());

