"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractGraphStrategy = _interopRequireDefault(require("../AbstractGraphStrategy"));

var _Utils = require("../../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AdjacencyList =
/*#__PURE__*/
function (_AbstractGraphStrateg) {
  _inherits(AdjacencyList, _AbstractGraphStrateg);

  function AdjacencyList(nodeFactory) {
    _classCallCheck(this, AdjacencyList);

    return _possibleConstructorReturn(this, _getPrototypeOf(AdjacencyList).call(this, nodeFactory));
  }

  _createClass(AdjacencyList, [{
    key: "addNode",
    value: function addNode(node) {
      if (!this.findNode(node) && !this.hasNode(this.nodeFactory.getKey(node))) {
        this.nodes = [].concat(_toConsumableArray(this.nodes), [{
          node: node,
          neighbors: {}
        }]);
      }
    }
  }, {
    key: "getArrayObject",
    value: function getArrayObject(key) {
      var _this = this;

      return this.nodes.find(function (_ref) {
        var x = _ref.node;
        return _this.nodeFactory.getKey(x) === key;
      });
    }
  }, {
    key: "getNode",
    value: function getNode(key) {
      var _this$getArrayObject;

      (_this$getArrayObject = this.getArrayObject(key)) === null || _this$getArrayObject === void 0 ? void 0 : _this$getArrayObject.node;
    }
  }, {
    key: "findNode",
    value: function findNode(node) {
      var _this$nodes$find,
          _this2 = this;

      return (_this$nodes$find = this.nodes.find(function (_ref2) {
        var x = _ref2.node;
        return _this2.nodeFactory.compare(x, node) === 0;
      })) === null || _this$nodes$find === void 0 ? void 0 : _this$nodes$find.node;
    }
  }, {
    key: "getAllNodes",
    value: function getAllNodes() {
      return this.nodes.map((0, _Utils.prop)("node"));
    }
  }, {
    key: "hasNode",
    value: function hasNode(key) {
      return !!this.getNode(key);
    }
  }, {
    key: "addEdge",
    value: function addEdge(a, b, value) {
      var obj = this.getArrayObject(a);

      if (obj) {
        obj.neighbors[b] = value;
      }
    }
  }, {
    key: "getEdge",
    value: function getEdge(a, b) {
      var _this$getNode;

      return (_this$getNode = this.getNode(a)) === null || _this$getNode === void 0 ? void 0 : _this$getNode.neighbors[b];
    }
  }, {
    key: "getAllEdges",
    value: function getAllEdges() {
      var _this3 = this;

      return this.nodes.flatMap(function (_ref3) {
        var node = _ref3.node,
            neighbors = _ref3.neighbors;
        return (0, _Utils.keysOf)(neighbors).map(function (neigh) {
          return {
            start: _this3.nodeFactory.getKey(node),
            end: neigh,
            value: neighbors[neigh]
          };
        });
      });
    }
  }, {
    key: "hasEdge",
    value: function hasEdge(a, b) {
      return (0, _Utils.isDefined)(this.getEdge(a, b));
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(key) {
      var _this$nodes$find2,
          _this4 = this;

      var neighbors = (_this$nodes$find2 = this.nodes.find(function (_ref4) {
        var node = _ref4.node;
        return _this4.nodeFactory.getKey(node) === key;
      })) === null || _this$nodes$find2 === void 0 ? void 0 : _this$nodes$find2.neighbors;
      return (0, _Utils.keysOf)(neighbors);
    }
  }]);

  return AdjacencyList;
}(_AbstractGraphStrategy.default);

var _default = AdjacencyList;
exports.default = _default;