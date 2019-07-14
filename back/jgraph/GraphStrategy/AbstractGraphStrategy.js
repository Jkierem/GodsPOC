"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utils = require("../Utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AbstractGraphStrategy =
/*#__PURE__*/
function () {
  function AbstractGraphStrategy(nodeFactory) {
    _classCallCheck(this, AbstractGraphStrategy);

    this.nodeFactory = nodeFactory;
    this.nodes = [];
  }

  _createClass(AbstractGraphStrategy, [{
    key: "addNode",
    value: function addNode(node) {
      if (!this.findNode(node) && !this.hasNode(this.nodeFactory.getKey(node))) {
        this.nodes = [].concat(_toConsumableArray(this.nodes), [node]);
      }
    }
  }, {
    key: "getNode",
    value: function getNode(key) {
      var _this = this;

      return this.nodes.find(function (x) {
        return _this.nodeFactory.getKey(x) === key;
      });
    }
  }, {
    key: "findNode",
    value: function findNode(node) {
      var _this2 = this;

      return this.nodes.find(function (x) {
        return _this2.nodeFactory.equals(x, node);
      });
    }
  }, {
    key: "getAllNodes",
    value: function getAllNodes() {
      return this.nodes;
    }
  }, {
    key: "hasNode",
    value: function hasNode(key) {
      return !!this.getNode(key);
    }
  }, {
    key: "addEdge",
    value: function addEdge() {
      (0, _Utils.abstractMethodError)("GraphStrategy.addEdge");
    }
  }, {
    key: "getEdge",
    value: function getEdge() {
      (0, _Utils.abstractMethodError)("GraphStrategy.getEdge");
    }
  }, {
    key: "getAllEdges",
    value: function getAllEdges() {
      (0, _Utils.abstractMethodError)("GraphStrategy.getAllEdges");
    }
  }, {
    key: "hasEdge",
    value: function hasEdge() {
      (0, _Utils.abstractMethodError)("GraphStrategy.hasEdge");
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors() {
      (0, _Utils.abstractMethodError)("GraphStrategy.getNeighbors");
    }
  }]);

  return AbstractGraphStrategy;
}();

var _default = AbstractGraphStrategy;
exports.default = _default;