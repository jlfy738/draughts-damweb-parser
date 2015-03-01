function DamWebParser(position, notation) {
    this.wpList = [];
    this.wkList = [];
    this.bpList = [];
    this.bkList = [];
    this.moveList = [];

    this.textPosition = "";
    this.textNotation = "";

    this.setPosition(position);
    this.setNotation(notation);
}

DamWebParser.prototype.setPosition = function(position) {
    this.textPosition = position ? position : "";
};

DamWebParser.prototype.setNotation = function(notation) {
    this.textNotation = notation ? notation : "";
};

DamWebParser.prototype.getWPList = function() { return this.wpList; };

DamWebParser.prototype.getWKList = function() { return this.wkList; };

DamWebParser.prototype.getBPList = function() { return this.bpList; };

DamWebParser.prototype.getBKList = function() { return this.bkList; };

DamWebParser.prototype.getMoveList = function() { return this.moveList; };




DamWebParser.prototype.parse = function() {
    var wp = DamWebParser._getPositionWP(this.textPosition);
    var wk = DamWebParser._getPositionWK(this.textPosition);
    var bp = DamWebParser._getPositionBP(this.textPosition);
    var bk = DamWebParser._getPositionBK(this.textPosition);


    this.wpList = DamWebParser._positionToList(wp);
    this.wkList = DamWebParser._positionToList(wk);
    this.bpList = DamWebParser._positionToList(bp);
    this.bkList = DamWebParser._positionToList(bk);


    if (this.textNotation) {
        var l = this.textNotation.length;
        var nb = l / 4;

        for (var i = 0; i < nb; i++) {
            var sMove = this.textNotation.substring(4 * i, 4 * i + 4);
            var iStart = parseInt(sMove.substring(0, 2), 10) || null;
            var iEnd = parseInt(sMove.substring(2), 10) || null;

            if (iStart != null && iEnd != null) {
                this.moveList.push([iStart, iEnd]);
            } else {
                break;
            }
        }
    }
};


DamWebParser._positionToList = function(s) {
    var list = [];

    if (s) {
        var l = s.length;
        var nb = l / 2;

        for (var i = 0; i < nb; i++) {
            var sNum = s.substring(2 * i, 2 * i + 2);
            var num = parseInt(sNum, 10) || null;
            if (num != null) {
                list.push(num);
            }
        }
    }

    return list;
};

DamWebParser._getPositionWP = function(text) {
    var pattern = /[BW]M.*?WP(.*?)(?:WK|BP|BK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWebParser._getPositionBP = function(text) {
    var pattern = /[BW]M.*?BP(.*?)(?:WP|WK|BK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWebParser._getPositionWK = function(text) {
    var pattern = /[BW]M.*?WK(.*?)(?:WP|BP|BK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWebParser._getPositionBK = function(text) {
    var pattern = /[BW]M.*?BK(.*?)(?:WP|BP|WK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWebParser._extractSubString = function(text, pattern) {
    var s = "";

    var m = text.match(pattern);
    if (m && m.length > 1) {
        s = m[1];
    }
    return s;
};

module.exports = DamWebParser;
