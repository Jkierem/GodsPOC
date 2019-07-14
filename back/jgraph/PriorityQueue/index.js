"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utils = require("../Utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var priority = (0, _Utils.prop)("priority");

var DefaultSorter = function DefaultSorter(a, b) {
  return priority(a) - priority(b);
};

var PriorityQueue = function PriorityQueue() {
  var _this = this;

  var sorter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultSorter;

  _classCallCheck(this, PriorityQueue);

  _defineProperty(this, "enqueue", function (obj) {
    _this._nodes = [_this._nodes, obj].sort(_this._sorter);
  });

  _defineProperty(this, "dequeue", function () {
    var el = _this._nodes.slice(-1);

    _this._nodes = _this._nodes.slice(0, _this._nodes.length - 1);
    return el;
  });

  _defineProperty(this, "isEmpty", function () {
    return !_this._nodes.length;
  });

  this._nodes = [];
  this._sorter = sorter;
};

var _default = PriorityQueue;
exports.default = _default;