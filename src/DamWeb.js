function DamWeb(position, notation) {
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

DamWeb.prototype.setPosition = function(position) {
    this.textPosition = position ? position : "";
};

DamWeb.prototype.setNotation = function(notation) {
    this.textNotation = notation ? notation : "";
};

DamWeb.prototype.getWPList = function() { return this.wpList; };

DamWeb.prototype.getWKList = function() { return this.wkList; };

DamWeb.prototype.getBPList = function() { return this.bpList; };

DamWeb.prototype.getBKList = function() { return this.bkList; };

DamWeb.prototype.getMoveList = function() { return this.moveList; };




DamWeb.prototype.parse = function() {
    var wp = DamWeb._getPositionWP(this.textPosition);
    var wk = DamWeb._getPositionWK(this.textPosition);
    var bp = DamWeb._getPositionBP(this.textPosition);
    var bk = DamWeb._getPositionBK(this.textPosition);


    this.wpList = DamWeb._positionToList(wp);
    this.wkList = DamWeb._positionToList(wk);
    this.bpList = DamWeb._positionToList(bp);
    this.bkList = DamWeb._positionToList(bk);


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


DamWeb._positionToList = function(s) {
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

DamWeb._getPositionWP = function(text) {
    var pattern = /[BW]M.*?WP(.*?)(?:WK|BP|BK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWeb._getPositionBP = function(text) {
    var pattern = /[BW]M.*?BP(.*?)(?:WP|WK|BK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWeb._getPositionWK = function(text) {
    var pattern = /[BW]M.*?WK(.*?)(?:WP|BP|BK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWeb._getPositionBK = function(text) {
    var pattern = /[BW]M.*?BK(.*?)(?:WP|BP|WK|$).*/;
    return this._extractSubString(text, pattern);
};

DamWeb._extractSubString = function(text, pattern) {
    var s = "";

    var m = text.match(pattern);
    if (m && m.length > 1) {
        s = m[1];
    }
    return s;
};

module.exports = DamWeb;
