var DamWeb = require('./DamWeb');

var dw = new DamWeb("WMWP263132373839404142BP071012172223242935", "3933354426211726322823434238433237082646080229380205");
dw.parse();

console.log("WP = " + dw.getWPList());
console.log("WK = " + dw.getWKList());
console.log("BP = " + dw.getBPList());
console.log("BK = " + dw.getBKList());
console.log("Moves = " + dw.getMoveList());

