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

var AdjacencyMatrix =
  /*#__PURE__*/
  function (_AbstractGraphStrateg) {
    _inherits(AdjacencyMatrix, _AbstractGraphStrateg);

    function AdjacencyMatrix(vertexFactory) {
      var _this;

      _classCallCheck(this, AdjacencyMatrix);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AdjacencyMatrix).call(this, vertexFactory));
      _this.adj = {};
      return _this;
    }

    _createClass(AdjacencyMatrix, [{
      key: "addEdge",
      value: function addEdge(a, b, value) {
        if (!this.adj[a]) {
          this.adj[a] = {};
        }

        this.adj[a][b] = value;
      }
    }, {
      key: "getEdge",
      value: function getEdge(a, b) {
        var _this$adj$a;

        return (_this$adj$a = this.adj[a]) === null || _this$adj$a === void 0 ? void 0 : _this$adj$a[b];
      }
    }, {
      key: "getAllEdges",
      value: function getAllEdges() {
        var _this2 = this;
        return (0, _Utils.keysOf)(this.adj).reduce(function (acc, startKey) {
          return [].concat(_toConsumableArray(acc), _toConsumableArray((0, _Utils.keysOf)(_this2.adj[startKey]).map(function (endKey) {
            return {
              start: startKey,
              end: endKey,
              value: _this2.adj[startKey][endKey]
            };
          })));
        }, []);
      }
    }, {
      key: "hasEdge",
      value: function hasEdge(a, b) {
        return (0, _Utils.isDefined)(this.getEdge(a, b));
      }
    }, {
      key: "getNeighbors",
      value: function getNeighbors(key) {
        return (0, _Utils.keysOf)(this.adj[key]);
      }
    }]);

    return AdjacencyMatrix;
  }(_AbstractGraphStrategy.default);

var _default = AdjacencyMatrix;
exports.default = _default;