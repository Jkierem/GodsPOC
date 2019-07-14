"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AdjacencyList2 = _interopRequireDefault(require("./AdjacencyList"));

var _Utils = require("../../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BooleanAdjacencyList =
/*#__PURE__*/
function (_AdjacencyList) {
  _inherits(BooleanAdjacencyList, _AdjacencyList);

  function BooleanAdjacencyList(nodeFactory) {
    _classCallCheck(this, BooleanAdjacencyList);

    return _possibleConstructorReturn(this, _getPrototypeOf(BooleanAdjacencyList).call(this, nodeFactory));
  }

  _createClass(BooleanAdjacencyList, [{
    key: "addEdge",
    value: function addEdge(a, b) {
      var obj = this.getArrayObject(a);

      if (obj) {
        obj.neighbors[b] = true;
      }
    }
  }, {
    key: "getAllEdges",
    value: function getAllEdges() {
      var _this = this;

      return this.nodes.flatMap(function (_ref) {
        var node = _ref.node,
            neighbors = _ref.neighbors;
        return (0, _Utils.keysOf)(neighbors).map(function (neigh) {
          return {
            start: _this.nodeFactory.getKey(node),
            end: neigh
          };
        });
      });
    }
  }]);

  return BooleanAdjacencyList;
}(_AdjacencyList2.default);

var _default = BooleanAdjacencyList;
exports.default = _default;